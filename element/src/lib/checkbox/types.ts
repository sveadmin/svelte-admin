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
  SveadminComponent,
  TabIndexOptional,
  ValueOptional,
} from '../types.js'

import type {
  CheckboxSwitchFalseHintProps,
  CheckboxSwitchLabelProps,
  CheckboxSwitchTrueHintProps
} from '$lib/checkbox-switch/index.js'

export const COMPONENT_CHECKBOX = 'checkbox'

export interface CheckboxHintProps extends
  ClassListOptional,
  StyleOptional
{
  isHintHidden?: boolean;
}

export interface CheckboxLabelProps extends
  CheckboxSwitchLabelProps
{
}

export interface CheckboxInputProps extends
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
  childrenConfig?: {
    0?: CheckboxLabelProps,
    1?: CheckboxHintProps,
    2?: CheckboxSwitchTrueHintProps,
    3?: CheckboxSwitchFalseHintProps,
    falseHint?: CheckboxSwitchFalseHintProps,
    hint?: CheckboxHintProps,
    label?: CheckboxLabelProps,
    trueHint?: CheckboxSwitchTrueHintProps,
  },
  hint?: string;
  hintClass?: string | string[];
  hintStyle?: string | string[];
  instance?: {
    ref?: HTMLInputElement
  };
  isAttachedOnLeft?: boolean;
  isAttachedOnRight?: boolean;
  isHintHidden?: boolean;
  isStateColorHidden?: boolean;
  labelClass?: string | string[];
  labelStyle?: string | string[];
  renderLabel?: Snippet<[value: boolean]>;
}

export interface SveaComponentCheckbox extends SveadminComponent<
  typeof COMPONENT_CHECKBOX,
  void,
  CheckboxInputProps
>
{
}