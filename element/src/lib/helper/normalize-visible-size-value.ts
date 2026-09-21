import  {
  VISIBLE_SIZE_UNIT_CHARACTERS,
  VISIBLE_SIZE_UNIT_SPAN,
} from '../types.js'

import type {
  VisibleSize,
} from '../types.js'

import {
  parseVisibleSize,
} from './parse-visible-size.js'

export function normalizeVisibleSizeValue(
  visibleSize: VisibleSize | undefined,
) : string | undefined {
  visibleSize = parseVisibleSize(visibleSize)

  if (!visibleSize) {
    return
  }

  switch (visibleSize.unit) {
    case VISIBLE_SIZE_UNIT_SPAN:
      return 'span ' + visibleSize.size
    case VISIBLE_SIZE_UNIT_CHARACTERS:
      return 'calc(' + visibleSize.size + ' * var(--width-factor))'
    default:
      return visibleSize.size + (visibleSize.unit ?? '')
  }
}