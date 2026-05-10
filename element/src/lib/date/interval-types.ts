import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  DateTimeCommonProps,
} from './date-time.js'

import { COMPONENT_DAY } from './day-types.js'
import { COMPONENT_HOUR } from './hour-types.js'
import { COMPONENT_MINUTE } from './minute-types.js'
import { COMPONENT_MONTH } from './month-types.js'
import { COMPONENT_SECOND } from './second-types.js'
import { COMPONENT_WEEK } from './week-types.js'
import { COMPONENT_YEAR } from './year-types.js'

export const COMPONENT_INTERVAL = 'interval'

export interface ComponentInterval extends SveadminComponent<
  typeof COMPONENT_INTERVAL,
  undefined,
  IntervalDisplayProps
>
{
}

export const DATE_INTERVAL_LONG = 'long'

export const DATE_INTERVAL_LONG_MASK = 'longMask'

export const DATE_INTERVAL_NARROW = 'narrow'

export const DATE_INTERVAL_SHORT = 'short'

export const DATE_INTERVAL_SHORT_MASK = 'shortMask'

export const ALLOWED_DATE_INTERVAL = [
  DATE_INTERVAL_LONG,
  DATE_INTERVAL_LONG_MASK,
  DATE_INTERVAL_SHORT,
  DATE_INTERVAL_SHORT_MASK,
]

export type DateInterval = typeof ALLOWED_DATE_INTERVAL[number]

export const DAY_INTERVAL = COMPONENT_DAY + 'Interval'

export const HOUR_INTERVAL = COMPONENT_HOUR + 'Interval'

export const MINUTE_INTERVAL = COMPONENT_MINUTE + 'Interval'

export const MONTH_INTERVAL = COMPONENT_MONTH + 'Interval'

export const SECOND_INTERVAL = COMPONENT_SECOND + 'Interval'

export const WEEK_INTERVAL = COMPONENT_WEEK + 'Interval'

export const YEAR_INTERVAL = COMPONENT_YEAR + 'Interval'

export const ALLOWED_INTERVAL_UNITS = [
  DAY_INTERVAL,
  HOUR_INTERVAL,
  MINUTE_INTERVAL,
  MONTH_INTERVAL,
  SECOND_INTERVAL,
  WEEK_INTERVAL,
  YEAR_INTERVAL
]

export type IntervalUnits = typeof ALLOWED_INTERVAL_UNITS[number]

export interface IntervalDisplayProps extends DateTimeCommonProps {
  interval?: DateInterval;
  unit?: IntervalUnits;
}

export interface Interval {
  past: boolean;
  unit: IntervalUnits;
  value: number;
}