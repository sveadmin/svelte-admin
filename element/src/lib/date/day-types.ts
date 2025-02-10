import type { TextDisplayPartBase } from '$lib/literal/types.js'

export const DATE_DAY_2DIGIT = '2-digit'

export const DATE_DAY_NUMERIC = 'numeric'

export const ALLOWED_DATE_DAY = [
  DATE_DAY_2DIGIT,
  DATE_DAY_NUMERIC,
]

export type DateDay = typeof ALLOWED_DATE_DAY[number]

export interface DayOptions {
  day?: DateDay;
}

export const TEXT_DISPLAY_TYPE_DAY = 'day'

export interface TextDisplayPartDay extends TextDisplayPartBase {
  locale?: string,
  options?: DayOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DAY,
}

export interface TextInputPartDay extends TextDisplayPartDay {
  editor?: {
  }
}