import type {
  Snippet,
} from 'svelte'

import type {
  IsValid,
} from '@sveadmin/common'

import type {
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
  InputPartLiteral,
} from '$lib/literal/index.js'

export type InputPart = InputProps
  | InputPartLiteral

export interface InputProps extends
  TextInputProps
{
  areErrorsVisible?: boolean;
  error?: Snippet<[IsValid]>;
  input?: Snippet<[InputProps]>;
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
  isValid: IsValid
}


export interface InputWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  InputProps
{
}
