import {
  DATE_ERA_SHORT,
  COMPONENT_ERA,
} from '../era-types.js'

import type {
  ComponentEra,
} from '../era-types.js'

export function ee() : ComponentEra {
  return {
    display: {
      config: {
        era: DATE_ERA_SHORT,
      }
    },
    type: COMPONENT_ERA,
  }
}