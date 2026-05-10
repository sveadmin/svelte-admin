import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps,
} from './date-time.js'

export const COMPONENT_DAY = 'day'

export interface ComponentDay extends SveadminComponent<
  typeof COMPONENT_DAY,
  undefined,
  DayDisplayProps
>
{
}

export const DATE_DAY_2DIGIT = '2-digit'

export const DATE_DAY_NUMERIC = 'numeric'

export const ALLOWED_DATE_DAY = [
  DATE_DAY_2DIGIT,
  DATE_DAY_NUMERIC,
]

export type DateDay = typeof ALLOWED_DATE_DAY[number]

export interface DayDisplayProps extends DateTimeCommonProps {
  day?: DateDay;
}