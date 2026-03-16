import type { Snippet } from 'svelte'

import type {
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional
  } from '$lib/component-common-properties.js';

import type {
  ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  SizeOptional,
  StyleOptional,
  SveadminComponent,
} from '$lib/types.js'

export const COMPONENT_LITERAL = 'literal'

export const COMPONENT_LITERAL_WRAPPED = 'literal-wrapped'

export interface LiteralDisplayProps extends ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  SizeOptional,
  StyleOptional
{
  children?: Snippet;
  value?: string;
}

export interface LiteralDisplayWrappedProps extends LiteralDisplayProps,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional
{
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
  };
  isFloating?: boolean;
  literalClass?: string | string[];
  literalStyle?: string | string[];
}

export interface SveaComponentLiteral extends SveadminComponent
{
  display: LiteralDisplayProps;
  type: typeof COMPONENT_LITERAL,
}

export interface SveaComponentLiteralWrapped extends SveadminComponent
{
  display: LiteralDisplayWrappedProps;
  type: typeof COMPONENT_LITERAL_WRAPPED,
  // value?: string;
}