import type {
  CommonInputProps,
  ElementInstance,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  SveadminComponent,
  VisibleSize,
} from '$lib/types.js'

import type {
  ComponentLiteral,
  LiteralDisplayProps,
} from '$lib/literal/index.js'

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

export interface ComponentTextareaInputWrapped extends SveadminComponent<
  typeof COMPONENT_TEXTAREA_INPUT_WRAPPED,
  undefined,
  TextareaWrappedInputProps
>
{
}

export const RESIZE_BOTH = 'both'

export const RESIZE_HORIZONTAL = 'horizontal'

export const RESIZE_VERTICAL = 'vertical'

export const ALLOWED_RESIZES = [
  RESIZE_BOTH,
  RESIZE_HORIZONTAL,
  RESIZE_VERTICAL,
]

export type Resize = typeof ALLOWED_RESIZES[number]

export interface TextareaInputProps extends CommonInputProps,
  TextareaDisplayProps
{
  allowedAttributes?: string[];
  allowedEntities?: string[];
  allowedTags?: string[];
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
  };
  componentConfig?: {
    0?: ComponentLiteral,
    literal?: ComponentLiteral,
  };
  contentInstance?: ElementInstance,
  isHTMLExported?: boolean;
  maxHeight?: VisibleSize;
  resize?: Resize;
  spellcheck?: boolean;
}

/**
 * Input events which are not fired on contenteditable elements
 * - onchange
 * - oninit
 */
export interface TextareaWrappedInputProps extends IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  TextareaInputProps
{
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
    1?: TextareaInputProps,
    textarea?: TextareaInputProps,
  };
  componentConfig?: {
    0?: ComponentLiteral,
    literal?: ComponentLiteral,
    1?: ComponentTextareaInput,
    textarea?: ComponentTextareaInput,
  };
  isFloating?: boolean;
  isOutlineVisible?: boolean;
  placeholder?: string;
  textareaClass?: string | string[];
  textareaStyle?: string | string[];
}

