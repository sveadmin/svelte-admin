import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps
} from './date-time.js'

export const COMPONENT_SECOND = 'second'

export interface ComponentSecond extends SveadminComponent {
  display?: {
    config?: SecondDisplayProps,
  },
  type: typeof COMPONENT_SECOND,
}

export interface SecondDisplayProps extends DateTimeCommonProps {
  second?: TimeSecond;
}

export const TIME_SECOND_2DIGIT = '2-digit'

export const TIME_SECOND_NUMERIC = 'numeric'

export const ALLOWED_TIME_SECOND = [
  TIME_SECOND_2DIGIT,
  TIME_SECOND_NUMERIC,
]

export type TimeSecond = typeof ALLOWED_TIME_SECOND[number]
