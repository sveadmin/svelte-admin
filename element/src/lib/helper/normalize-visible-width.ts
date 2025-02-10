import  {
  VISIBLE_WIDTH_UNIT_CHARACTERS,
  VISIBLE_WIDTH_UNIT_SPAN,
} from '../types.js'

import type {
  VisibleWidth,
  VisibleWidthUnits
} from '../types.js'

export function normalizeVisibleWidth(visibleWidth: VisibleWidth) : string | undefined {
  if (typeof visibleWidth === 'string') {
    const width = visibleWidth.match(/[\.\d]+/g)
    if (!width
      || !width[0]) {
      return
    }
    const unit : VisibleWidthUnits = visibleWidth.replace(width[0], '')
    visibleWidth = {
      unit,
      width: parseFloat(width[0]),
    }
  }

  switch (visibleWidth.unit) {
    case VISIBLE_WIDTH_UNIT_SPAN:
      return 'grid-column-end: span ' + visibleWidth.width
    case VISIBLE_WIDTH_UNIT_CHARACTERS:
      return 'width: calc(' + visibleWidth.width + ' * var(--width-factor))'
    default:
      return 'width: ' + visibleWidth.width + visibleWidth.unit
  }
}