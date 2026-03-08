import {
  CONTROL_INPUT_TYPE_BUTTON,
  CONTROL_INPUT_TYPE_RESET,
  CONTROL_INPUT_TYPE_SUBMIT,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import {
  COMPONENT_IMAGE,
} from '$lib/image/index.js'

import type {
  InputPart,
} from '$lib/text-input/index.js'

export function dynamicPartsReducer(aggregator: {[key: number] : number}, maskPiece: InputPart, index: number) : {[key: number] : number} {
  if (typeof maskPiece === 'string') {
    return aggregator
  }
  switch (maskPiece.type) {
    case COMPONENT_LITERAL:
    case COMPONENT_IMAGE:
    case CONTROL_INPUT_TYPE_BUTTON:
    case CONTROL_INPUT_TYPE_RESET:
    case CONTROL_INPUT_TYPE_SUBMIT:
      break
    default:
      aggregator[index] = Object.keys(aggregator).length
  }
  return aggregator
}