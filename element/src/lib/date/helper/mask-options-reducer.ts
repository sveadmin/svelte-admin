import {
  COMPONENT_LITERAL,
} from '$lib/literal/types.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/types.js'

import {
  TEXT_DISPLAY_TYPE_DAY,
} from '../day-types.js'

import {
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
} from '../day-period-types.js'

import {
  TEXT_DISPLAY_TYPE_ERA,
} from '../era-types.js'

import {
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
} from '../fractional-second-types.js'

import {
  TEXT_DISPLAY_TYPE_HOUR,
} from '../hour-types.js'

import {
  TEXT_DISPLAY_TYPE_INTERVAL,
} from '../interval-types.js'

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
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
} from '../time-zone-types.js'

import {
  TEXT_DISPLAY_TYPE_WEEK,
} from '../week-types.js'

import {
  TEXT_DISPLAY_TYPE_WEEKDAY,
} from '../weekday-types.js'

import {
  TEXT_DISPLAY_TYPE_YEAR,
} from '../year-types.js'

import type {
  DateTimeOptions,
  TextDisplayPartDateTimeObjects,

} from '../types.js'

export function prepareMaskOptionsReducer(
  inheritedDateOptions: DateTimeOptions,
  locale: string,
  index?: number,
  timeZone?: string
) : (
  aggregator: Array<TextDisplayPartDateTimeObjects | SveaComponentLiteral>,
  currentNewPart: TextDisplayPartDateTimeObjects | SveaComponentLiteral
) => Array<TextDisplayPartDateTimeObjects | SveaComponentLiteral> {
  return (
    aggregator: Array<TextDisplayPartDateTimeObjects | SveaComponentLiteral>,
    currentNewPart: TextDisplayPartDateTimeObjects | SveaComponentLiteral
  ) : Array<TextDisplayPartDateTimeObjects | SveaComponentLiteral> => {
    if (currentNewPart.type === COMPONENT_LITERAL) {
      aggregator.push({type: currentNewPart.type, value: currentNewPart.value})
      return aggregator
    }

    let newPartToBeAdded: TextDisplayPartDateTimeObjects = {
      locale,
      type: currentNewPart.type,
    }
    if (index
      || currentNewPart.index) {
      newPartToBeAdded.index = index ?? currentNewPart.index
    }
    if (timeZone) {
      newPartToBeAdded.timeZone = timeZone
    }

    let tempOptions: DateTimeOptions = {}
    switch (currentNewPart.type) {
      case TEXT_DISPLAY_TYPE_DAY:
        const day = inheritedDateOptions?.day || currentNewPart?.options?.day
        if (day) {
          newPartToBeAdded.options = {day}
        }
        break
      case TEXT_DISPLAY_TYPE_DAY_PERIOD:
        tempOptions = {}
        const dayPeriod = inheritedDateOptions?.dayPeriod || currentNewPart?.options?.dayPeriod
        if (dayPeriod) {
          tempOptions.dayPeriod = dayPeriod
        }
        const lowerCase = inheritedDateOptions?.lowerCase || currentNewPart?.options?.lowerCase
        if (lowerCase) {
          tempOptions.lowerCase = lowerCase
        }
        if (Object.keys(tempOptions).length > 0) {
          newPartToBeAdded.options = tempOptions
        }
        break
      case TEXT_DISPLAY_TYPE_ERA:
        const era = inheritedDateOptions?.era || currentNewPart?.options?.era
        if (era) {
          newPartToBeAdded.options = {era}
        }
        break
      case TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND:
        const fractionalSecondDigits = inheritedDateOptions?.fractionalSecondDigits || currentNewPart?.options?.fractionalSecondDigits
        if (fractionalSecondDigits) {
          newPartToBeAdded.options = {fractionalSecondDigits}
        }
        break
      case TEXT_DISPLAY_TYPE_HOUR:
        tempOptions = {}
        const hour = inheritedDateOptions?.hour || currentNewPart?.options?.hour
        if (hour) {
          tempOptions.hour = hour
        }
        let hour12: boolean | null = null
        if (typeof inheritedDateOptions?.hour12 === 'boolean') {
          hour12 = inheritedDateOptions?.hour12
        }
        if (hour12 === null
          && typeof currentNewPart?.options?.hour12 === 'boolean'
        ) {
          hour12 = currentNewPart?.options?.hour12
        }
        if (typeof hour12 === 'boolean') {
          tempOptions.hour12 = hour12
        }
        const hourCycle = inheritedDateOptions?.hourCycle || currentNewPart?.options?.hourCycle
        if (hourCycle) {
          tempOptions.hourCycle = hourCycle
        }
        if (Object.keys(tempOptions).length > 0) {
          newPartToBeAdded.options = tempOptions
        }
        break
      case TEXT_DISPLAY_TYPE_INTERVAL:
        tempOptions = {}
        const unit = inheritedDateOptions.unit || currentNewPart?.options?.unit
        if (unit) {
          tempOptions.unit = unit
        }
        const interval = inheritedDateOptions.interval || currentNewPart?.options?.interval
        if (interval) {
          tempOptions.interval = interval
        }
        if (Object.keys(tempOptions).length > 0) {
          newPartToBeAdded.options = tempOptions
        }
        break
      case TEXT_DISPLAY_TYPE_MINUTE:
        const minute = inheritedDateOptions?.minute || currentNewPart?.options?.minute
        if (minute) {
          newPartToBeAdded.options = {minute}
        }
        break
      case TEXT_DISPLAY_TYPE_MONTH:
        const month = inheritedDateOptions?.month || currentNewPart?.options?.month
        if (month) {
          newPartToBeAdded.options = {month}
        }
        break
      case TEXT_DISPLAY_TYPE_SECOND:
        const second = inheritedDateOptions?.second || currentNewPart?.options?.second
        if (second) {
          newPartToBeAdded.options = {second}
        }
        break
      case TEXT_DISPLAY_TYPE_TIME_ZONE_NAME:
        const timeZoneName = inheritedDateOptions?.timeZoneName || currentNewPart?.options?.timeZoneName
        if (timeZoneName) {
          newPartToBeAdded.options = {timeZoneName}
        }
        break
      case TEXT_DISPLAY_TYPE_WEEK:
        const week = inheritedDateOptions?.week || currentNewPart?.options?.week
        if (week) {
          newPartToBeAdded.options = {week}
        }
        break
      case TEXT_DISPLAY_TYPE_WEEKDAY:
        const weekday = inheritedDateOptions?.weekday || currentNewPart?.options?.weekday
        if (weekday) {
          newPartToBeAdded.options = {weekday}
        }
        break
      case TEXT_DISPLAY_TYPE_YEAR:
        const year = inheritedDateOptions?.year || currentNewPart?.options?.year
        if (year) {
          newPartToBeAdded.options = {year}
        }
        break
      default:
        return aggregator
    }
    aggregator.push(newPartToBeAdded)
    return aggregator
  }
}