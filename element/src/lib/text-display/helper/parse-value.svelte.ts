import type {
  TextDisplayMask,
  TextDisplayPartObjects,
} from '../types.js'

import {
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_NUMBER,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TEXT,
  TEXT_DISPLAY_TYPE_TIME,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEKDAY, 
  TEXT_DISPLAY_TYPE_YEAR,
} from '../types.js'

import {
  formatNumber,
} from './format-number.js'

import {
  maskPartReducer,
} from './mask-part-reducer.js'

import {
  parseMaskString,
} from './parse-mask-string.js'

export function parseValue (
  mask: TextDisplayMask,
  value: any,
  splitter?: (value: any, dynamicParts?: TextDisplayPartObjects[]) => any[]
) : string {
  const expandedMask: TextDisplayMask = mask.reduce(maskPartReducer, [])
  const dynamicParts: TextDisplayPartObjects[] = expandedMask.filter(currentPart => typeof currentPart !== 'string' && currentPart.type !== TEXT_DISPLAY_TYPE_LITERAL)
  let valueParts: any[] = [],
    dynamicCount = 0,
    result = ''

  if (dynamicParts.length > 1
    && typeof splitter === 'function') {
    valueParts = splitter(value, dynamicParts)
  } else {
    valueParts = (Array.isArray(value)) ? value : [value]
  }
  expandedMask.forEach((maskPart) => {
    if (typeof maskPart === 'string') {
      maskPart = parseMaskString(maskPart)
    }
    switch (maskPart.type) {
      case TEXT_DISPLAY_TYPE_LITERAL:
        result += maskPart.value ?? ''
        break;
      case TEXT_DISPLAY_TYPE_NUMBER:
        result += formatNumber(valueParts[dynamicCount], maskPart.options)
        break;
      case TEXT_DISPLAY_TYPE_DAY:
      case TEXT_DISPLAY_TYPE_DAY_PERIOD:
      case TEXT_DISPLAY_TYPE_ERA:
      case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
      case TEXT_DISPLAY_TYPE_HOUR:
      case TEXT_DISPLAY_TYPE_MINUTE:
      case TEXT_DISPLAY_TYPE_MONTH:
      case TEXT_DISPLAY_TYPE_SECOND:
      case TEXT_DISPLAY_TYPE_TEXT:
      case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
      case TEXT_DISPLAY_TYPE_WEEKDAY:
      case TEXT_DISPLAY_TYPE_YEAR:
        result += valueParts[dynamicCount]
        break;
    }

    if (maskPart.type !== TEXT_DISPLAY_TYPE_LITERAL) {
      dynamicCount += 1
    }
  })
  return result
}