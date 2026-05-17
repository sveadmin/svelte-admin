import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  IsValid,
} from '@sveadmin/common'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  IdOptional,
  LabelOptional,
  SizeOptional,
  StyleOptional,
  SveadminComponent,
  SveadminElementConfig,
} from '$lib/types.js'

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

import type {
  ComponentLiteral,
} from '$lib/literal/index.js'

export const COMPONENT_INPUT = 'input'

export const COMPONENT_INPUT_WRAPPED = 'input-wrapped'

export interface ComponentInput extends SveadminComponent<
  typeof COMPONENT_INPUT,
  undefined,
  undefined,
  InputProps
>
{
}

export interface ComponentInputWrapped extends SveadminComponent<
  typeof COMPONENT_INPUT_WRAPPED,
  undefined,
  undefined,
  InputWrappedProps
>
{
}

export type InputPart = InputProps
  | ComponentLiteral

export interface InputProps extends
  Omit<TextInputProps, 'childrenConfig'>,
  LabelOptional
{
  areErrorsVisible?: boolean;
  childrenConfig?: {
    0?: SveadminElementConfig;
    1?: InputLabelProps;
    2?: InputErrorProps,
    error?: InputErrorProps;
    input?: SveadminElementConfig;
    label?: InputLabelProps;
  },
  componentConfig?: {
    0?: SveadminComponent<any, Component<InputProps>, any, InputProps>;
    1?: SveadminComponent<any, Component<InputLabelProps>, InputLabelProps>;
    2?: SveadminComponent<any, Component<InputErrorProps>, InputErrorProps>,
    error?: SveadminComponent<any, Component<InputErrorProps>, InputErrorProps>;
    input?: SveadminComponent<any, Component<InputProps>, any, InputProps>;
    label?: SveadminComponent<any, Component<InputLabelProps>, InputLabelProps>;
  },
  error?: Snippet<[IsValid]>;
  errorClass?: string | string[];
  errorStyle?: string | string[];
  input?: Snippet<[InputProps]>;
  placeholder?: string;
}

export interface InputLabelProps extends
  ClassListOptional,
  IdOptional,
  StyleOptional
{
  isOptionalHintDisplayed?: false,
  isRequired?: boolean;
  isRequiredHintDisplayed?: true,
  label?: string | Snippet;
}

export interface InputErrorProps extends
  SizeOptional
{
  isValid?: IsValid,
}

export interface InputWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  InputProps
{
  childrenConfig?: {
    0: InputProps,
    input: InputProps,
  }
}
