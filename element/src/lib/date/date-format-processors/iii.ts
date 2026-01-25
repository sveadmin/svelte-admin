import {
  DATE_INTERVAL_LONG,
  TEXT_DISPLAY_TYPE_INTERVAL,
} from '../interval-types.js'

import type {
  IntervalUnits,
  TextDisplayPartInterval,
} from '../interval-types.js'

import {
  intervalUnitToType,
} from '../helper/index.js'

export function iii(match?: string) : TextDisplayPartInterval {
  const unit: IntervalUnits | undefined = intervalUnitToType(match)
  return {
    options: {
      interval: DATE_INTERVAL_LONG,
      unit,
    },
    type: TEXT_DISPLAY_TYPE_INTERVAL,
  }
}