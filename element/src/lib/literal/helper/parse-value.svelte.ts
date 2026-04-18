import type {
  splitterFunction,
  SveadminComponent,
  SveadminComponentMask,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '../index.js'

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

import {
  COMPONENT_TEXT_DISPLAY,
} from '$lib/text-display/types.js'

import {
  prepareMaskPartReducer,
} from './mask-part-reducer.js'

export async function prepareParseValue(
  dateTimeDefinitions?: DateTimeDefinitions,
  splitter?: splitterFunction
) : Promise<(
  mask: SveadminComponentMask | string | undefined,
  value: any,
) => string> {
  const parseDateFormat = await prepareParseDateFormat(dateTimeDefinitions)
  const maskPartReducer = await prepareMaskPartReducer(parseDateFormat)
  return function parseValue (
    mask: SveadminComponentMask | string | undefined,
    value: any,
  ) : string {
    if (!mask) {
      return value
    }

    if (!Array.isArray(mask)) {
      mask = [mask]
    }
    const expandedMask: SveadminComponent<any>[] = mask.reduce(maskPartReducer, [])

    const dynamicParts: SveadminComponent<any>[] = expandedMask.filter(currentPart => !currentPart?.display?.config?.value)
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
      const options = maskPart?.display?.config ?? {}
      switch (maskPart.type) {
        case COMPONENT_LITERAL:
          result += options.value ?? ''
          break;
        case TEXT_DISPLAY_TYPE_NUMBER:
          // @TODO This will probably break, because options has more information than needed for formatNumber
          result += formatNumber(valueParts[dynamicCount++], options.locale, options)
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
        case COMPONENT_TEXT_DISPLAY:
        case COMPONENT_TIME_ZONE_NAME:
        case COMPONENT_WEEK:
        case COMPONENT_WEEKDAY:
        case COMPONENT_YEAR:
          result += valueParts[dynamicCount++]
          break;
      }
    })
    return result
  }
}

