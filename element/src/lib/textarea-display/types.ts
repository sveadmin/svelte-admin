import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  AriaOptional,
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  OnClickOptional,
  SizeOptional,
  StyleOptional,
  SveadminComponent,
} from '$lib/types.js'

import type {
  LiteralDisplayProps,
  ComponentLiteral,
} from '$lib/literal/types.js'

export const COMPONENT_TEXTAREA_DISPLAY = 'textarea'

export const COMPONENT_TEXTAREA_DISPLAY_WRAPPED = 'textarea-wrapped'

export interface ComponentTextareaDisplay extends SveadminComponent<
  typeof COMPONENT_TEXTAREA_DISPLAY,
  undefined,
  TextareaDisplayProps
>
{
}

export interface ComponentTextareaDisplayWrapped extends SveadminComponent<
  typeof COMPONENT_TEXTAREA_DISPLAY_WRAPPED,
  undefined,
  TextareaWrappedDisplayProps
>
{
}

export interface TextareaDisplayProps extends AriaOptional,
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  LiteralDisplayProps,
  OnClickOptional,
  SizeOptional,
  StyleOptional
{
  children?: Snippet;
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
  };
  componentConfig?: {
    0?: ComponentLiteral,
    literal?: ComponentLiteral,
  };
  isCopyingEnabledOnClick?: boolean;
  literalClass?: string | string[];
  literalStyle?: string | string[];
}

export interface TextareaWrappedDisplayProps extends IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  TextareaDisplayProps
{
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
    1?: TextareaDisplayProps,
    text?: TextareaDisplayProps,
  };
  componentConfig?: {
    0?: ComponentLiteral,
    literal?: ComponentLiteral,
    1?: ComponentTextareaDisplay,
    text?: ComponentTextareaDisplay,
  };
  displayComponent?: Component<any>;
  isFloating?: boolean;
  isOutlineVisible?: boolean;
  literalClass?: string | string[];
  literalStyle?: string | string[];
  textClass?: string | string[];
  textStyle?: string | string[];
}