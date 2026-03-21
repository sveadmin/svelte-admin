import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
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
  DEFAULT_LOCALE,
  COMPONENT_TIME_ZONE_NAME,
} from '../time-zone-types.js'

import {
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  COMPONENT_WEEKDAY,
} from '../weekday-types.js'

import {
  COMPONENT_YEAR,
} from '../year-types.js'

import type {
  DateTimeDisplayProps,
} from '../types.js'

export function prepareMaskOptionsReducer(
  inheritedDateOptions: DateTimeDisplayProps,
  index?: number,
) : (
  aggregator: SveadminComponent<any>[],
  currentNewPart: SveadminComponent<any>
) => SveadminComponent<any>[] {
  const locale = inheritedDateOptions?.locale ?? DEFAULT_LOCALE

  return (
    aggregator: SveadminComponent<any>[],
    currentNewPart: SveadminComponent<any>
  ) : SveadminComponent<any>[] => {
    if (currentNewPart.type === COMPONENT_LITERAL) {
      aggregator.push(currentNewPart)
      return aggregator
    }

    const currentConfig = currentNewPart?.display?.config || {}
    let newPartToBeAdded: SveadminComponent<any> = {
      display: {
        config: {
          locale: currentConfig?.locale ?? locale,
        }
      },
      type: currentNewPart.type,
    }
    const config = newPartToBeAdded.display?.config || {}

    if (index
      || currentNewPart.index) {
      newPartToBeAdded.index = index ?? currentNewPart.index
    }

    const timeZone = inheritedDateOptions?.timeZone || currentConfig?.timeZone
    if (timeZone) {
      config.timeZone = timeZone
    }

    switch (currentNewPart.type) {
      case COMPONENT_DAY:
        const day: string = inheritedDateOptions?.day || currentConfig?.day
        if (day) {
          config.day = day
        }
        break
      case COMPONENT_DAY_PERIOD:
        const dayPeriod: string = inheritedDateOptions?.dayPeriod || currentConfig?.dayPeriod,
          lowerCase: boolean = inheritedDateOptions?.lowerCase ?? currentConfig?.lowerCase
        if (dayPeriod) {
          config.dayPeriod = dayPeriod
        }
        if (typeof lowerCase === 'boolean') {
          config.lowerCase = lowerCase
        }
        break
      case COMPONENT_ERA:
        const era: string = inheritedDateOptions?.era || currentConfig?.era
        if (era) {
          config.era = era
        }
        break
      case COMPONENT_FRACTIONAL_SECOND:
        const fractionalSecondDigits: number = inheritedDateOptions?.fractionalSecondDigits || currentConfig?.fractionalSecondDigits
        if (fractionalSecondDigits) {
          config.fractionalSecondDigits = fractionalSecondDigits
        }
        break
      case COMPONENT_HOUR:
        const hour: string = inheritedDateOptions?.hour || currentConfig?.hour,
          hour12: boolean = inheritedDateOptions?.hour12 ?? currentConfig?.hour12,
          hourCycle: string = inheritedDateOptions?.hourCycle || currentConfig?.hourCycle
        if (hour) {
          config.hour = hour
        }
        if (typeof hour12 === 'boolean') {
          config.hour12 = hour12
        }
        if (hourCycle) {
          config.hourCycle = hourCycle
        }
        break
      case COMPONENT_INTERVAL:
        const interval: string = inheritedDateOptions?.interval || currentConfig?.interval,
          unit: string = inheritedDateOptions?.unit || currentConfig?.unit
        if (interval) {
          config.interval = interval
        }
        if (unit) {
          config.unit = unit
        }
        break
      case COMPONENT_MINUTE:
        const minute: string = inheritedDateOptions?.minute || currentConfig?.minute
        if (minute) {
          config.minute = minute
        }
        break
      case COMPONENT_MONTH:
        const month: string = inheritedDateOptions?.month || currentConfig?.month
        if (month) {
          config.month = month
        }
        break
      case COMPONENT_SECOND:
        const second: string = inheritedDateOptions?.second || currentConfig?.second
        if (second) {
          config.second = second
        }
        break
      case COMPONENT_TIME_ZONE_NAME:
        const timeZoneName: string = inheritedDateOptions?.timeZoneName || currentConfig?.timeZoneName
        if (timeZoneName) {
          config.timeZoneName = timeZoneName
        }
        break
      case COMPONENT_WEEK:
        const week: string = inheritedDateOptions?.week || currentConfig?.week
        if (week) {
          config.week = week
        }
        break
      case COMPONENT_WEEKDAY:
        const weekday: string = inheritedDateOptions?.weekday || currentConfig?.weekday
        if (weekday) {
          config.weekday = weekday
        }
        break
      case COMPONENT_YEAR:
        const year: string = inheritedDateOptions?.year || currentConfig?.year
        if (year) {
          config.year = year
        }
        break
      default:
        return aggregator
    }
    aggregator.push(newPartToBeAdded)
    return aggregator
  }
}