import  {
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_YEAR,
} from '../types.js'

import type {
  TextDisplayPart,
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartObjects,
  TextDisplayPartTime,
  DateTimeDefinitions,
} from '../types.js'

const dateToken = /d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g;
const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LlopZ]|"[^"]*"|'[^']*'/g;
const timeToken = /([HhMsTt])\1?|[LlopZ]|"[^"]*"|'[^']*'/g;

export async function prepareParseDateFormat (
  dateTimeDefinitions?: DateTimeDefinitions,
  processors?: {[key: string] : () => TextDisplayPartObjects}
) : Promise<(maskPart: TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime) => TextDisplayPartObjects[]> {
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
  return function (maskPart: TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime) : TextDisplayPartObjects[] {
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
          maskPart.options ?? {dateStyle: 'short', timeStyle: undefined}
        )
      }
      if (maskPart.type === TEXT_DISPLAY_TYPE_DATE_TIME) {
        dateTimeFormat = new Intl.DateTimeFormat(
          maskPart.locale,
          maskPart.options ?? {dateStyle: 'short', timeStyle: 'medium', hour12: false}
        )
      }
      if (maskPart.type === TEXT_DISPLAY_TYPE_TIME) {
        dateTimeFormat = new Intl.DateTimeFormat(
          maskPart.locale,
          maskPart.options ?? {dateStyle: undefined, timeStyle: 'medium', hour12: false}
        )
      }
      if (!dateTimeFormat) {
        return []
      }

      return dateTimeFormat.formatToParts()
    }

    const stringFormat = dateTimeDefinitions[maskPart.options.format] || maskPart.options.format

    let parsedIndex = 0
    const matches = stringFormat.matchAll(tokenToUse)
    const partsToBeAdded: TextDisplayPartObjects[] = []

    for (const match of matches) {
    // console.log('PI', parsedIndex, match.index, match.index - parsedIndex, stringFormat.substring(parsedIndex, match.index), stringFormat)
      if (match.index > parsedIndex) {
        partsToBeAdded.push({
          type: TEXT_DISPLAY_TYPE_LITERAL,
          value: stringFormat.substring(parsedIndex, match.index)
        })
      }
      if (processors[match[0]]) {
        partsToBeAdded.push(processors[match[0]]())
      } else {
        // Matches escaped by ' or "
        partsToBeAdded.push({
          type: TEXT_DISPLAY_TYPE_LITERAL,
          value: stringFormat.substring(match.index + 1, match.index + match[0].length - 1)
        })
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