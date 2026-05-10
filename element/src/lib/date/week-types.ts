import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_WEEK = 'week'

export interface ComponentWeek extends SveadminComponent<
  typeof COMPONENT_WEEK,
  undefined,
  WeekDisplayProps
>
{
}

export const DATE_WEEK_2DIGIT = '2-digit'

export const DATE_WEEK_NUMERIC = 'numeric'

export const ALLOWED_DATE_WEEK = [
  DATE_WEEK_2DIGIT,
  DATE_WEEK_NUMERIC,
]

export type DateWeek = typeof ALLOWED_DATE_WEEK[number]

export interface WeekDisplayProps extends DateTimeCommonProps {
  week?: DateWeek;
}