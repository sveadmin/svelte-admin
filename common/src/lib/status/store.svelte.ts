import type {
  StatusData,
  StatusMessage,
  StatusStore,
} from './types.js'

import {
  prepareAdd,
  prepareDismiss,
} from './action/index.js'

function instantiate() : StatusStore {
  const store: StatusData = $state({
    messages: []
  })
 
  return {
    get messages(): StatusMessage[] { return store.messages },
    add: prepareAdd(store),
    dismiss: prepareDismiss(store),
  }
}

export const status = instantiate()