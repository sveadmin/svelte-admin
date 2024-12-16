import  {
  TEXT_DISPLAY_TYPE_LITERAL,
} from '../types.js'

import type {
  TextDisplayPartObjects,
} from '../types.js'

export function parseMaskString (maskPart: string) : TextDisplayPartObjects {
  return {
    type: TEXT_DISPLAY_TYPE_LITERAL,
    value: maskPart
  }
}