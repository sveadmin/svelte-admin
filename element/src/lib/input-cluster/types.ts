import type {
  InputProps
} from '$lib/input/types.js'

import type {
  TextInputPartLiteral,
} from '$lib/literal/types.js'

import type {
  TextInputProps
} from '$lib/text-input/types.js'

export type InputClusterParts = InputProps
  | TextInputPartLiteral
  | TextInputProps
  | string

export interface InputClusterProps {
  mask?: InputClusterParts[];
}