import {
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TIME_ZONE_NAME_REGION,
} from '../types.js'

import type {
  TextDisplayPartTimeZone,
} from '../types.js'

export function ZZ() : TextDisplayPartTimeZone {
  return {
    options: {
      timeZoneName: TIME_ZONE_NAME_REGION,
    },
    type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  }
}