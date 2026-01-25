
import {
  TEXT_DISPLAY_TYPE_DAY,
} from '../day-types.js'

import {
  TEXT_DISPLAY_TYPE_HOUR,
} from '../hour-types.js'

import type {
  Interval,
  IntervalUnits,
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
  TEXT_DISPLAY_TYPE_WEEK,
} from '../week-types.js'

import {
  TEXT_DISPLAY_TYPE_YEAR,
} from '../year-types.js'


export function getInterval(value: number, unit?: IntervalUnits, secondsDenominator: number = 1000) : Interval {
  value = value / secondsDenominator
  const past = value < 0
  if (unit === TEXT_DISPLAY_TYPE_SECOND
    || (!unit && Math.abs(value) < 60)
  ) {
    return {
      past,
      unit: TEXT_DISPLAY_TYPE_SECOND,
      value,
    }
  }

  value = value / 60
  if (unit === TEXT_DISPLAY_TYPE_MINUTE
    || (!unit && Math.abs(value) < 60)
  ) {
    return {
      past,
      unit: TEXT_DISPLAY_TYPE_MINUTE,
      value,
    }
  }

  value = value / 60
  if (unit === TEXT_DISPLAY_TYPE_HOUR
    || (!unit && Math.abs(value) < 60)
  ) {
    return {
      past,
      unit: TEXT_DISPLAY_TYPE_HOUR,
      value,
    }
  }

  value = value / 24
  const day = value
  if (unit === TEXT_DISPLAY_TYPE_DAY
    || (!unit && Math.abs(value) < 24)
  ) {
    return {
      past,
      unit: TEXT_DISPLAY_TYPE_DAY,
      value,
    }
  }

  value = day / 7
  if (unit === TEXT_DISPLAY_TYPE_WEEK
    || (!unit && Math.abs(value) < 5)
  ) {
    return {
      past,
      unit: TEXT_DISPLAY_TYPE_WEEK,
      value,
    }
  }

  value = day / 30
  if (unit === TEXT_DISPLAY_TYPE_MONTH
    || (!unit && Math.abs(value) < 12)
  ) {
    return {
      past,
      unit: TEXT_DISPLAY_TYPE_MONTH,
      value,
    }
  }

  value = day / 365
  return {
    past,
    unit: TEXT_DISPLAY_TYPE_YEAR,
    value,
  }
}