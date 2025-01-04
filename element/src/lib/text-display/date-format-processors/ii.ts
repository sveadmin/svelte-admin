import {
  DATE_INTERVAL_SHORT,
  TEXT_DISPLAY_TYPE_INTERVAL,
} from '../types.js'

import type {
  IntervalUnits,
  TextDisplayPartInterval,
} from '../types.js'

import {
  intervalUnitToType,
} from '../helper/index.js'

export function ii(match?: string) : TextDisplayPartInterval {
  const unit: IntervalUnits | undefined = intervalUnitToType(match)
  return {
    options: {
      interval: DATE_INTERVAL_SHORT,
      unit,
    },
    type: TEXT_DISPLAY_TYPE_INTERVAL,
  }
}