import type {
  Snippet
} from 'svelte'

import type {
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  OnChangeOptional,
  OnClickOptional,
  OnInputOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
  ValueOptional,
} from '../types.js'

export const COMPONENT_CHECKBOX_SWITCH = 'checkbox-switch'

export interface CheckboxSwitchFalseLabelProps extends
  ClassListOptional,
  StyleOptional
{
  isFalseLabelHidden?: boolean;
}

export interface CheckboxSwitchInputProps extends
  ClassListOptional,
  StyleOptional
{
  isSliderDisabled?: boolean;
}

export interface CheckboxSwitchTrueLabelProps extends
  ClassListOptional,
  StyleOptional
{
  isTrueLabelHidden?: boolean;
}

export interface CheckboxSwitchProps extends
  ClassListOptional,
  DataOptional,
  IdOptional,
  IsDisabledOptional,
  OnChangeOptional,
  OnClickOptional,
  OnInputOptional,
  SizeOptional,
  StyleOptional,
  TabIndexOptional,
  ValueOptional
{
  areBothValuesVisible?: boolean;
  childrenConfig?: {
    0?: CheckboxSwitchInputProps,
    1?: CheckboxSwitchTrueLabelProps,
    2?: CheckboxSwitchFalseLabelProps,
  },
  falseLabel?: string;
  instance?: HTMLInputElement;
  inputClass?: string | string[];
  inputStyle?: string | string[];
  isFalseLabelHidden?: boolean;
  isTrueLabelHidden?: boolean;
  labelClass?: string | string[];
  labelStyle?: string | string[];
  renderFalseLabel?: Snippet<[
    label: string,
    classes?: string[],
    styles?: string[]
  ]>;
  renderLabel?: Snippet<[value: boolean]>;
  renderTrueLabel?: Snippet<[
    label: string,
    classes?: string[],
    styles?: string[]
  ]>;
  trueLabel?: string;
}