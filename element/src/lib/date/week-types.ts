import type { TextDisplayPartBase } from '$lib/literal/types.js'

export const DATE_WEEK_2DIGIT = '2-digit'

export const DATE_WEEK_NUMERIC = 'numeric'

export const ALLOWED_DATE_WEEK = [
  DATE_WEEK_2DIGIT,
  DATE_WEEK_NUMERIC,
]

export type DateWeek = typeof ALLOWED_DATE_WEEK[number]

export interface WeekOptions {
  week?: DateWeek;
}

export const TEXT_DISPLAY_TYPE_WEEK = 'week'

export interface TextDisplayPartWeek extends TextDisplayPartBase {
  locale?: string,
  options?: WeekOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_WEEK,
}