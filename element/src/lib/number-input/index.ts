import {
  defaultComponents,
} from '$lib/component/index.js'

import NumberInput from './number-input.svelte'

import {
  COMPONENT_NUMBER_INPUT
} from './types.js'

export {
  NumberInput
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_NUMBER_INPUT,
  NumberInput
)