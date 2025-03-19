import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type { CommonInputProps, TIME_INPUT_TYPE_DAY_PERIOD } from '$lib/types.js';

export interface DayPeriodOptions {
  dayPeriod?: TimeDayPeriod;
  lowerCase?: boolean;
}

export interface EditorPartDayPeriod extends CommonInputProps {
}

export const TIME_DAY_PERIOD_LONG = 'long'

export const TIME_DAY_PERIOD_NARROW = 'narrow'

export const TIME_DAY_PERIOD_SHORT = 'short'

export const ALLOWED_TIME_DAY_PERIOD = [
  TIME_DAY_PERIOD_LONG,
  TIME_DAY_PERIOD_NARROW,
  TIME_DAY_PERIOD_SHORT,
]

export const TEXT_DISPLAY_TYPE_DAY_PERIOD = 'dayPeriod'

export interface TextDisplayPartDayPeriod extends TextDisplayPartBase {
  locale?: string,
  options?: DayPeriodOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DAY_PERIOD,
}

export interface TextInputPartDayPeriod extends
  TextDisplayPartDayPeriod
{
  editor?: EditorPartDayPeriod
}

export type TimeDayPeriod = typeof ALLOWED_TIME_DAY_PERIOD[number]