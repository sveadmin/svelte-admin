import {
  TEXT_DISPLAY_TYPE_LITERAL,
} from '$lib/literal/types.js'

import type {
  TextDisplayPartLiteral,
} from '$lib/literal/types.js'

import {
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_TIME,
} from '../types.js'

import type {
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartTime,
  DateTimeDefinitions,
  TextDisplayPartDateTimeObjects,
} from '../types.js'

const dateToken = /(\$\()?(d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|e{1,3}|([W])\3?|(i{1,3}|I{2,3})(y|m|d|W)?|'|"[^"]*"|'[^']*')(\))?/g;
const token = /(\$\()?(d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|e{1,3}|([HhMsTtWZ])\3?|[LlopN]|(i{1,3}|I{2,3})(y|m|d|W|h|H|M|s)?|"[^"]*"|'[^']*')(\))?/g;
const timeToken = /(\$\()?(([HhMsTtZ])\3?|[LlopN]|i{1,3}|I{2,3}(h|H|M|s)?|"[^"]*"|'[^']*')(\})?/g;

export async function prepareParseDateFormat (
  dateTimeDefinitions?: DateTimeDefinitions,
  processors?: {[key: string] : (match?: string) => TextDisplayPartDateTimeObjects}
) : Promise<(maskPart: TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime) => Array<TextDisplayPartDateTimeObjects | TextDisplayPartLiteral>> {
  if (!dateTimeDefinitions) {
    const {
      dateTimeDefinitions: defaultDateTimeDefinitions
    } = await import('../date-time-definitions.js')
    dateTimeDefinitions = defaultDateTimeDefinitions
  }
  if (!processors) {
    const defaultProcessors = await import('../date-format-processors/index.js')
    processors = defaultProcessors
  }
  return function (maskPart: TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime) : Array<TextDisplayPartDateTimeObjects | TextDisplayPartLiteral> {
    let tokenToUse
    switch (maskPart.type) {
      case TEXT_DISPLAY_TYPE_DATE:
        tokenToUse = dateToken
        break
      case TEXT_DISPLAY_TYPE_DATE_TIME:
        tokenToUse = token
        break
      case TEXT_DISPLAY_TYPE_TIME:
        tokenToUse = timeToken
        break
    }

    if (!maskPart?.options?.format) {
      let dateTimeFormat : Intl.DateTimeFormat | null = null

      if (maskPart.type === TEXT_DISPLAY_TYPE_DATE) {
        dateTimeFormat = new Intl.DateTimeFormat(
          maskPart.locale,
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          maskPart.options ?? {dateStyle: 'short', timeStyle: undefined}
        )
      }
      if (maskPart.type === TEXT_DISPLAY_TYPE_DATE_TIME) {
        dateTimeFormat = new Intl.DateTimeFormat(
          maskPart.locale,
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          maskPart.options ?? {dateStyle: 'short', timeStyle: 'medium', hour12: false}
        )
      }
      if (maskPart.type === TEXT_DISPLAY_TYPE_TIME) {
        dateTimeFormat = new Intl.DateTimeFormat(
          maskPart.locale,
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          maskPart.options ?? {dateStyle: undefined, timeStyle: 'medium', hour12: false}
        )
      }
      if (!dateTimeFormat) {
        return []
      }

      // @ts-ignore: DateTimeFormatPartTypesRegistry uses a different way to copmose the union and it can not clearly match the right options
      return dateTimeFormat.formatToParts()
    }

    const stringFormat = dateTimeDefinitions[maskPart.options.format] || maskPart.options.format

    let parsedIndex = 0
    let valueIndex = 0
    let isIndexedValue = false
    const matches = stringFormat.matchAll(tokenToUse)
    const partsToBeAdded: Array<TextDisplayPartDateTimeObjects | TextDisplayPartLiteral> = []

    for (const match of matches) {
      if (match.index > parsedIndex) {
        partsToBeAdded.push({
          type: TEXT_DISPLAY_TYPE_LITERAL,
          value: stringFormat.substring(parsedIndex, match.index)
        })
      }
      if (match[1] === '$(') {
        isIndexedValue = true
      }
      if (processors[match[2]]) {
        const newPart = processors[match[2]](match[2])
        if (isIndexedValue
          && valueIndex > 0) {
          newPart.index = valueIndex
        }
        partsToBeAdded.push(newPart)
      } else if (match[4] === 'ii'
        || match[4] === 'iii'
        || match[4] === 'II'
        || match[4] === 'III') {
        const newPart = processors[match[4]](match[2])
        if (isIndexedValue
          && valueIndex > 0) {
          newPart.index = valueIndex
        }
        partsToBeAdded.push(newPart)
      } else {
        // Matches escaped by ' or "
        partsToBeAdded.push({
          type: TEXT_DISPLAY_TYPE_LITERAL,
          value: stringFormat.substring(match.index + 1, match.index + match[0].length - 1)
        })
      }
      if (match[6] === ')') {
        isIndexedValue = false
        valueIndex++
      }
      parsedIndex = match.index + match[0].length
    }
    if (parsedIndex < stringFormat.length) {
      partsToBeAdded.push({
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: stringFormat.substring(parsedIndex, stringFormat.length)
      })
    }
    return partsToBeAdded
  }
}