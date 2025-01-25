import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '../types.js'

import type {
  NumberOptions,
  TextDisplayMask,
  TextDisplayPartObjects,
} from '../types.js'

import {
  parseLiteralShortCuts,
} from './parse-literal-shortcuts.js'

export function spreadOptions(
  mask: TextDisplayMask | string | undefined,
  options: NumberOptions,
  locale?: string
) : TextDisplayMask
{
  if (typeof mask === 'string') {
    const expandedParts = parseLiteralShortCuts(mask)
    if (expandedParts !== null) {
      mask = expandedParts.map((currentPart: TextDisplayPartObjects) => {
        if (currentPart.type !== TEXT_DISPLAY_TYPE_NUMBER) {
          return currentPart
        }
        return {
          locale,
          options: {
            ...currentPart?.options,
            ...options
          },
          type: TEXT_DISPLAY_TYPE_NUMBER,
        }
      })
    }
  }

  if (!mask
    || !Array.isArray(mask)
  ) {
    mask = [{
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }]
  }

  return mask.map((currentMaskPiece) => {
    if (typeof currentMaskPiece === 'string'
      || currentMaskPiece.type !== TEXT_DISPLAY_TYPE_NUMBER) {
      return currentMaskPiece
    }
    currentMaskPiece.options = {
      ...currentMaskPiece?.options,
      ...options
    }
    return currentMaskPiece
  })
}