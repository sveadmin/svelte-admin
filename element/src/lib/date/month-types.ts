import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_MONTH = 'month'

export interface ComponentMonth extends SveadminComponent<
  typeof COMPONENT_MONTH,
  MonthDisplayProps
>
{
}

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

export interface MonthDisplayProps extends DateTimeCommonProps{
  month?: DateMonth;
}
