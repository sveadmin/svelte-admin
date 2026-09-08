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
  normalizeVisibleSizeByDirection,
} from './normalize-visible-size-by-direction.js'

export function normalizeVisibleSize(visibleSize: VisibleSize, direction: AllowedSizeDirection = SIZE_DIRECTION_HORIZONTAL) : string | undefined {
  const data = normalizeVisibleSizeByDirection(visibleSize, direction)
  if (!data) {
    return
  }

  return Object.keys(data).map((key: string) => {
    return '--item-' + key + ': ' + data[key]
  }).join(';')
}