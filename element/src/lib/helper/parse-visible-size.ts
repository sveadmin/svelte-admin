import type {
  VisibleSize,
  VisibleSizeObject,
} from '../types.js'

export function parseVisibleSize(visibleSize?: VisibleSize) : VisibleSizeObject | undefined {
  if (typeof visibleSize !== 'string') {
    return visibleSize
  }
  const visibleSizeObject : VisibleSizeObject = {
    size: parseFloat(visibleSize)
  }

  visibleSizeObject.unit = visibleSize.replace(visibleSizeObject.size.toString(), '')
    .replaceAll(/\d/gi, '')
    .trim()

  return visibleSizeObject
}