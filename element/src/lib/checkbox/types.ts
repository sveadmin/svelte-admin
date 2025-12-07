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

import type {
  CheckboxSwitchFalseHintProps,
  CheckboxSwitchLabelProps,
  CheckboxSwitchTrueHintProps
} from '$lib/checkbox-switch/index.js'

export const COMPONENT_CHECKBOX = 'checkbox'

export interface CheckboxHintProps extends
  CheckboxSwitchFalseHintProps,
  CheckboxSwitchTrueHintProps
{
  isHintHidden?: boolean;
}

export interface CheckboxLabelProps extends
  CheckboxSwitchLabelProps
{
}

export interface CheckboxProps extends
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
  },
  hint?: string;
  hintClass?: string | string[];
  hintStyle?: string | string[];
  instance?: HTMLInputElement;
  isHintHidden?: boolean;
  isStateColorHidden?: boolean;
  labelClass?: string | string[];
  labelStyle?: string | string[];
  renderLabel?: Snippet<[value: boolean]>;
}