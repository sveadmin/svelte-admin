import type {
  CustomTranslationsOptional,
  splitterFunction,
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
  ValueOptional
{
  dateTimeDefinitions?: DateTimeDefinitions,
  mask?: SveadminComponentMask | string,
  refreshInterval?: number;
  splitter?: splitterFunction;
}

export interface ComponentLiteral extends SveadminComponent <
  typeof COMPONENT_LITERAL,
  LiteralDisplayProps
>
{
}