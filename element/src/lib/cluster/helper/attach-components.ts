import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  propertyMerger,
} from '$lib/helper/index.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import {
  COMPONENT_IMAGE,
  COMPONENT_IMAGE_WRAPPED,
} from '$lib/image/index.js'

import {
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_DISPLAY_WRAPPED,
} from '$lib/text-display/index.js'

let attachNext: boolean = false,
  lastDynamicPart: SveadminComponent<any> | undefined

function attachParts() {
  if (lastDynamicPart) {
    if (lastDynamicPart.display) {
      lastDynamicPart.display.config = lastDynamicPart.display?.config ?? {}
      lastDynamicPart.display.config.isAttachedOnRight = true
    }
    if (lastDynamicPart.input) {
      lastDynamicPart.input.config = lastDynamicPart.input?.config ?? {}
      lastDynamicPart.input.config.isAttachedOnRight = true
    }
  }
  attachNext = true
}

export const attachComponents = (maskPiece: SveadminComponent<any>, index: number) : SveadminComponent<any> => {
  if (index === 0) {
    attachNext = false
    lastDynamicPart = undefined
  }

  const type = maskPiece?.display?.type
    ?? maskPiece?.input?.type
    ?? maskPiece.type

  switch (type) {
    //This component can not be attached
    case COMPONENT_IMAGE:
    case COMPONENT_LITERAL:
    case COMPONENT_TEXT_DISPLAY:
      return maskPiece
    case COMPONENT_TEXT_DISPLAY_WRAPPED:
      if (maskPiece.display?.config?.isFloating) {
        attachParts()
      }
      return maskPiece
    case COMPONENT_IMAGE_WRAPPED:
      if (lastDynamicPart) {
        maskPiece.display = maskPiece.display ?? {}
        maskPiece.display.config = propertyMerger(
          {
            isAttachedOnLeft:true
          },
          maskPiece?.display?.config
        )
      }
      if (attachNext) {
        maskPiece.display = maskPiece.display ?? {}
        maskPiece.display.config = propertyMerger(
          {
            isAttachedOnLeft:true
          },
          maskPiece?.display?.config
        )
        attachNext = false
      }
      if (maskPiece.display?.config?.seamless) {
        maskPiece.display.config.isAttachedOnRight = true
        attachParts()
      }
      return maskPiece
    // case CONTROL_INPUT_TYPE_BUTTON:
    // case CONTROL_INPUT_TYPE_RESET:
    // case CONTROL_INPUT_TYPE_SUBMIT:
    default:
      if (attachNext) {
        maskPiece.input = maskPiece.input ?? {}
        maskPiece.input.config = propertyMerger(
          {
            isAttachedOnLeft:true
          },
          maskPiece?.display?.config
        )
        attachNext = false
      }
      lastDynamicPart = maskPiece
      return maskPiece
  }
}