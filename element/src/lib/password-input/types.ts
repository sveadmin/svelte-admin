import type {
  Component,
} from 'svelte'

import type {
  IsValid,
  ValidatorFunction,
} from '@sveadmin/common'

import type {
  ClassListOptional,
  StyleOptional,
  SveadminComponent,
} from '$lib/types.js'

import type {
  ButtonInputProps,
  ComponentButton,
} from '$lib/button/index.js'

import type {
  ComponentImageWrapped,
  ImageWrappedDisplayProps,
} from '$lib/image/index.js'

import type {
  ComponentTextDisplay,
  TextDisplayProps,
} from '$lib/text-display/index.js'

import type {
  ComponentTextInput,
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_PASSWORD_INPUT = 'password-input'

export const COMPONENT_PASSWORD_INPUT_WRAPPED = 'password-input-wrapped'

export interface ComponentPasswordInput extends SveadminComponent<
  typeof COMPONENT_PASSWORD_INPUT,
  undefined,
  undefined,
  PasswordInputProps
>
{
}

export interface ComponentPasswordInputWrapped extends SveadminComponent<
  typeof COMPONENT_PASSWORD_INPUT_WRAPPED,
  undefined,
  undefined,
  PasswordWrappedInputProps
>
{
}

export interface PasswordInputProps extends Omit<TextInputProps, 'componentConfig'>
{
  areErrorsVisible?: boolean;
  childrenConfig?: {
    0?: TextInputProps;
    1?: ButtonInputProps;
    2?: TextDisplayProps;
    3?: ImageWrappedDisplayProps;
    4?: PasswordHelperDisplayProps;
    button?: ButtonInputProps;
    helper?: PasswordHelperDisplayProps;
    input?: TextInputProps;
    helperText?: TextDisplayProps;
    helperIcon?: ImageWrappedDisplayProps;
  },
  componentConfig?: {
    0?: ComponentTextInput;
    1?: ComponentButton;
    2?: ComponentTextDisplay;
    3?: ComponentImageWrapped;
    button?: ComponentButton;
    input?: ComponentTextInput;
    helperText?: ComponentTextDisplay;
    helperIcon?: ComponentImageWrapped;
  };
  cluster?: Component;
  helper?: PasswordHelper[];
  isLowercaseRequired?: boolean;
  isPasswordHelperVisible?: boolean;
  isNumberRequired?: boolean;
  isRevealed?: boolean;
  isSpecialCharacterRequired?: boolean;
  isUppercaseRequired?: boolean;
  maximumLength?: number;
  minimumLength?: number;
}

export interface PasswordWrappedInputProps extends PasswordInputProps
{
}

export interface PasswordHelper {
  id: string;
  result?: IsValid;
  tooltip: string;
  validator: ValidatorFunction;
}

export interface PasswordHelperDisplayProps extends ClassListOptional,
  StyleOptional
{
}