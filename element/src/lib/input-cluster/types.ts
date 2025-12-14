import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  IsValid,
  Rune,
  ValidatorStore,
} from '@sveadmin/common'

import type {
  AllowedSize,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  KeyMap,
  OnBlurOptional,
  OnChangeOptional,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
} from '$lib/types.js'

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

export type InputClusterParts = InputProps
  | InputPartDropdown
  | InputPartImage
  | InputPartLiteral
  | TextInputProps
  | TextInputPartNumber
  | TextInputPartText
  | Component
  | string

export interface InputClusterProps extends CommonInputProps {
  areErrorsVisible?: boolean;
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  error?: Snippet<[IsValid]>;
  mask?: InputClusterParts[];
  size?: AllowedSize;
  splitter?: (value: any, dynamicParts?: any) => any[];
  joiner?: (valueParts: any[], dynamicParts?: any) => any;
}

export interface InputClusterWrappedProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  InputClusterProps
{
}

export interface MaskPartReducerProps extends OnBlurOptional,
  OnChangeOptional,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional
 {
  id: string;
  keyMap?: KeyMap;
  nestedValidators: {[key: number] : ValidatorStore},
  size?: AllowedSize;
}