import type {
  VisibleSize,
} from '../types.js'

import {
  normalizeVisibleSizeValue,
} from './normalize-visible-size-value.js'

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

  const value = normalizeVisibleSizeValue(visibleSize)
  if (!value) {
    return
  }
  return {
    [key] : value
  }
}