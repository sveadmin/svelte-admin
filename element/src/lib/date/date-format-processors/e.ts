import {
  DATE_ERA_NARROW,
  COMPONENT_ERA,
} from '../era-types.js'

import type {
  ComponentEra,
} from '../era-types.js'

export function e() : ComponentEra {
  return {
    display: {
      config: {
        era: DATE_ERA_NARROW,
      }
    },
    type: COMPONENT_ERA,
  }
}