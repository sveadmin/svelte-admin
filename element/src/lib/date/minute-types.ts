import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type { CommonInputProps, TIME_INPUT_TYPE_MINUTE } from '$lib/types.js';

export interface EditorPartMinute extends CommonInputProps {
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

export interface TextDisplayPartMinute extends TextDisplayPartBase {
  locale?: string,
  options?: MinuteOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_MINUTE,
}

export interface TextInputPartMinute extends
  TextDisplayPartMinute {
  editor?: EditorPartMinute
}
