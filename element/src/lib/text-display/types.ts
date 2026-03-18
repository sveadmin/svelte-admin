import type {
  Snippet,
} from 'svelte'

import type {
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  OnClickOptional,
  SizeOptional,
  StyleOptional,
} from '$lib/types.js'

import type {
  LiteralDisplayProps,
  SveaComponentLiteral,
} from '$lib/literal/types.js'

import type {
  ComponentDate,
  ComponentDateTime,
  ComponentDateTimeObjects,
  ComponentTime,
} from '$lib/date/index.js'

import type {
  TextDisplayPartNumber,
} from '$lib/number/types.js'

export const COMPONENT_TEXT_DISPLAY = 'text-display'

export const COMPONENT_TEXT_DISPLAY_WRAPPED = 'text-display-wrapped'

export interface TextDisplayProps extends ClassListOptional,
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
  isCopyingEnabledOnClick?: boolean;
  literalClass?: string | string[];
  literalStyle?: string | string[];
}

export interface TextDisplayWrappedProps extends IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  TextDisplayProps
{
  childrenConfig?: {
    0?: TextDisplayProps,
    text?: TextDisplayProps,
    1?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
  };
  isFloating?: boolean;
  isInputBorderDisplayed?: boolean;
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
  SveaComponentLiteral |
  TextDisplayPartNumber |
  TextDisplayPartText |
  ComponentTime