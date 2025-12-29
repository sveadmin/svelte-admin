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

export interface CheckboxSwitchFalseHintProps extends
  ClassListOptional,
  StyleOptional
{
  isFalseHintHidden?: boolean;
  stateColor?: string;
}

export interface CheckboxSwitchLabelProps extends
  ClassListOptional,
  StyleOptional
{
}

export interface CheckboxSwitchTrueHintProps extends
  ClassListOptional,
  StyleOptional
{
  isTrueHintHidden?: boolean;
  stateColor?: string;
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
  areBothHintsDisplayed?: boolean;
  childrenConfig?: {
    0?: CheckboxSwitchLabelProps,
    1?: CheckboxSwitchTrueHintProps,
    2?: CheckboxSwitchFalseHintProps,
  },
  falseHint?: string;
  hintClass?: string | string[];
  hintStyle?: string | string[];
  instance?: {
    ref?: HTMLInputElement
  };
  isFalseHintHidden?: boolean;
  isTrueHintHidden?: boolean;
  labelClass?: string | string[];
  labelStyle?: string | string[];
  renderFalseHint?: Snippet<[
    text: string,
    classes?: string[],
    styles?: string[]
  ]>;
  renderLabel?: Snippet<[value: boolean]>;
  renderTrueHint?: Snippet<[
    text: string,
    classes?: string[],
    styles?: string[]
  ]>;
  trueHint?: string;
}