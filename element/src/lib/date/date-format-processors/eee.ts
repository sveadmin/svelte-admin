import {
  DATE_ERA_LONG,
  COMPONENT_ERA,
} from '../era-types.js'

import type {
  ComponentEra,
} from '../era-types.js'

export function eee() : ComponentEra {
  return {
    display: {
      config: {
        era: DATE_ERA_LONG,
      }
    },
    type: COMPONENT_ERA,
  }
}