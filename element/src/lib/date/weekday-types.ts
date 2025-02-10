import type { TextDisplayPartBase } from '$lib/literal/types.js'

export const DATE_WEEKDAY_DELTA_LONG = 'deltaLong'

export const DATE_WEEKDAY_DELTA_SHORT = 'deltaShort'

export const DATE_WEEKDAY_LONG = 'long'

export const DATE_WEEKDAY_NARROW = 'narrow'

export const DATE_WEEKDAY_NUMERIC = 'numeric'

export const DATE_WEEKDAY_SHORT = 'short'

export const ALLOWED_DATE_WEEKDAY = [
  DATE_WEEKDAY_DELTA_LONG,
  DATE_WEEKDAY_DELTA_SHORT,
  DATE_WEEKDAY_LONG,
  DATE_WEEKDAY_NARROW,
  DATE_WEEKDAY_NUMERIC,
  DATE_WEEKDAY_SHORT,
]

export const DATE_WEEKDAY_DELTA_YSD = 'deltaYsd'

export const DATE_WEEKDAY_DELTA_TDY = 'deltaTdy'

export const DATE_WEEKDAY_DELTA_TMW = 'deltaTmw'

export const DATE_WEEKDAY_DELTA_YESTERDAY = 'deltaYesterday'

export const DATE_WEEKDAY_DELTA_TODAY = 'deltaToday'

export const DATE_WEEKDAY_DELTA_TOMORROW = 'deltaTomorrow'

export type DateWeekday = typeof ALLOWED_DATE_WEEKDAY[number]

export interface WeekdayOptions {
  weekday?: DateWeekday;
}

export const TEXT_DISPLAY_TYPE_WEEKDAY = 'weekday'

export interface TextDisplayPartWeekday extends TextDisplayPartBase {
  locale?: string,
  options?: WeekdayOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_WEEKDAY,
}

export interface TextInputPartWeekday extends TextDisplayPartWeekday {
  editor?: {
  }
}