import {
  COMPONENT_TIME_ZONE_NAME,
  TIME_ZONE_NAME_LONG_OFFSET,
} from '../time-zone-types.js'

import type {
  ComponentTimeZone,
} from '../time-zone-types.js'

export function p() : ComponentTimeZone {
  return {
    display: {
      config: {
        timeZoneName: TIME_ZONE_NAME_LONG_OFFSET,
      }
    },
    type: COMPONENT_TIME_ZONE_NAME,
  }
}