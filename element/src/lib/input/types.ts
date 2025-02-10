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

export type InputComponents = TextInputProps

export interface InputProps extends
  InputComponents
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
