import {
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_LONG,
  DATE_WEEKDAY_NARROW,
  DATE_WEEKDAY_NUMERIC,
  DATE_WEEKDAY_SHORT,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_ERA,
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY,
  TEXT_DISPLAY_TYPE_YEAR,
  TIME_ZONE_NAME_REGION,
  TIME_ZONE_NAME_SHORT,
} from '../types.js'

import type {
  DateSplitterSettings,
  TextDisplayPartObjects,
} from '../types.js'

export function prepareDateSplitterFilter(settings: DateSplitterSettings, index?: number) : (currentPart: TextDisplayPartObjects) => boolean {
  return function (currentPart: TextDisplayPartObjects) : boolean {
    if (currentPart.type === TEXT_DISPLAY_TYPE_LITERAL //TODO: it is not certain that Literal can appear here, double check
      || (index && index !== currentPart.index)
      || !index && currentPart.index) {
      return false
    }
    settings.locale = settings.locale || 'locale' in currentPart && currentPart?.locale || 'sv-SE'
    settings.timeZone = settings.timeZone || 'timeZone' in currentPart && currentPart?.timeZone || undefined

    switch (true) {
      case currentPart.type === TEXT_DISPLAY_TYPE_DAY_PERIOD:
        break
      case currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
        && currentPart.options?.weekday === DATE_WEEKDAY_NUMERIC:
        settings.options.weekday = DATE_WEEKDAY_NARROW
        break
      case currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
        && currentPart.options?.weekday === DATE_WEEKDAY_DELTA_LONG:
        settings.options.weekday = DATE_WEEKDAY_LONG
        break
      case currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
        && currentPart.options?.weekday === DATE_WEEKDAY_DELTA_SHORT:
        settings.options.weekday = DATE_WEEKDAY_SHORT
        break
      case currentPart.type === TEXT_DISPLAY_TYPE_TIME_ZONE_NAME
        && currentPart.options?.timeZoneName === TIME_ZONE_NAME_REGION:
        settings.options.timeZoneName = TIME_ZONE_NAME_SHORT
        break
      default:
        if ('options' in currentPart) {
          // @ts-ignore: DateTimeFormatOptions in TS library uses string for weekday instead of the exact values
          settings.options = {...currentPart?.options, ...settings.options}
        }
    }
    switch (currentPart.type) {
      case TEXT_DISPLAY_TYPE_DAY:
      case TEXT_DISPLAY_TYPE_ERA:
      case TEXT_DISPLAY_TYPE_MONTH:
      case TEXT_DISPLAY_TYPE_WEEKDAY:
      case TEXT_DISPLAY_TYPE_YEAR:
        settings.dateNeeded = true
        return true
      case TEXT_DISPLAY_TYPE_DAY_PERIOD:
      case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
      case TEXT_DISPLAY_TYPE_HOUR:
      case TEXT_DISPLAY_TYPE_MINUTE:
      case TEXT_DISPLAY_TYPE_SECOND:
      case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
        settings.timeNeeded = true
        return true
      case TEXT_DISPLAY_TYPE_WEEK:
        settings.weekNeeded = currentPart?.options?.week
        return true
      case TEXT_DISPLAY_TYPE_INTERVAL:
        settings.dateNeeded = true
        settings.intervalNeeded = true
        settings.timeNeeded = true
        return true
    }
    return false
  }
}

