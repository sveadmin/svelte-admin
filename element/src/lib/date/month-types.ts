import type { TextDisplayPartBase } from '$lib/literal/types.js'

export const DATE_MONTH_2DIGIT = '2-digit'

export const DATE_MONTH_LONG = 'long'

export const DATE_MONTH_NARROW = 'narrow'

export const DATE_MONTH_NUMERIC = 'numeric'

export const DATE_MONTH_SHORT = 'short'

export const ALLOWED_DATE_MONTH = [
  DATE_MONTH_2DIGIT,
  DATE_MONTH_LONG,
  DATE_MONTH_NARROW,
  DATE_MONTH_NUMERIC,
  DATE_MONTH_SHORT
]

export type DateMonth = typeof ALLOWED_DATE_MONTH[number]

export interface MonthOptions {
  month?: DateMonth;
}

export const TEXT_DISPLAY_TYPE_MONTH = 'month'

export interface TextDisplayPartMonth extends TextDisplayPartBase {
  locale?: string,
  options?: MonthOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_MONTH,
}