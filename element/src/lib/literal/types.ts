import type { Snippet } from 'svelte'

import type {
  ClassListOptional,
  CustomTranslationsOptional,
  DataOptional,
  ElementInstanceOptional,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional,
  SizeOptional,
  StyleOptional,
  SveadminComponent,
  SveadminComponentMask,
  ValueOptional,
} from '$lib/types.js'

import type {
  DateTimeDefinitions,
} from '$lib/date/index.js'

export const COMPONENT_LITERAL = 'literal'

export interface LiteralDisplayProps extends
  CustomTranslationsOptional,
  SizeOptional,
  ValueOptional
{
  dateTimeDefinitions?: DateTimeDefinitions,
  mask?: SveadminComponentMask | string,
  refreshInterval?: number;
  splitter?: (value: any) => any[];
}

export interface TextDisplayProps extends ClassListOptional,
  DataOptional,
  ElementInstanceOptional,
  StyleOptional
{
  children?: Snippet;
  value?: string;
}

export interface TextDisplayWrappedProps extends LiteralDisplayProps,
  IsAttachedOnLeftOptional,
  IsAttachedOnRightOptional
{
  childrenConfig?: {
    0?: LiteralDisplayProps,
    literal?: LiteralDisplayProps,
  };
  isFloating?: boolean;
  isInputBorderDisplayed?: boolean;
  literalClass?: string | string[];
  literalStyle?: string | string[];
}

export interface SveaComponentLiteral extends SveadminComponent
{
  display: {
    config: LiteralDisplayProps;
  };
  type: typeof COMPONENT_LITERAL,
}