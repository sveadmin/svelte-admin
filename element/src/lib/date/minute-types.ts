import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_MINUTE = 'minute'

export interface ComponentMinute extends SveadminComponent<
  typeof COMPONENT_MINUTE,
  MinuteDisplayProps
>
{
}

export interface MinuteDisplayProps extends DateTimeCommonProps {
  minute?: TimeMinute;
}

export const TIME_MINUTE_2DIGIT = '2-digit'

export const TIME_MINUTE_NUMERIC = 'numeric'

export const ALLOWED_TIME_MINUTE = [
  TIME_MINUTE_2DIGIT,
  TIME_MINUTE_NUMERIC,
]

export type TimeMinute = typeof ALLOWED_TIME_MINUTE[number]