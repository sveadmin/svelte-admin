
import {
  COMPONENT_DAY,
} from '../day-types.js'

import {
  COMPONENT_HOUR,
} from '../hour-types.js'

import type {
  Interval,
  IntervalUnits,
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
  COMPONENT_WEEK,
} from '../week-types.js'

import {
  COMPONENT_YEAR,
} from '../year-types.js'


export function getInterval(value: number, unit?: IntervalUnits, secondsDenominator: number = 1000) : Interval {
  value = value / secondsDenominator
  const past = value < 0
  if (unit === COMPONENT_SECOND
    || (!unit && Math.abs(value) < 60)
  ) {
    return {
      past,
      unit: COMPONENT_SECOND,
      value,
    }
  }

  value = value / 60
  if (unit === COMPONENT_MINUTE
    || (!unit && Math.abs(value) < 60)
  ) {
    return {
      past,
      unit: COMPONENT_MINUTE,
      value,
    }
  }

  value = value / 60
  if (unit === COMPONENT_HOUR
    || (!unit && Math.abs(value) < 60)
  ) {
    return {
      past,
      unit: COMPONENT_HOUR,
      value,
    }
  }

  value = value / 24
  const day = value
  if (unit === COMPONENT_DAY
    || (!unit && Math.abs(value) < 24)
  ) {
    return {
      past,
      unit: COMPONENT_DAY,
      value,
    }
  }

  value = day / 7
  if (unit === COMPONENT_WEEK
    || (!unit && Math.abs(value) < 5)
  ) {
    return {
      past,
      unit: COMPONENT_WEEK,
      value,
    }
  }

  value = day / 30
  if (unit === COMPONENT_MONTH
    || (!unit && Math.abs(value) < 12)
  ) {
    return {
      past,
      unit: COMPONENT_MONTH,
      value,
    }
  }

  value = day / 365
  return {
    past,
    unit: COMPONENT_YEAR,
    value,
  }
}