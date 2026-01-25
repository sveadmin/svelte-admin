import {
  i18n as defaultI18n,
  type TranslationStore,
} from '@sveadmin/common'

import {
  TEXT_DISPLAY_TYPE_DAY,
} from '../day-types.js'

import {
  TEXT_DISPLAY_TYPE_HOUR,
} from '../hour-types.js'

import {
  TEXT_DISPLAY_TYPE_MINUTE,
} from '../minute-types.js'

import {
  TEXT_DISPLAY_TYPE_MONTH,
} from '../month-types.js'

import {
  TEXT_DISPLAY_TYPE_SECOND,
} from '../second-types.js'

import {
  TEXT_DISPLAY_TYPE_WEEK,
} from '../week-types.js'

import {
  TEXT_DISPLAY_TYPE_YEAR,
} from '../year-types.js'

import  {
  DATE_INTERVAL_LONG,
  DATE_INTERVAL_LONG_MASK,
  DATE_INTERVAL_NARROW,
  DATE_INTERVAL_SHORT,
  DATE_INTERVAL_SHORT_MASK,
} from '../interval-types.js'

import type {
  IntervalOptions
} from '../interval-types.js'

import {
  getRoundedInterval,
} from './get-rounded-interval.js'

export function getIntervalString(
  value: Date,
  options?: IntervalOptions,
  i18n: TranslationStore = defaultI18n
) : string {
  const now = new Date()
  const interval = getRoundedInterval(value.getTime() - now.getTime(), options?.unit, 1000)
  const plural = Math.abs(interval.value) > 1
  const maskName = (interval.past) ? 'intervalPast' : 'intervalFuture'
  let unitString

  if (options?.interval === DATE_INTERVAL_NARROW) {
    return interval.value.toString()
  }

  if (interval.value === 0
    && (interval.unit === TEXT_DISPLAY_TYPE_SECOND
      || interval.unit === TEXT_DISPLAY_TYPE_MINUTE)
  ) {
    return i18n.t('now')
  }

  if (options?.interval === DATE_INTERVAL_LONG
    || options?.interval === DATE_INTERVAL_LONG_MASK
  ) {
    switch (interval.unit) {
      case TEXT_DISPLAY_TYPE_DAY:
        unitString = i18n.t((plural) ? 'dateUnitDaysLong' : 'dateUnitDayLong')
        break
      case TEXT_DISPLAY_TYPE_HOUR:
        unitString = i18n.t((plural) ? 'dateUnitHoursLong' : 'dateUnitHourLong')
        break
      case TEXT_DISPLAY_TYPE_MINUTE:
        unitString = i18n.t((plural) ? 'dateUnitMinutesLong' : 'dateUnitMinuteLong')
        break
      case TEXT_DISPLAY_TYPE_MONTH:
        unitString = i18n.t((plural) ? 'dateUnitMonthsLong' : 'dateUnitMonthLong')
        break
      case TEXT_DISPLAY_TYPE_SECOND:
        unitString = i18n.t((plural) ? 'dateUnitSecondsLong' : 'dateUnitSecondLong')
        break
      case TEXT_DISPLAY_TYPE_WEEK:
        unitString = i18n.t((plural) ? 'dateUnitWeeksLong' : 'dateUnitWeekLong')
        break
      case TEXT_DISPLAY_TYPE_YEAR:
        unitString = i18n.t((plural) ? 'dateUnitYearsLong' : 'dateUnitYearLong')
        break
    }
  }
  if (options?.interval === DATE_INTERVAL_SHORT
    || options?.interval === DATE_INTERVAL_SHORT_MASK
  ) {
    switch (interval.unit) {
      case TEXT_DISPLAY_TYPE_DAY:
        unitString = i18n.t('dateUnitDayShort')
        break
      case TEXT_DISPLAY_TYPE_HOUR:
        unitString = i18n.t('dateUnitHourShort')
        break
      case TEXT_DISPLAY_TYPE_MINUTE:
        unitString = i18n.t('dateUnitMinuteShort')
        break
      case TEXT_DISPLAY_TYPE_MONTH:
        unitString = i18n.t('dateUnitMonthShort')
        break
      case TEXT_DISPLAY_TYPE_SECOND:
        unitString = i18n.t('dateUnitSecondShort')
        break
      case TEXT_DISPLAY_TYPE_WEEK:
        unitString = i18n.t('dateUnitWeekShort')
        break
      case TEXT_DISPLAY_TYPE_YEAR:
        unitString = i18n.t('dateUnitYearShort')
        break
    }
  }

  if (options?.interval === DATE_INTERVAL_LONG
    || options?.interval === DATE_INTERVAL_SHORT
  ) {
    return interval.value.toString() + unitString
  }

  return (interval.value === 0) 
    ? i18n.t(maskName, {value: i18n.t('lessThan1'), unit: unitString ?? ''})
    : i18n.t(maskName, {value: Math.abs(interval.value).toString(), unit: unitString ?? ''})
}