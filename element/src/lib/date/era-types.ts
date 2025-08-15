import type { TextDisplayPartBase } from '$lib/literal/types.js'
import type {
  CommonInputProps,
  DATE_INPUT_TYPE_ERA,
} from '$lib/types.js'

export const DATE_ERA_LONG = 'long'

export const DATE_ERA_NARROW = 'narrow'

export const DATE_ERA_SHORT = 'short'

export const ALLOWED_DATE_ERA = [
  DATE_ERA_LONG,
  DATE_ERA_NARROW,
  DATE_ERA_SHORT,
]

export type DateEra = typeof ALLOWED_DATE_ERA[number]

export interface EditorPartEra {
}


export interface EraOptions {
  era?: DateEra;
}

export const TEXT_DISPLAY_TYPE_ERA = 'era'

export interface TextDisplayPartEra extends TextDisplayPartBase {
  locale?: string,
  options?: EraOptions,
  timeZone?: string; //https://www.iana.org/time-zones,
  type: typeof TEXT_DISPLAY_TYPE_ERA,
}

export interface TextInputPartEra extends
  CommonInputProps,
  Omit<TextDisplayPartEra, 'type'>
{
  editor?: EditorPartEra,
  type: typeof DATE_INPUT_TYPE_ERA
}