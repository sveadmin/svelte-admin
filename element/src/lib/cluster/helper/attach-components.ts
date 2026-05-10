import type {
  SveadminComponent,
  SveadminElement,
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

function getCurrentComponent(maskPiece: SveadminComponent<any>) : SveadminElement<any> {
  let currentComponent = maskPiece?.display ?? maskPiece?.input

  if (currentComponent) {
    return currentComponent
  }

  maskPiece.display = {} //TODO: What is how to know if input is needed for the type?
  return maskPiece.display
}

function attachParts() {
  if (lastDynamicPart) {
    const currentComponent = getCurrentComponent(lastDynamicPart)
    currentComponent.config = currentComponent?.config ?? {}
    currentComponent.config.isAttachedOnRight = true
  }
  attachNext = true
}

export const attachComponents = (maskPiece: SveadminComponent<any>, index: number) : SveadminComponent<any> => {
  if (index === 0) {
    attachNext = false
    lastDynamicPart = undefined
  }

  const currentComponent = getCurrentComponent(maskPiece)
  const type = currentComponent?.type
    ?? maskPiece.type

  switch (type) {
    //This component can not be attached
    case COMPONENT_IMAGE:
    case COMPONENT_LITERAL:
    case COMPONENT_TEXT_DISPLAY:
      return maskPiece
    case COMPONENT_TEXT_DISPLAY_WRAPPED:
      if (currentComponent?.config?.isFloating) {
        attachParts()
      }
      return maskPiece
    case COMPONENT_IMAGE_WRAPPED:
      if (lastDynamicPart) {
        currentComponent.config = propertyMerger(
          {
            isAttachedOnLeft:true
          },
          currentComponent?.config
        )
      }
      if (attachNext) {
        currentComponent.config = propertyMerger(
          {
            isAttachedOnLeft:true
          },
          currentComponent?.config
        )
        attachNext = false
      }
      if (currentComponent?.config.seamless) {
        currentComponent.config = currentComponent?.config ?? {}
        currentComponent.config.isAttachedOnRight = true
        attachParts()
      }
      return maskPiece
    // case CONTROL_INPUT_TYPE_BUTTON:
    // case CONTROL_INPUT_TYPE_RESET:
    // case CONTROL_INPUT_TYPE_SUBMIT:
    default:
      if (attachNext) {
        currentComponent.config = propertyMerger(
          {
            isAttachedOnLeft:true
          },
          currentComponent?.config
        )
        attachNext = false
      }
      lastDynamicPart = maskPiece
      return maskPiece
  }
}