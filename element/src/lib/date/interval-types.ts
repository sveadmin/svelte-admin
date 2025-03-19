import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type { CommonInputProps, DATE_INPUT_TYPE_INTERVAL } from '$lib/types.js'

import { TEXT_DISPLAY_TYPE_DAY } from './day-types.js'
import { TEXT_DISPLAY_TYPE_HOUR } from './hour-types.js'
import { TEXT_DISPLAY_TYPE_MINUTE } from './minute-types.js'
import { TEXT_DISPLAY_TYPE_MONTH } from './month-types.js'
import { TEXT_DISPLAY_TYPE_SECOND } from './second-types.js'
import { TEXT_DISPLAY_TYPE_WEEK } from './week-types.js'
import { TEXT_DISPLAY_TYPE_YEAR } from './year-types.js'

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

export interface EditorPartInterval extends CommonInputProps {
}

export const INTERVAL_DAY = TEXT_DISPLAY_TYPE_DAY

export const INTERVAL_HOUR = TEXT_DISPLAY_TYPE_HOUR

export const INTERVAL_MINUTE = TEXT_DISPLAY_TYPE_MINUTE

export const INTERVAL_MONTH = TEXT_DISPLAY_TYPE_MONTH

export const INTERVAL_SECOND = TEXT_DISPLAY_TYPE_SECOND

export const INTERVAL_WEEK = TEXT_DISPLAY_TYPE_WEEK

export const INTERVAL_YEAR = TEXT_DISPLAY_TYPE_YEAR

export const ALLOWED_INTERVAL_UNITS = [
  INTERVAL_DAY,
  INTERVAL_HOUR,
  INTERVAL_MINUTE,
  INTERVAL_MONTH,
  INTERVAL_SECOND,
  INTERVAL_WEEK,
  INTERVAL_YEAR
]

export type IntervalUnits = typeof ALLOWED_INTERVAL_UNITS[number]

export interface IntervalOptions {
  interval?: DateInterval;
  unit?: IntervalUnits;
}

export interface Interval {
  past: boolean;
  unit: IntervalUnits;
  value: number;
}

export const TEXT_DISPLAY_TYPE_INTERVAL = 'interval'

export interface TextDisplayPartInterval extends TextDisplayPartBase {
  locale?: string,
  options?: IntervalOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_INTERVAL,
}

export interface TextInputPartInterval extends
  TextDisplayPartInterval
{
  editor?: EditorPartInterval,
}