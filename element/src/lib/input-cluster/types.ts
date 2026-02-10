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
  InputClusterPartButton
} from '$lib/button/index.js'

import type {
  InputClusterPartCheckbox
} from '$lib/checkbox/index.js'

import type {
  InputClusterPartCheckboxSwitch
} from '$lib/checkbox-switch/index.js'

import type {
  TextDisplayPartCurrency
} from '$lib/currency-display/index.js'

import type {
  InputClusterPartCurrency
} from '$lib/currency-input/index.js'

import type {
  InputPartDropdown
} from '$lib/dropdown-search/index.js'

import type {
  InputPartImage
} from '$lib/image/index.js'

import type {
  InputProps,
} from '$lib/input/index.js'

import type {
  InputPartLiteral,
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

export type InputClusterParts = Component
  | InputClusterPartButton
  | InputClusterPartCheckbox
  | InputClusterPartCheckboxSwitch
  | InputClusterPartCurrency
  | InputProps
  | InputPartDropdown
  | InputPartImage
  | InputPartLiteral
  | TextInputProps
  | TextDisplayPartCurrency
  | TextInputPartNumber
  | TextInputPartText
  | string

export interface InputClusterProps extends CommonInputProps {
  areErrorsVisible?: boolean;
  childrenConfig?: {[key: string] : InputClusterParts}; //This property is untyped, it matches via the index number
                                          // or through named properties used in the mask
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  error?: Snippet<[IsValid]>;
  mask?: InputClusterParts[]; //This property is typed, and contains the childrenProperties
  splitter?: (
    valueToSplit: any,
    dynamicParts?: any,
    i18n?: TranslationStore,
  ) => any[];
  joiner?: (valueParts: any[], dynamicParts?: any) => any;
}

export interface InputClusterWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  InputClusterProps
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