import {
  defaultComponents,
} from '$lib/component/index.js'

import Checkbox from './checkbox.svelte'

import {
  COMPONENT_CHECKBOX,
} from './types.js'

export {
  Checkbox
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_CHECKBOX,
  Checkbox
)