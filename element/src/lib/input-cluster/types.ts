import type {
  CommonInputProps,
} from '$lib/types.js'

import type {
  InputProps,
} from '$lib/input/types.js'

import type {
  InputPartLiteral,
} from '$lib/literal/types.js'

import type {
  TextInputProps
} from '$lib/text-input/types.js'

import type {
  TextInputPartNumber
} from '$lib/number/types.js'

export type InputClusterParts = InputProps
  | InputPartLiteral
  | TextInputProps
  | TextInputPartNumber
  | string

export interface InputClusterProps extends CommonInputProps {
  mask?: InputClusterParts[];
  splitter?: (value: any, dynamicParts?: any) => any[];
  joiner?: (valueParts: any[], dynamicParts?: any) => any;
  validationJoiner?: (valueParts: any[], dynamicParts?: any) => any;
}