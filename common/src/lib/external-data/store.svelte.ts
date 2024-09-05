import type {
  ExternalData,
  ExternalDataStore,
} from './types.js'

import {
  prepareGet,
  prepareHas,
  prepareRemove,
} from './action/index.js'


function instantiate(): ExternalDataStore {
  let raw: ExternalData = {}
  const store: {raw: ExternalData} = $state({raw})

  return {
    get raw() { return store.raw },
    set raw(newValue: ExternalData) { store.raw = newValue},
    get: prepareGet(store),
    has: prepareHas(store),
    remove: prepareRemove(store),
  }
}

export const externalData = instantiate()