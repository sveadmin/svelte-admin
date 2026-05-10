import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export interface HourDisplayProps extends DateTimeCommonProps {
  hour?: TimeHour;
  hour12?: boolean;
  hourCycle?: TimeHourCycle;
}

export const COMPONENT_HOUR = 'hour'

export interface ComponentHour extends SveadminComponent<
  typeof COMPONENT_HOUR,
  undefined,
  HourDisplayProps
>
{
}

export const TIME_HOUR_2DIGIT = '2-digit'

export const TIME_HOUR_NUMERIC = 'numeric'

export const ALLOWED_TIME_HOUR = [
  TIME_HOUR_2DIGIT,
  TIME_HOUR_NUMERIC,
]

export type TimeHour = typeof ALLOWED_TIME_HOUR[number]

export const TIME_HOUR_CYCLE_H11 = 'h11'

export const TIME_HOUR_CYCLE_H12 = 'h12'

export const TIME_HOUR_CYCLE_H23 = 'h23'

export const TIME_HOUR_CYCLE_H24 = 'h24'

export const ALLOWED_TIME_HOUR_CYCLE = [
  TIME_HOUR_CYCLE_H11,
  TIME_HOUR_CYCLE_H12,
  TIME_HOUR_CYCLE_H23,
  TIME_HOUR_CYCLE_H24
]

export type TimeHourCycle = typeof ALLOWED_TIME_HOUR_CYCLE[number]