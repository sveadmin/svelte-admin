import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_YEAR = 'year'

export interface ComponentYear extends SveadminComponent<
  typeof COMPONENT_YEAR,
  undefined,
  YearDisplayProps
>
{
}

export const DATE_YEAR_2DIGIT = '2-digit'

export const DATE_YEAR_NUMERIC = 'numeric'

export const ALLOWED_DATE_YEAR = [
  DATE_YEAR_2DIGIT,
  DATE_YEAR_NUMERIC,
]

export type DateYear = typeof ALLOWED_DATE_YEAR[number]

export interface YearDisplayProps extends DateTimeCommonProps {
  year?: DateYear;
}