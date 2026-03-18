import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import {
  prepareParseDateFormat,
  COMPONENT_DAY,
  COMPONENT_DAY_PERIOD,
  COMPONENT_ERA,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME_ZONE_NAME,
  COMPONENT_WEEK,
  COMPONENT_WEEKDAY, 
  COMPONENT_YEAR,
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
        case COMPONENT_DAY:
        case COMPONENT_DAY_PERIOD:
        case COMPONENT_ERA:
        case COMPONENT_FRACTIONAL_SECOND:
        case COMPONENT_HOUR:
        case COMPONENT_INTERVAL:
        case COMPONENT_MINUTE:
        case COMPONENT_MONTH:
        case COMPONENT_SECOND:
        case TEXT_DISPLAY_TYPE_TEXT:
        case COMPONENT_TIME_ZONE_NAME:
        case COMPONENT_WEEK:
        case COMPONENT_WEEKDAY:
        case COMPONENT_YEAR:
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

