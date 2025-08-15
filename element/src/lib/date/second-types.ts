import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type {
  CommonInputProps,
  TIME_INPUT_TYPE_SECOND,
} from '$lib/types.js';

export interface EditorPartSecond {
}

export interface SecondOptions {
  second?: TimeSecond;
}

export const TEXT_DISPLAY_TYPE_SECOND = 'second'

export interface TextDisplayPartSecond extends TextDisplayPartBase {
  locale?: string,
  options?: SecondOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_SECOND,
}

export interface TextInputPartSecond extends
  CommonInputProps,
  Omit<TextDisplayPartSecond, 'type'>
{
  editor?: EditorPartSecond,
  type: typeof TIME_INPUT_TYPE_SECOND,
}

export const TIME_SECOND_2DIGIT = '2-digit'

export const TIME_SECOND_NUMERIC = 'numeric'

export const ALLOWED_TIME_SECOND = [
  TIME_SECOND_2DIGIT,
  TIME_SECOND_NUMERIC,
]

export type TimeSecond = typeof ALLOWED_TIME_SECOND[number]
