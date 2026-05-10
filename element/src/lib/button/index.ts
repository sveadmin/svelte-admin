import {
  defaultComponents,
} from '$lib/component/index.js'

import Button from './button.svelte'

import {
  COMPONENT_BUTTON,
} from './types.js'

export {
  Button
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_BUTTON,
  Button
)