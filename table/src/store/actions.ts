import {
  writable,
  Writable,
} from 'svelte/store'

import {
  ActionData,
  ActionStore,
  ActionStoreConstructor,
} from '../types.js'

export const getActions = function (parameters: ActionStoreConstructor = {}) : ActionStore {
  const {
    generic = [],
    row = [],
  } = parameters

  const store: Writable<ActionData> = writable({
    generic,
    row,
  })

  return store
}