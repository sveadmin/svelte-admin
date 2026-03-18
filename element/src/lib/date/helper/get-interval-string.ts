import {
  i18n as defaultI18n,
  type TranslationStore,
} from '@sveadmin/common'

import {
  COMPONENT_DAY,
} from '../day-types.js'

import {
  COMPONENT_HOUR,
} from '../hour-types.js'

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
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  COMPONENT_YEAR,
} from '../year-types.js'

import {
  DATE_INTERVAL_LONG,
  DATE_INTERVAL_LONG_MASK,
  DATE_INTERVAL_NARROW,
  DATE_INTERVAL_SHORT,
  DATE_INTERVAL_SHORT_MASK,
} from '../interval-types.js'

import type {
  IntervalDisplayProps
} from '../interval-types.js'

import {
  getRoundedInterval,
} from './get-rounded-interval.js'

export function getIntervalString(
  value: Date,
  options?: IntervalDisplayProps,
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
    && (interval.unit === COMPONENT_SECOND
      || interval.unit === COMPONENT_MINUTE)
  ) {
    return i18n.t('now')
  }

  if (options?.interval === DATE_INTERVAL_LONG
    || options?.interval === DATE_INTERVAL_LONG_MASK
  ) {
    switch (interval.unit) {
      case COMPONENT_DAY:
        unitString = i18n.t((plural) ? 'dateUnitDaysLong' : 'dateUnitDayLong')
        break
      case COMPONENT_HOUR:
        unitString = i18n.t((plural) ? 'dateUnitHoursLong' : 'dateUnitHourLong')
        break
      case COMPONENT_MINUTE:
        unitString = i18n.t((plural) ? 'dateUnitMinutesLong' : 'dateUnitMinuteLong')
        break
      case COMPONENT_MONTH:
        unitString = i18n.t((plural) ? 'dateUnitMonthsLong' : 'dateUnitMonthLong')
        break
      case COMPONENT_SECOND:
        unitString = i18n.t((plural) ? 'dateUnitSecondsLong' : 'dateUnitSecondLong')
        break
      case COMPONENT_WEEK:
        unitString = i18n.t((plural) ? 'dateUnitWeeksLong' : 'dateUnitWeekLong')
        break
      case COMPONENT_YEAR:
        unitString = i18n.t((plural) ? 'dateUnitYearsLong' : 'dateUnitYearLong')
        break
    }
  }
  if (options?.interval === DATE_INTERVAL_SHORT
    || options?.interval === DATE_INTERVAL_SHORT_MASK
  ) {
    switch (interval.unit) {
      case COMPONENT_DAY:
        unitString = i18n.t('dateUnitDayShort')
        break
      case COMPONENT_HOUR:
        unitString = i18n.t('dateUnitHourShort')
        break
      case COMPONENT_MINUTE:
        unitString = i18n.t('dateUnitMinuteShort')
        break
      case COMPONENT_MONTH:
        unitString = i18n.t('dateUnitMonthShort')
        break
      case COMPONENT_SECOND:
        unitString = i18n.t('dateUnitSecondShort')
        break
      case COMPONENT_WEEK:
        unitString = i18n.t('dateUnitWeekShort')
        break
      case COMPONENT_YEAR:
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