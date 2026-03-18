import {
  COMPONENT_TIME_ZONE_NAME,
  TIME_ZONE_NAME_SHORT,
} from '../time-zone-types.js'

import type {
  ComponentTimeZone,
} from '../time-zone-types.js'

export function Z() : ComponentTimeZone {
  return {
    display: {
      config: {
        timeZoneName: TIME_ZONE_NAME_SHORT,
      }
    },
    type: COMPONENT_TIME_ZONE_NAME,
  }
}