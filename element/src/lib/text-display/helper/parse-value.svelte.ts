import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import {
  prepareParseDateFormat,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY, 
  TEXT_DISPLAY_TYPE_YEAR,
} from '$lib/date/index.js'

import type {
  DateTimeDefinitions,
} from '$lib/date/index.js'

import {
  formatNumber,
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/index.js'

import type {
  TextDisplayMask,
  TextDisplayPartObjects,
} from '../types.js'

import {
  TEXT_DISPLAY_TYPE_TEXT,
} from '../types.js'

import {
  prepareMaskPartReducer,
} from './mask-part-reducer.js'

export async function prepareParseValue(
  dateTimeDefinitions?: DateTimeDefinitions,
  splitter?: (value: any, dynamicParts?: TextDisplayPartObjects[]) => any[]
) : Promise<(
  mask: TextDisplayMask | string,
  value: any,
) => string> {
  const parseDateFormat = await prepareParseDateFormat(dateTimeDefinitions)
  const maskPartReducer = await prepareMaskPartReducer(parseDateFormat)
  return function parseValue (
    mask: TextDisplayMask | string,
    value: any,
  ) : string {
    if (!Array.isArray(mask)) {
      mask = [mask]
    }
    const expandedMask: TextDisplayPartObjects[] = mask.reduce(maskPartReducer, [])
    const dynamicParts: TextDisplayPartObjects[] = expandedMask.filter(currentPart => typeof currentPart !== 'string' && currentPart.type !== COMPONENT_LITERAL)
    let valueParts: any[] = [],
      dynamicCount = 0,
      result = ''
    if (dynamicParts.length > 0
      && typeof splitter === 'function') {
      valueParts = splitter(value, dynamicParts)
    } else {
      valueParts = (Array.isArray(value)) ? value : [value]
    }
    expandedMask.forEach((maskPart) => {
      switch (maskPart.type) {
        case COMPONENT_LITERAL:
          result += maskPart.value ?? ''
          break;
        case TEXT_DISPLAY_TYPE_NUMBER:
          result += formatNumber(valueParts[dynamicCount], maskPart.locale, maskPart.options)
          break;
        case TEXT_DISPLAY_TYPE_DAY:
        case TEXT_DISPLAY_TYPE_DAY_PERIOD:
        case TEXT_DISPLAY_TYPE_ERA:
        case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
        case TEXT_DISPLAY_TYPE_HOUR:
        case TEXT_DISPLAY_TYPE_INTERVAL:
        case TEXT_DISPLAY_TYPE_MINUTE:
        case TEXT_DISPLAY_TYPE_MONTH:
        case TEXT_DISPLAY_TYPE_SECOND:
        case TEXT_DISPLAY_TYPE_TEXT:
        case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
        case TEXT_DISPLAY_TYPE_WEEK:
        case TEXT_DISPLAY_TYPE_WEEKDAY:
        case TEXT_DISPLAY_TYPE_YEAR:
          result += valueParts[dynamicCount]
          break;
      }

      if (maskPart.type !== COMPONENT_LITERAL) {
        dynamicCount += 1
      }
    })
    return result
  }
}

