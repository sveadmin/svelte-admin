import type {
  VisibleSize,
  VisibleSizeObject,
  VisibleSizeUnits,
} from '../types.js'

export function parseVisibleSize(visibleSize?: VisibleSize) : VisibleSizeObject | undefined {
  if (visibleSize) {
    return
  }

  if (typeof visibleSize !== 'string') {
    return visibleSize
  }

  const width = visibleSize.match(/[\.\d]+/g)
  if (!width
    || !width[0]) {
    return
  }
  const unit : VisibleSizeUnits = visibleSize.replace(width[0], '') as VisibleSizeUnits
  visibleSize = {
    unit,
    size: parseFloat(width[0]),
  }

  return visibleSize
}