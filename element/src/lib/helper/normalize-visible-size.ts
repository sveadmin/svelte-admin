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

export function normalizeVisibleSize(visibleSize: VisibleSize, direction: AllowedSizeDirection = SIZE_DIRECTION_HORIZONTAL) : string | undefined {
  if (typeof visibleSize === 'string') {
    const width = visibleSize.match(/[\.\d]+/g)
    if (!width
      || !width[0]) {
      return
    }
    const unit : VisibleSizeUnits = visibleSize.replace(width[0], '')
    visibleSize = {
      unit,
      size: parseFloat(width[0]),
    }
  }

  if (direction === SIZE_DIRECTION_HORIZONTAL) {
    switch (visibleSize.unit) {
      case VISIBLE_SIZE_UNIT_SPAN:
        return 'grid-column-end: span ' + visibleSize.size
      case VISIBLE_SIZE_UNIT_CHARACTERS:
        return 'width: calc(' + visibleSize.size + ' * var(--width-factor))'
      default:
        return 'width: ' + visibleSize.size + visibleSize.unit
    }
  } else {
    switch (visibleSize.unit) {
      case VISIBLE_SIZE_UNIT_SPAN:
        return 'grid-row-end: span ' + visibleSize.size
      case VISIBLE_SIZE_UNIT_CHARACTERS:
        return 'height: calc(' + visibleSize.size + ' * var(--height-factor))'
      default:
        return 'height: ' + visibleSize.size + visibleSize.unit
    }
  }

}