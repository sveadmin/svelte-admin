import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type {
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
} from '$lib/types.js';

export interface EditorPartHour {
}

export interface HourOptions {
  hour?: TimeHour;
  hour12?: boolean;
  hourCycle?: TimeHourCycle;
}

export const TEXT_DISPLAY_TYPE_HOUR = 'hour'

export interface TextDisplayPartHour extends TextDisplayPartBase {
  locale?: string,
  options?: HourOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_HOUR,
}

export interface TextInputPartHour extends
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  TextDisplayPartHour
{
  editor?: EditorPartHour,
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