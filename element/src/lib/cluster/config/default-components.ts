import type {
  ComponentStoreData,
} from '$lib/component/index.js'

import {
  COMPONENT_LITERAL,
  Literal
} from '$lib/literal/index.js'

export const components : ComponentStoreData = {
  [COMPONENT_LITERAL]: Literal
}