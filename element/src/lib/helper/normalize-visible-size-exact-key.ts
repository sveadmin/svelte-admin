import  {
  SIZE_DIRECTION_HORIZONTAL,
  VISIBLE_SIZE_UNIT_CHARACTERS,
  VISIBLE_SIZE_UNIT_SPAN,
} from '../types.js'

import type {
  AllowedSizeDirection,
  VisibleSize,
  VisibleSizeUnits
} from '../types.js'

import {
  parseVisibleSize,
} from './parse-visible-size.js'

export function normalizeVisibleSizeExactKey(
  visibleSize: VisibleSize | undefined,
  key: string,
) : {[key: string] : string} | undefined {
  visibleSize = parseVisibleSize(visibleSize)

  if (!visibleSize) {
    return
  }

  switch (visibleSize.unit) {
    case VISIBLE_SIZE_UNIT_SPAN:
      return {
        [key] : 'span ' + visibleSize.size
      }
      
    case VISIBLE_SIZE_UNIT_CHARACTERS:
      return {
        [key]: 'calc(' + visibleSize.size + ' * var(--width-factor))'
      }
    default:
      return {
        [key]: visibleSize.size + (visibleSize.unit ?? '')
      }
  }
}