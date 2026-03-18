import {
  COMPONENT_TIME_ZONE_NAME,
  TIME_ZONE_NAME_REGION,
} from '../time-zone-types.js'

import type {
  ComponentTimeZone,
} from '../time-zone-types.js'

export function ZZ() : ComponentTimeZone {
  return {
    display: {
      config: {
        timeZoneName: TIME_ZONE_NAME_REGION,
      }
    },
    type: COMPONENT_TIME_ZONE_NAME,
  }
}