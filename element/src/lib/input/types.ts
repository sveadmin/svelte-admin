import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  IsValid,
} from '@sveadmin/common'

import type {
  AllowedSize,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  Id,
  StyleOptional,
} from '$lib/types.js'

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/index.js'

export type InputPart = InputProps
  | SveaComponentLiteral

export interface InputProps extends
  TextInputProps
{
  areErrorsVisible?: boolean;
  error?: Snippet<[IsValid]>;
  input?: Snippet<[InputProps]>;
  inputComponent?: Component<InputProps>;
  label?: string | Snippet;
  labelClass?: string | string[];
  labelStyle?: string | string[];
  placeholder?: string;
}

export interface InputLabelProps extends
  ClassListOptional,
  Id,
  StyleOptional
{
  label?: string | Snippet;
}

export interface InputErrorProps
{
  isValid: IsValid,
  size?: AllowedSize,
}

export const INPUT_TYPE_BUTTON = 'button'

export const INPUT_TYPE_CHECKBOX = 'checkbox'

export const INPUT_TYPE_COLOR = 'color'

export const INPUT_TYPE_DATE = 'date'

export const INPUT_TYPE_DATE_TIME_LOCAL = 'datetime-local'

export const INPUT_TYPE_EMAIL = 'email'

export const INPUT_TYPE_FILE = 'file'

export const INPUT_TYPE_HIDDEN = 'hidden'

export const INPUT_TYPE_IMAGE = 'image'

export const INPUT_TYPE_MONTH = 'month'

export const INPUT_TYPE_NUMBER = 'number'

export const INPUT_TYPE_PASSWORD = 'password'

export const INPUT_TYPE_RADIO = 'radio'

export const INPUT_TYPE_RANGE = 'range'

export const INPUT_TYPE_RESET = 'reset'

export const INPUT_TYPE_SEARCH = 'search'

export const INPUT_TYPE_SUBMIT = 'submit'

export const INPUT_TYPE_TEL = 'tel'

export const INPUT_TYPE_TEXT = 'text'

export const INPUT_TYPE_TIME = 'time'

export const INPUT_TYPE_URL = 'url'

export const INPUT_TYPE_WEEK = 'week'

export const ALLOWED_INPUT_TYPES = [
  INPUT_TYPE_BUTTON,
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_COLOR,
  INPUT_TYPE_DATE,
  INPUT_TYPE_DATE_TIME_LOCAL,
  INPUT_TYPE_EMAIL,
  INPUT_TYPE_FILE,
  INPUT_TYPE_HIDDEN,
  INPUT_TYPE_IMAGE,
  INPUT_TYPE_MONTH,
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_RADIO,
  INPUT_TYPE_RANGE,
  INPUT_TYPE_RESET,
  INPUT_TYPE_SEARCH,
  INPUT_TYPE_SUBMIT,
  INPUT_TYPE_TEL,
  INPUT_TYPE_TEXT,
  INPUT_TYPE_TIME,
  INPUT_TYPE_URL,
  INPUT_TYPE_WEEK
] as const

export type InputTypes = typeof ALLOWED_INPUT_TYPES[number]

export interface InputWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  InputProps
{
}
