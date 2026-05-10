import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps,
} from './date-time.js'

export const COMPONENT_DAY_PERIOD = 'dayPeriod'

export interface ComponentDayPeriod extends SveadminComponent<
  typeof COMPONENT_DAY_PERIOD,
  undefined,
  DayPeriodDisplayProps
>
{
}

export interface DayPeriodDisplayProps extends DateTimeCommonProps{
  dayPeriod?: TimeDayPeriod;
  lowerCase?: boolean;
}

export const TIME_DAY_PERIOD_LONG = 'long'

export const TIME_DAY_PERIOD_NARROW = 'narrow'

export const TIME_DAY_PERIOD_SHORT = 'short'

export const ALLOWED_TIME_DAY_PERIOD = [
  TIME_DAY_PERIOD_LONG,
  TIME_DAY_PERIOD_NARROW,
  TIME_DAY_PERIOD_SHORT,
]

export type TimeDayPeriod = typeof ALLOWED_TIME_DAY_PERIOD[number]