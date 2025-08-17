import type {
  Snippet,
} from 'svelte'

import type {
  IsValid,
  Rune,
  ValidatorStore,
} from '@sveadmin/common'

import type {
  AllowedSize,
  CommonInputProps,
  KeyMap,
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

export interface MaskPartReducerProps {
  id: string;
  keyMap?: KeyMap;
  nestedValidators: {[key: number] : ValidatorStore},
  onBlur?: (event?: Event) => void;
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
  onFocus?: (event?: Event) => void;
  onInit?: (el: HTMLElement) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  size?: AllowedSize;
}