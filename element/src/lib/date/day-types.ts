import type {
  CommonInputProps,
  DATE_INPUT_TYPE_DAY,
} from '$lib/types.js'

export const DATE_DAY_2DIGIT = '2-digit'

export const DATE_DAY_NUMERIC = 'numeric'

export const ALLOWED_DATE_DAY = [
  DATE_DAY_2DIGIT,
  DATE_DAY_NUMERIC,
]

export type DateDay = typeof ALLOWED_DATE_DAY[number]

export interface DayOptions {
  day?: DateDay;
}

export interface EditorPartDay {
}


export const TEXT_DISPLAY_TYPE_DAY = 'day'

export interface TextDisplayPartDay {
  locale?: string,
  options?: DayOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_DAY,
}

export interface TextInputPartDay extends
  CommonInputProps,
  Omit<TextDisplayPartDay, 'type'>
{
  editor?: EditorPartDay,
  type: typeof DATE_INPUT_TYPE_DAY
}