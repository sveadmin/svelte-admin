import type {
  Snippet,
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  ValueOptional,
} from '$lib/types.js'

import type {
  TextInputPartLiteral,
} from '$lib/literal/index.js'

import type {
  TextInputPartDate,
  TextInputPartDateTime,
  TextInputPartDateTimeObjects,
  TextInputPartTime,
} from '$lib/date/index.js'


import type {
  TextInputPartNumber,
} from '$lib/number/index.js'

import type {
  TextDisplayPartText, 
  TextDisplayProps,
} from '$lib/text-display/index.js'


export const COMPONENT_TEXT_INPUT = 'text-input'

export const INPUT_TYPE_NUMBER = 'number'

export const INPUT_TYPE_PASSWORD = 'password'

export const INPUT_TYPE_TEXT = 'text'

export const INPUT_TYPES = [
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_TEXT
]

export type InputTypes = typeof INPUT_TYPES[number]

export interface TextInputProps extends
  CommonInputProps,
  TextDisplayProps
{
  placeholder?: string;
  type?: InputTypes;
}

export interface TextInputWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  Omit<TextInputProps, 'value'>,
  ValueOptional
{
  input?: Snippet<[TextInputProps]>;
  useSimplePlaceholder?: boolean;
}

export type TextInputMask = TextInputPart[]

export type TextInputPart = TextInputPartObjects | string

export type TextInputPartObjects = TextInputPartDate |
  TextInputPartDateTime |
  TextInputPartDateTimeObjects |
  TextInputPartLiteral |
  TextInputPartNumber |
  TextInputPartText |
  TextInputPartTime

export interface TextInputPartText extends TextDisplayPartText {
  editor?: {
  }
}
