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
  normalizeVisibleSizeAsData,
} from './normalize-visible-size-as-data.js'

export function normalizeVisibleSize(visibleSize: VisibleSize, direction: AllowedSizeDirection = SIZE_DIRECTION_HORIZONTAL) : string | undefined {
  const data = normalizeVisibleSizeAsData(visibleSize, direction)
  if (!data) {
    return
  }

  return Object.keys(data).map((key: string) => {
    return '--item-' + key + ': ' + data[key]
  }).join(';')
}