import  {
  SIZE_DIRECTION_HORIZONTAL,
  VISIBLE_SIZE_UNIT_CHARACTERS,
  VISIBLE_SIZE_UNIT_SPAN,
} from '../types.js'

import type {
  AllowedSizeDirection,
  VisibleSize,
} from '../types.js'

import {
  normalizeVisibleSizeExactKey,
} from './normalize-visible-size-exact-key.js'

import {
  parseVisibleSize,
} from './parse-visible-size.js'

export function normalizeVisibleSizeByDirection(
  visibleSize: VisibleSize | undefined,
  direction: AllowedSizeDirection = SIZE_DIRECTION_HORIZONTAL
) : {[key: string] : string} | undefined {
  visibleSize = parseVisibleSize(visibleSize)
  if (!visibleSize) {
    return
  }

  if (direction === SIZE_DIRECTION_HORIZONTAL) {
    switch (visibleSize.unit) {
      case VISIBLE_SIZE_UNIT_SPAN:
        return normalizeVisibleSizeExactKey(visibleSize, 'grid-column-end') 
      case VISIBLE_SIZE_UNIT_CHARACTERS:
        return normalizeVisibleSizeExactKey(visibleSize, 'width') 
      default:
        return normalizeVisibleSizeExactKey(visibleSize, 'width') 
    }
  } else {
    switch (visibleSize.unit) {
      case VISIBLE_SIZE_UNIT_SPAN:
        return normalizeVisibleSizeExactKey(visibleSize, 'grid-column-end') 
      case VISIBLE_SIZE_UNIT_CHARACTERS:
        return normalizeVisibleSizeExactKey(visibleSize, 'height') 
      default:
        return normalizeVisibleSizeExactKey(visibleSize, 'height') 
    }
  }

}