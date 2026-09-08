import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  AriaOptional,
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  IdOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  OnClickOptional,
  SizeOptional,
  StyleOptional,
  SveadminComponent,
  ValueOptional,
  VisibleSize,
} from '$lib/types.js'

import type {
  TextareaDisplayProps,
} from '$lib/textarea-display/types.js'

export const COMPONENT_TEXTAREA_INPUT = 'textarea-input'

export const COMPONENT_TEXTAREA_INPUT_WRAPPED = 'textarea-input-wrapped'

export interface ComponentTextareaInput extends SveadminComponent<
  typeof COMPONENT_TEXTAREA_INPUT,
  undefined,
  TextareaInputProps
>
{
}

// export interface ComponentTextareaDisplayWrapped extends SveadminComponent<
//   typeof COMPONENT_TEXTAREA_DISPLAY_WRAPPED,
//   undefined,
//   TextareaWrappedDisplayProps
// >
// {
// }

export const RESIZE_BOTH = 'both'

export const RESIZE_HORIZONTAL = 'horizontal'

export const RESIZE_VERTICAL = 'vertical'

export const ALLOWED_RESIZES = [
  RESIZE_BOTH,
  RESIZE_HORIZONTAL,
  RESIZE_VERTICAL,
]

export type Resize = typeof ALLOWED_RESIZES[number]

export interface TextareaInputProps extends IdOptional,
  TextareaDisplayProps
{
  isHeightAutoAdjusted?: boolean;
  maxHeight?: VisibleSize;
  placeholder?: string;
  resize?: Resize;
  spellcheck?: boolean;
}

// export interface TextareaWrappedDisplayProps extends IsAttachedOnLeftOptional,
//   IsAttachedOnRightOptional,
//   TextareaDisplayProps
// {
//   childrenConfig?: {
//     0?: LiteralDisplayProps,
//     literal?: LiteralDisplayProps,
//     1?: TextareaDisplayProps,
//     text?: TextareaDisplayProps,
//   };
//   componentConfig?: {
//     0?: ComponentLiteral,
//     literal?: ComponentLiteral,
//     1?: ComponentTextareaDisplay,
//     text?: ComponentTextareaDisplay,
//   };
//   displayComponent?: Component<any>;
//   isFloating?: boolean;
//   isOutlineVisible?: boolean;
//   literalClass?: string | string[];
//   literalStyle?: string | string[];
//   textClass?: string | string[];
//   textStyle?: string | string[];
// }

