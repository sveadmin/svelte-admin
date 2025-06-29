import type {
  CommonInputProps,
} from '$lib/types.js'

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
  TextInputProps
} from '$lib/text-input/index.js'

import type {
  TextInputPartNumber
} from '$lib/number/index.js'

export type InputClusterParts = InputProps
  | InputPartImage
  | InputPartLiteral
  | TextInputProps
  | TextInputPartNumber
  | TextInputPartText
  | string

export interface InputClusterProps extends CommonInputProps {
  mask?: InputClusterParts[];
  splitter?: (value: any, dynamicParts?: any) => any[];
  joiner?: (valueParts: any[], dynamicParts?: any) => any;
}