import type {
  SizeOptional,
  SveadminComponent,
} from '$lib/types.js'

export const COMPONENT_LITERAL = 'literal'

export interface LiteralDisplayProps extends SizeOptional {
  borderless?: boolean;
  value?: string;
}

export interface SveaComponentLiteral extends SveadminComponent
{
  display: LiteralDisplayProps;
  type: typeof COMPONENT_LITERAL,
  // value?: string;
}