import {
  defaultComponents,
} from '$lib/component/index.js'

import CheckboxSwitch from './checkbox-switch.svelte'

import {
  COMPONENT_CHECKBOX_SWITCH
} from './types.js'

export {
  CheckboxSwitch
}

export { renderFalseHint } from './render-false-hint.svelte'
export { renderTrueHint } from './render-true-hint.svelte'

export * from './types.js'

defaultComponents.add(
  COMPONENT_CHECKBOX_SWITCH,
  CheckboxSwitch
)