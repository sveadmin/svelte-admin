import {
  defaultComponents,
} from '$lib/component/index.js'

import Literal from './literal.svelte'

import {
  COMPONENT_LITERAL,
} from './types.js'

export {
  Literal,
}

export * from './types.js'
export * from './helper/index.js'

defaultComponents.add(
  COMPONENT_LITERAL,
  Literal
)