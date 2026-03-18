import type {
  TranslationStore,
} from '@sveadmin/common'

import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  DATE_DAY_NUMERIC,
  COMPONENT_DAY,
} from '../day-types.js'

import {
  COMPONENT_DAY_PERIOD,
} from '../day-period-types.js'

import {
  COMPONENT_HOUR,
  TIME_HOUR_NUMERIC,
} from '../hour-types.js'

import {
  COMPONENT_INTERVAL,
} from '../interval-types.js'

import {
  COMPONENT_MINUTE,
  TIME_MINUTE_NUMERIC,
} from '../minute-types.js'

import {
  DATE_MONTH_NUMERIC,
  COMPONENT_MONTH,
} from '../month-types.js'

import {
  COMPONENT_SECOND,
  TIME_SECOND_NUMERIC,
} from '../second-types.js'

import {
  COMPONENT_TIME_ZONE_NAME,
  TIME_ZONE_NAME_REGION,
} from '../time-zone-types.js'

import {
  DATE_WEEK_2DIGIT,
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_NUMERIC,
  COMPONENT_WEEKDAY,
} from '../weekday-types.js'

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
) : (currentPart: SveadminComponent) => string {
  return function (currentPart: SveadminComponent) : string {
    if (!mappedParts[currentPart.type]) {
      return ''
    }
    const options = currentPart?.display?.config ?? {}

    if (currentPart.type === COMPONENT_INTERVAL) {
      return getIntervalString(value, options, i18n)
    }
    if (currentPart.type === COMPONENT_DAY_PERIOD) {
      const value = (options?.lowerCase)
        ? mappedParts[currentPart.type].value.toLocaleLowerCase()
        : mappedParts[currentPart.type].value
      return (options?.dayPeriod === 'narrow')
        ? value.substring(0, 1)
        : value
    }
    if ((currentPart.type === COMPONENT_MONTH && options?.month === DATE_MONTH_NUMERIC)
      || (currentPart.type === COMPONENT_DAY && options?.day === DATE_DAY_NUMERIC)
      || (currentPart.type === COMPONENT_HOUR && options?.hour === TIME_HOUR_NUMERIC)
      || (currentPart.type === COMPONENT_MINUTE && options?.minute === TIME_MINUTE_NUMERIC)
      || (currentPart.type === COMPONENT_SECOND && options?.second === TIME_SECOND_NUMERIC)) {
      //This fixes a fallback issue in Chrome, where any definition which includes more than one piece of the time / date will return 2-digit anyways
      const value = mappedParts[currentPart.type].value
      return (value[0] === '0')
        ? value.substring(1)
        : value
    }
    if (currentPart.type === COMPONENT_WEEKDAY
      && options?.weekday === DATE_WEEKDAY_NUMERIC
    ) {
      return value.getDay().toString()
    }
    if (currentPart.type === COMPONENT_WEEKDAY
      && options?.weekday === DATE_WEEKDAY_DELTA_LONG
    ) {
      const delta = getNeighbourDates(value)
      return (delta === null)
        ? mappedParts[currentPart.type].value
        : i18n.t(delta)
    }
    if (currentPart.type === COMPONENT_WEEKDAY
      && options?.weekday === DATE_WEEKDAY_DELTA_SHORT
    ) {
      const delta = getNeighbourDates(value, DATE_WEEKDAY_DELTA_SHORT)
      return (delta === null)
        ? mappedParts[currentPart.type].value
        : i18n.t(delta)
    }
    if (currentPart.type === COMPONENT_TIME_ZONE_NAME
      && options?.timeZoneName === TIME_ZONE_NAME_REGION
    ) {
      return dateTimeFormat.resolvedOptions().timeZone
    }
    if (currentPart.type === COMPONENT_WEEK) {
      const weekNumber = getIsoWeekNumber(value).toString()
      return (options?.week === DATE_WEEK_2DIGIT)
        ? '0'.substring(0,2-weekNumber.length) + weekNumber
        : weekNumber
    }
    return mappedParts[currentPart.type].value
  }
}