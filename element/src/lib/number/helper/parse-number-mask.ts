import type {
  SveadminComponent,
  SveadminComponentMask,
} from '$lib/types.js'

import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '../types.js'

import type {
  NumberOptions,
} from '../types.js'

import {
  parseLiteralShortCuts,
} from '$lib/literal/index.js'

export function parseNumberMask(
  mask: SveadminComponentMask | undefined,
  options: NumberOptions,
  locale?: string
) : SveadminComponentMask
{
  if (typeof mask === 'string') {
    const expandedParts: SveadminComponent<any>[] | null = parseLiteralShortCuts(mask)
    if (expandedParts !== null) {
      mask = expandedParts.map((currentPart: SveadminComponent<any>) => {
        if (currentPart.type !== TEXT_DISPLAY_TYPE_NUMBER) {
          return currentPart
        }
        const currentOptions = currentPart?.display?.config ?? {}
        return {
          display: {
            config: {
              locale,
              ...currentOptions,
              ...options
            }
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
    const currentOptions = currentMaskPiece?.display?.config ?? {}
    currentMaskPiece.display = currentMaskPiece?.display ?? {}
    currentMaskPiece.display.config = {
      ...currentOptions,
      ...options
    }
    return currentMaskPiece
  })
}