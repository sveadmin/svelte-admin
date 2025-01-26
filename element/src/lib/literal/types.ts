export const TEXT_DISPLAY_TYPE_LITERAL = 'literal'

export interface TextDisplayPartBase {
  index?: number;
}

export interface TextDisplayPartLiteral {
  type: typeof TEXT_DISPLAY_TYPE_LITERAL,
  value?: string;
}