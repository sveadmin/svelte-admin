import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type { CommonInputProps, DATE_INPUT_TYPE_YEAR } from '$lib/types.js'

export const DATE_YEAR_2DIGIT = '2-digit'

export const DATE_YEAR_NUMERIC = 'numeric'

export const ALLOWED_DATE_YEAR = [
  DATE_YEAR_2DIGIT,
  DATE_YEAR_NUMERIC,
]

export type DateYear = typeof ALLOWED_DATE_YEAR[number]

export interface EditorPartYear extends CommonInputProps {
}

export const TEXT_DISPLAY_TYPE_YEAR = 'year'

export interface YearOptions {
  year?: DateYear;
}

export interface TextDisplayPartYear extends TextDisplayPartBase {
  locale?: string,
  options?: YearOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_YEAR,
}

export interface TextInputPartYear extends
  TextDisplayPartYear
{
  editor?: EditorPartYear,
}