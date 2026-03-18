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
  COMPONENT_DAY,
} from '../day-types.js'

import {
  COMPONENT_DAY_PERIOD,
} from '../day-period-types.js'

import {
  COMPONENT_ERA,
} from '../era-types.js'

import {
  COMPONENT_FRACTIONAL_SECOND,
} from '../fractional-second-types.js'

import {
  COMPONENT_HOUR,
} from '../hour-types.js'

import {
  COMPONENT_INTERVAL,
} from '../interval-types.js'

import {
  COMPONENT_MINUTE,
} from '../minute-types.js'

import {
  COMPONENT_MONTH,
} from '../month-types.js'

import {
  COMPONENT_SECOND,
} from '../second-types.js'

import {
  COMPONENT_TIME_ZONE_NAME,
  TIME_ZONE_NAME_REGION,
  TIME_ZONE_NAME_SHORT,
} from '../time-zone-types.js'

import {
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_LONG,
  DATE_WEEKDAY_NARROW,
  DATE_WEEKDAY_NUMERIC,
  DATE_WEEKDAY_SHORT,
  COMPONENT_WEEKDAY,
} from '../weekday-types.js'

import {
  COMPONENT_YEAR,
} from '../year-types.js'

import type {
  DateSplitterSettings,
} from '../types.js'

export function prepareDateSplitterFilter(settings: DateSplitterSettings, index?: number) : (currentPart: SveadminComponent) => boolean {
  return function (currentPart: SveadminComponent) : boolean {
    if (currentPart.type === COMPONENT_LITERAL //TODO: it is not certain that Literal can appear here, double check
      || (index && index !== currentPart.index)
      || !index && currentPart.index) {
      return false
    }

    const options : {[key: PropertyKey] : any} = currentPart?.display?.config ?? {}

    settings.locale = settings.locale || options?.locale || 'sv-SE'
    settings.timeZone = settings.timeZone || options?.timeZone || undefined

    switch (true) {
      case currentPart.type === COMPONENT_DAY_PERIOD:
        break
      case currentPart.type === COMPONENT_WEEKDAY
        && options?.weekday === DATE_WEEKDAY_NUMERIC:
        settings.options.weekday = DATE_WEEKDAY_NARROW
        break
      case currentPart.type === COMPONENT_WEEKDAY
        && options?.weekday === DATE_WEEKDAY_DELTA_LONG:
        settings.options.weekday = DATE_WEEKDAY_LONG
        break
      case currentPart.type === COMPONENT_WEEKDAY
        && options?.weekday === DATE_WEEKDAY_DELTA_SHORT:
        settings.options.weekday = DATE_WEEKDAY_SHORT
        break
      case currentPart.type === COMPONENT_TIME_ZONE_NAME
        && options?.timeZoneName === TIME_ZONE_NAME_REGION:
        settings.options.timeZoneName = TIME_ZONE_NAME_SHORT
        break
      default:
        let {
        // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          locale, // Remove it from currentOptions as it breaks Intl.DateTimeFormat initialization
          timeZone, // Remove it from currentOptions as it breaks Intl.DateTimeFormat initialization
          ...currentOptions
        } = {
          ...settings.options,
          ...options
        }
        
        settings.options = currentOptions
    }
    switch (currentPart.type) {
      case COMPONENT_DAY:
      case COMPONENT_ERA:
      case COMPONENT_MONTH:
      case COMPONENT_WEEKDAY:
      case COMPONENT_YEAR:
        settings.dateNeeded = true
        return true
      case COMPONENT_DAY_PERIOD:
      case COMPONENT_FRACTIONAL_SECOND:
      case COMPONENT_HOUR:
      case COMPONENT_MINUTE:
      case COMPONENT_SECOND:
      case COMPONENT_TIME_ZONE_NAME:
        settings.timeNeeded = true
        return true
      case COMPONENT_WEEK:
        settings.weekNeeded = options?.week
        return true
      case COMPONENT_INTERVAL:
        settings.dateNeeded = true
        settings.intervalNeeded = true
        settings.timeNeeded = true
        return true
    }
    return false
  }
}

