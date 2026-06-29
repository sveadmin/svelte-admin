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

import type {
  ComponentDate,
  ComponentDateTime,
  ComponentDateTimeObjects,
  ComponentTime,
} from '$lib/date/index.js'

import type {
  ComponentNumberDisplay,
} from '$lib/number-display/types.js'

export const COMPONENT_TEXT_DISPLAY = 'text'

export const COMPONENT_TEXT_DISPLAY_WRAPPED = 'text-wrapped'

export interface ComponentTextDisplay extends SveadminComponent<
  typeof COMPONENT_TEXT_DISPLAY,
  undefined,
  TextDisplayProps
>
{
}

export interface ComponentTextDisplayWrapped extends SveadminComponent<
  typeof COMPONENT_TEXT_DISPLAY_WRAPPED,
  undefined,
  TextWrappedDisplayProps
>
{
}

export interface TextDisplayProps extends AriaOptional,
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

export interface TextWrappedDisplayProps extends IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  TextDisplayProps
{
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
    1?: TextDisplayProps,
    text?: TextDisplayProps,
  };
  componentConfig?: {
    0?: ComponentLiteral,
    literal?: ComponentLiteral,
    1?: ComponentTextDisplay,
    text?: ComponentTextDisplay,
  };
  displayComponent?: Component<any>;
  isFloating?: boolean;
  isOutlineVisible?: boolean;
  literalClass?: string | string[];
  literalStyle?: string | string[];
  textClass?: string | string[];
  textStyle?: string | string[];
}

export interface TextDisplayPartText {
  type: typeof COMPONENT_TEXT_DISPLAY,
}

export type TextDisplayPart = TextDisplayPartObjects | string

export type TextDisplayPartObjects = ComponentDate |
  ComponentDateTime |
  ComponentDateTimeObjects |
  ComponentLiteral |
  ComponentNumberDisplay |
  TextDisplayPartText |
  ComponentTime