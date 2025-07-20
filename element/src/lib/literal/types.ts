import type {
  SizeOptional,
} from '$lib/types.js'

export const TEXT_DISPLAY_TYPE_LITERAL = 'literal'

export interface TextDisplayPartBase {
  index?: number;
}

export interface TextDisplayPartLiteral extends SizeOptional {
  type: typeof TEXT_DISPLAY_TYPE_LITERAL,
  value?: string;
}

export interface EditorPartLiteral {
  borderless?: boolean;
}

export interface InputPartLiteral extends TextDisplayPartLiteral {
  editor?: EditorPartLiteral;
}