import {
  DATE_INTERVAL_LONG_MASK,
  TEXT_DISPLAY_TYPE_INTERVAL,
} from '../types.js'

import type {
  IntervalUnits,
  TextDisplayPartInterval,
} from '../types.js'

import {
  intervalUnitToType,
} from '../helper/index.js'

export function III(match?: string) : TextDisplayPartInterval {
  const unit: IntervalUnits | undefined = intervalUnitToType(match)
  return {
    options: {
      interval: DATE_INTERVAL_LONG_MASK,
      unit,
    },
    type: TEXT_DISPLAY_TYPE_INTERVAL,
  }
}