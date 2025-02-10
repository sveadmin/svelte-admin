import type { TextDisplayPartBase } from '$lib/literal/types.js'

export interface FractionalSecondOptions {
  fractionalSecondDigits?: number; //1 - 3
}

export const TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND = 'fractionalSecond'

export interface TextDisplayPartFractionalSecond extends TextDisplayPartBase {
  locale?: string,
  options?: FractionalSecondOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
}

export interface TextInputPartFractionalSecond extends TextDisplayPartFractionalSecond {
  editor?: {
  }
}
