import {
  DATE_INTERVAL_SHORT_MASK,
  TEXT_DISPLAY_TYPE_INTERVAL,
} from '../interval-types.js'

import type {
  IntervalUnits,
  TextDisplayPartInterval,
} from '../interval-types.js'

import {
  intervalUnitToType,
} from '../helper/index.js'

export function II(match?: string) : TextDisplayPartInterval {
  const unit: IntervalUnits | undefined = intervalUnitToType(match)
  return {
    options: {
      interval: DATE_INTERVAL_SHORT_MASK,
      unit,
    },
    type: TEXT_DISPLAY_TYPE_INTERVAL,
  }
}