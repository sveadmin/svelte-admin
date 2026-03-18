import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_TIME_ZONE_NAME = 'timeZoneName'

export interface ComponentTimeZone extends SveadminComponent{
  display?: {
    config?: TimeZoneDisplayProps,
  },
  type: typeof COMPONENT_TIME_ZONE_NAME,
}

export const DEFAULT_LOCALE = 'sv-SE'

export const TIME_ZONE_NAME_LONG = 'long'

export const TIME_ZONE_NAME_LONG_GENERIC = 'longGeneric'

export const TIME_ZONE_NAME_LONG_OFFSET = 'longOffset'

export const TIME_ZONE_NAME_REGION = 'region'

export const TIME_ZONE_NAME_SHORT = 'short'

export const TIME_ZONE_NAME_SHORT_GENERIC = 'shortGeneric'

export const TIME_ZONE_NAME_SHORT_OFFSET = 'shortOffset'

export const ALLOWED_TIME_ZONE_NAME = [
  TIME_ZONE_NAME_LONG,
  TIME_ZONE_NAME_LONG_GENERIC,
  TIME_ZONE_NAME_LONG_OFFSET,
  TIME_ZONE_NAME_REGION,
  TIME_ZONE_NAME_SHORT,
  TIME_ZONE_NAME_SHORT_GENERIC,
  TIME_ZONE_NAME_SHORT_OFFSET,
]

export type TimeZoneName = typeof ALLOWED_TIME_ZONE_NAME[number]

export interface TimeZoneDisplayProps extends DateTimeCommonProps {
  timeZone?: string; //https://www.iana.org/time-zones
  timeZoneName?: TimeZoneName;
}