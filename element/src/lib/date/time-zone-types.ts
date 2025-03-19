import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type { CommonInputProps, TIME_INPUT_TYPE_TIME_ZONE } from '$lib/types.js'

export interface EditorPartTimeZone extends CommonInputProps {
}

export const TEXT_DISPLAY_TYPE_TIME_ZONE_NAME = 'timeZoneName'

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

export interface TimeZoneOptions {
  timeZone?: string; //https://www.iana.org/time-zones
  timeZoneName?: TimeZoneName;
}

export interface TextDisplayPartTimeZone extends TextDisplayPartBase {
  locale?: string,
  options?: TimeZoneOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
}

export interface TextInputPartTimeZone extends
  TextDisplayPartTimeZone {
  editor?: EditorPartTimeZone,
}