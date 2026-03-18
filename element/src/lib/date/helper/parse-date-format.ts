import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/types.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/types.js'

import {
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_TIME,
  DATE_STYLE_SHORT,
  TIME_STYLE_MEDIUM,
} from '../types.js'

import type {
  ComponentDate,
  ComponentDateTime,
  ComponentTime,
  DateTimeDefinitions,
  ComponentDateTimeObjects,
} from '../types.js'

const dateToken = /(\$\()?(d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|e{1,3}|([W])\3?|(i{1,3}|I{2,3})(y|m|d|W)?|'|"[^"]*"|'[^']*')(\))?/g;
const token = /(\$\()?(d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|e{1,3}|([HhMsTtWZ])\3?|[LlopN]|(i{1,3}|I{2,3})(y|m|d|W|h|H|M|s)?|"[^"]*"|'[^']*')(\))?/g;
const timeToken = /(\$\()?(([HhMsTtZ])\3?|[LlopN]|i{1,3}|I{2,3}(h|H|M|s)?|"[^"]*"|'[^']*')(\})?/g;

export async function prepareParseDateFormat (
  dateTimeDefinitions?: DateTimeDefinitions,
  processors?: {[key: string] : (match?: string) => ComponentDateTimeObjects}
) : Promise<(maskPart: ComponentDate | ComponentDateTime | ComponentTime) => SveadminComponent[]> {
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
  return function (maskPart: SveadminComponent) : SveadminComponent[] {
    let tokenToUse
    switch (maskPart.type) {
      case COMPONENT_DATE:
        tokenToUse = dateToken
        break
      case COMPONENT_DATE_TIME:
        tokenToUse = token
        break
      case COMPONENT_TIME:
        tokenToUse = timeToken
        break
      default:
        return []
    }

    const options = maskPart?.display?.config

    if (!options?.format) {
      let dateTimeFormat : Intl.DateTimeFormat | null = null
      let {
        locale, // Remove it from currentOptions as it breaks Intl.DateTimeFormat initialization
        timeZone, // Remove it from currentOptions as it breaks Intl.DateTimeFormat initialization
        ...currentOptions
      } = {
        ...options,
      }

      if (maskPart.type === COMPONENT_DATE) {
        if (Object.keys(currentOptions).length === 0) {
          currentOptions = {
            dateStyle: DATE_STYLE_SHORT,
            timeStyle: undefined
          }
        }
        dateTimeFormat = new Intl.DateTimeFormat(
          options?.locale,
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          currentOptions
        )
      }
      if (maskPart.type === COMPONENT_DATE_TIME) {
        if (Object.keys(currentOptions).length === 0) {
          currentOptions = {
            dateStyle: DATE_STYLE_SHORT,
            timeStyle: options?.timeStyle ?? TIME_STYLE_MEDIUM,
            hour12: options?.hour12 ?? false
          }
        }
        dateTimeFormat = new Intl.DateTimeFormat(
          options?.locale,
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          currentOptions
        )
      }
      if (maskPart.type === COMPONENT_TIME) {
        if (Object.keys(currentOptions).length === 0) {
          currentOptions = {
            dateStyle: undefined,
            timeStyle: options?.timeStyle ?? TIME_STYLE_MEDIUM,
            hour12: options?.hour12 ?? false
          }
        }
        dateTimeFormat = new Intl.DateTimeFormat(
          options?.locale,
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          currentOptions
        )
      }
      if (!dateTimeFormat) {
        return []
      }

      // @ts-ignore: DateTimeFormatPartTypesRegistry uses a different way to copmose the union and it can not clearly match the right options
      return dateTimeFormat.formatToParts().map((currentPart) => {
        return {
          display: {
            config: {
              value: currentPart.value
            }
          },
          type: currentPart.type
        }
      })
    }

    const stringFormat = dateTimeDefinitions[options?.format] || options?.format

    let parsedIndex = 0
    let valueIndex = 0
    let isIndexedValue = false
    const matches = stringFormat.matchAll(tokenToUse)
    const partsToBeAdded: SveadminComponent[] = []

    for (const match of matches) {
      if (match.index > parsedIndex) {
        partsToBeAdded.push({
          display: {
            config: {
              value: stringFormat.substring(parsedIndex, match.index)
            },
          },
          type: COMPONENT_LITERAL,
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
          display : {
            config: {
              value: stringFormat.substring(match.index + 1, match.index + match[0].length - 1)
            },
          },
          type: COMPONENT_LITERAL,
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
        display: {
          config: {
            value: stringFormat.substring(parsedIndex, stringFormat.length)
          },
        },
        type: COMPONENT_LITERAL,
      })
    }
    return partsToBeAdded
  }
}