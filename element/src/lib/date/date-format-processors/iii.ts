import {
  DATE_INTERVAL_LONG,
  COMPONENT_INTERVAL,
} from '../interval-types.js'

import type {
  IntervalUnits,
  ComponentInterval,
} from '../interval-types.js'

import {
  intervalUnitToType,
} from '../helper/index.js'

export function iii(match?: string) : ComponentInterval {
  const unit: IntervalUnits | undefined = intervalUnitToType(match)
  return {
    display: {
      config: {
        interval: DATE_INTERVAL_LONG,
        unit,
      }
    },
    type: COMPONENT_INTERVAL,
  }
}