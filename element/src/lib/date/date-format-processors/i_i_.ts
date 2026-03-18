import {
  DATE_INTERVAL_SHORT_MASK,
  COMPONENT_INTERVAL,
} from '../interval-types.js'

import type {
  IntervalUnits,
  ComponentInterval,
} from '../interval-types.js'

import {
  intervalUnitToType,
} from '../helper/index.js'

export function II(match?: string) : ComponentInterval {
  const unit: IntervalUnits | undefined = intervalUnitToType(match)
  return {
    display: {
      config: {
        interval: DATE_INTERVAL_SHORT_MASK,
        unit,
      }
    },
    type: COMPONENT_INTERVAL,
  }
}