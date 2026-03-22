import type {
  Snippet,
} from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  SveadminComponent,
  TextInputTypes,
  ValueOptional,
} from '$lib/types.js'

import type {
  ButtonInputProps,
} from '$lib/button/index.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/index.js'

import type {
  TextInputPartDate,
  TextInputPartDateTime,
  TextInputPartDateTimeObjects,
  TextInputPartTime,
} from '$lib/date/index.js'


import type {
  InputTypes, 
} from '$lib/input/index.js'

import type {
  TextInputPartNumber,
} from '$lib/number/index.js'

import type {
  TextDisplayProps,
} from '$lib/text-display/index.js'

export const COMPONENT_TEXT_INPUT = 'text-input'

export const COMPONENT_TEXT_INPUT_WRAPPED = 'text-input-wrapped'

export interface ComponentTextInput extends SveadminComponent<
  typeof COMPONENT_TEXT_INPUT,
  undefined,
  TextInputProps
>
{
}

export interface ComponentTextInputWrapped extends SveadminComponent<
  typeof COMPONENT_TEXT_INPUT_WRAPPED,
  undefined,
  TextInputWrappedProps
>
{
}

export interface EditorPartText {
}

export interface TextInputProps extends
  CommonInputProps,
  TextDisplayProps
{
  joiner?: (value: any[]) => any;
  placeholder?: string;
  step?: number;
  type?: InputTypes,
}

export interface TextInputWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  Omit<TextInputProps, 'value'>,
  ValueOptional
{
  helper?:Snippet | string;
  input?: Snippet<[TextInputProps]>;
  useSimplePlaceholder?: boolean;
}

export type InputMask = InputPart[]

export type InputPart = InputPartObjects | string

export type InputPartObjects = ButtonInputProps | 
  TextInputPartObjects |
  SveaComponentLiteral

export type TextInputPartObjects = TextInputPartDate |
  TextInputPartDateTime |
  TextInputPartDateTimeObjects |
  TextInputPartNumber |
  TextInputPartText |
  TextInputPartTime

export interface TextInputPartText extends TextInputProps {
  editor?: EditorPartText;
}