import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  IsValid,
  TranslationStore,
  ValidatorStore,
} from '@sveadmin/common'

import type {
  AllowedSize,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  DataOptional,
  KeyMap,
  OnBlurOptional,
  OnChangeOptional,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
} from '$lib/types.js'

import type {
  ComponentButton
} from '$lib/button/index.js'

import type {
  SveaComponentCheckbox
} from '$lib/checkbox/index.js'

import type {
  InputClusterPartCheckboxSwitch
} from '$lib/checkbox-switch/index.js'

import type {
  ComponentStore,
} from '$lib/component/index.js'

import type {
  TextDisplayPartCurrency
} from '$lib/currency-display/index.js'

import type {
  InputClusterPartCurrency
} from '$lib/currency-input/index.js'

import type {
  SveaComponentDropdown
} from '$lib/dropdown-search/index.js'

import type {
  ComponentImageWrapped
} from '$lib/image/index.js'

import type {
  InputProps,
} from '$lib/input/index.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/index.js'

import type {
  TextInputPartText
} from '$lib/text-display/index.js'

import type {
  TextInputProps,
  TextInputPartObjects,
} from '$lib/text-input/index.js'

import type {
  TextInputPartNumber
} from '$lib/number/index.js'

export type ClusterParts = Component
  | ComponentButton
  | SveaComponentCheckbox
  | InputClusterPartCheckboxSwitch
  | InputClusterPartCurrency
  | InputProps
  | SveaComponentDropdown
  | ComponentImageWrapped
  | SveaComponentLiteral
  | TextInputProps
  | TextDisplayPartCurrency
  | TextInputPartNumber
  | TextInputPartText
  | string

export interface ClusterDisplayProps extends CommonInputProps {
  areErrorsVisible?: boolean;
  childrenConfig?: {[key: string] : ClusterParts}; //This property is untyped, it matches via the index number
                                          // or through named properties used in the mask
  components?:ComponentStore;
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  error?: Snippet<[IsValid]>;
  mask?: ClusterParts[]; //This property is typed, and contains the childrenProperties
  splitter?: (
    valueToSplit: any,
    dynamicParts?: any,
    i18n?: TranslationStore,
  ) => any[];
  joiner?: (valueParts: any[], dynamicParts?: any) => any;
}

export interface ClusterWrappedDisplayProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClusterDisplayProps
{
}

export interface MaskPartReducerProps extends DataOptional,
  OnBlurOptional,
  OnChangeOptional,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional
 {
  id: string;
  keyMap?: KeyMap;
  nestedValidators: {[key: number] : ValidatorStore},
  size?: AllowedSize;
}