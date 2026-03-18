import {
  COMPONENT_TIME_ZONE_NAME,
  TIME_ZONE_NAME_SHORT_OFFSET,
} from '../time-zone-types.js'

import type {
  ComponentTimeZone,
} from '../time-zone-types.js'

export function o() : ComponentTimeZone {
  return {
    display: {
      config: {
        timeZoneName: TIME_ZONE_NAME_SHORT_OFFSET,
      }
    },
    type: COMPONENT_TIME_ZONE_NAME,
  }
}