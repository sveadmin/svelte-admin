import type {
  TranslationStore,
} from '@sveadmin/common'

import {
  DATE_DAY_NUMERIC,
  DATE_MONTH_NUMERIC,
  DATE_WEEK_2DIGIT,
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_NUMERIC,
  TEXT_DISPLAY_TYPE_DAY,
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TEXT_DISPLAY_TYPE_HOUR,
  TEXT_DISPLAY_TYPE_INTERVAL,
  TEXT_DISPLAY_TYPE_MINUTE,
  TEXT_DISPLAY_TYPE_MONTH,
  TEXT_DISPLAY_TYPE_SECOND,
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TEXT_DISPLAY_TYPE_WEEK,
  TEXT_DISPLAY_TYPE_WEEKDAY,
  TIME_HOUR_NUMERIC,
  TIME_MINUTE_NUMERIC,
  TIME_SECOND_NUMERIC,
  TIME_ZONE_NAME_REGION,
} from '../types.js'

import type {
  TextDisplayPartDateTimeObjects,
} from '../types.js'

import {
  getIsoWeekNumber,
} from './get-iso-week-number.js'

import {
  getNeighbourDates,
} from './get-neighbour-dates.js'

import {
  getIntervalString,
} from './get-interval-string.js'

export function prepareDateSplitterMap (
  value: Date,
  dateTimeFormat: Intl.DateTimeFormat,
  mappedParts: {[key: string] : Intl.DateTimeFormatPart},
  i18n: TranslationStore
) : (currentPart: TextDisplayPartDateTimeObjects) => string {
  return function (currentPart: TextDisplayPartDateTimeObjects) : string {
    if (!mappedParts[currentPart.type]) {
      return ''
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_INTERVAL) {
      return getIntervalString(value, currentPart?.options, i18n)
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_DAY_PERIOD) {
      const value = (currentPart?.options?.lowerCase)
        ? mappedParts[currentPart.type].value.toLocaleLowerCase()
        : mappedParts[currentPart.type].value
      return (currentPart?.options?.dayPeriod === 'narrow')
        ? value.substring(0, 1)
        : value
    }
    if ((currentPart.type === TEXT_DISPLAY_TYPE_MONTH && currentPart?.options?.month === DATE_MONTH_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_DAY && currentPart?.options?.day === DATE_DAY_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_HOUR && currentPart?.options?.hour === TIME_HOUR_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_MINUTE && currentPart?.options?.minute === TIME_MINUTE_NUMERIC)
      || (currentPart.type === TEXT_DISPLAY_TYPE_SECOND && currentPart?.options?.second === TIME_SECOND_NUMERIC)) {
      //This fixes a fallback issue in Chrome, where any definition which includes more than one piece of the time / date will return 2-digit anyways
      const value = mappedParts[currentPart.type].value
      return (value[0] === '0')
        ? value.substring(1)
        : value
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
      && currentPart.options?.weekday === DATE_WEEKDAY_NUMERIC
    ) {
      return value.getDay().toString()
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
      && currentPart.options?.weekday === DATE_WEEKDAY_DELTA_LONG
    ) {
      const delta = getNeighbourDates(value)
      return (delta === null)
        ? mappedParts[currentPart.type].value
        : i18n.t(delta)
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_WEEKDAY
      && currentPart.options?.weekday === DATE_WEEKDAY_DELTA_SHORT
    ) {
      const delta = getNeighbourDates(value, DATE_WEEKDAY_DELTA_SHORT)
      return (delta === null)
        ? mappedParts[currentPart.type].value
        : i18n.t(delta)
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_TIME_ZONE_NAME
      && currentPart.options?.timeZoneName === TIME_ZONE_NAME_REGION
    ) {
      return dateTimeFormat.resolvedOptions().timeZone
    }
    if (currentPart.type === TEXT_DISPLAY_TYPE_WEEK) {
      const weekNumber = getIsoWeekNumber(value).toString()
      return (currentPart.options?.week === DATE_WEEK_2DIGIT)
        ? '0'.substring(0,2-weekNumber.length) + weekNumber
        : weekNumber
    }
    return mappedParts[currentPart.type].value
  }
}