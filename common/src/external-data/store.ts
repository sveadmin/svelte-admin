import {
  get,
  writable,
  Writable, 
} from 'svelte/store'

import {
  ExternalData, ExternalDataStore
} from './types.js'

import {
  prepareGetKey,
  prepareHas,
  prepareRemove,
} from './action/index.js'

function instantiate(): ExternalDataStore {
  const store: Writable<ExternalData> = writable({})
  const {subscribe, set, update} = store

  return {
    getKey: prepareGetKey(store),
    has: prepareHas(store),
    remove: prepareRemove(store),
    set,
    subscribe,
    update
  }
}

export const externalData = instantiate()