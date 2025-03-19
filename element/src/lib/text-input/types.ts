import type {
  Snippet,
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  TextInputTypes,
  ValueOptional,
} from '$lib/types.js'

import type {
  InputPartLiteral,
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
  TEXT_DISPLAY_TYPE_TEXT,
  TextDisplayPartText, 
  TextDisplayProps,
} from '$lib/text-display/index.js'


export const COMPONENT_TEXT_INPUT = 'text-input'

export interface EditorPartText extends CommonInputProps{
}

export interface TextInputProps extends
  CommonInputProps,
  TextDisplayProps
{
  placeholder?: string;
  type: typeof TEXT_DISPLAY_TYPE_TEXT,
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

export type InputMask = InputPart[]

export type InputPart = InputPartObjects | string

export type InputPartObjects = TextInputPartObjects |
  InputPartLiteral

export type TextInputPartObjects = TextInputPartDate |
  TextInputPartDateTime |
  TextInputPartDateTimeObjects |
  TextInputPartNumber |
  TextInputPartText |
  TextInputPartTime

export interface TextInputPartText extends TextInputProps {
  editor?: EditorPartText;
}
