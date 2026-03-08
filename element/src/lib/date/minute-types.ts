import type {
  CommonInputProps,
  TIME_INPUT_TYPE_MINUTE,
} from '$lib/types.js';

export interface EditorPartMinute {
}

export interface MinuteOptions {
  minute?: TimeMinute;
}

export const TEXT_DISPLAY_TYPE_MINUTE = 'minute'

export const TIME_MINUTE_2DIGIT = '2-digit'

export const TIME_MINUTE_NUMERIC = 'numeric'

export const ALLOWED_TIME_MINUTE = [
  TIME_MINUTE_2DIGIT,
  TIME_MINUTE_NUMERIC,
]

export type TimeMinute = typeof ALLOWED_TIME_MINUTE[number]

export interface TextDisplayPartMinute {
  locale?: string,
  options?: MinuteOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_MINUTE,
}

export interface TextInputPartMinute extends
  CommonInputProps,
  Omit<TextDisplayPartMinute, 'type'>
{
  editor?: EditorPartMinute,
  type: typeof TIME_INPUT_TYPE_MINUTE
}
