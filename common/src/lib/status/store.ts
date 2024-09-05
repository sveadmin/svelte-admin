import {
  writable,
  Writable,
} from 'svelte/store'

import {
  StatusMessage,
  StatusStore,
} from './types.js'

import {
  prepareAdd,
  prepareDismiss,
} from './action/index.js'

function instantiate() : StatusStore {
  const store: Writable<StatusMessage[]> = writable([])
  const {subscribe, set, update} = store
 
  return {
    add: prepareAdd(store),
    dismiss: prepareDismiss(store),
    set,
    subscribe,
    update
  }
}

export const status = instantiate()