import type {
  Interval,
  IntervalUnits,
} from '../interval-types.js'

import {
  getInterval,
} from './get-interval.js'

export function getRoundedInterval(value: number, unit?: IntervalUnits, secondsDenominator: number = 1000) : Interval {
  let unrounded = getInterval(value, unit, secondsDenominator)
  return {
    past: unrounded.past,
    unit: unrounded.unit,
    value: (unrounded.value < 0) ? Math.ceil(unrounded.value) : Math.floor(unrounded.value),
  }
}
