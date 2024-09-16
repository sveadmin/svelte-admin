import type {
  LoaderData,
  LoaderStore,
} from './types.js'

import {
  prepareRegisterTask,
  prepareReset,
  prepareUnregisterTask,
} from './action/index.js'


export function instantiate(): LoaderStore {
  let raw: LoaderData = {
    grace: undefined,
    keys: {},
    state: false,
  }
  const store: LoaderData = $state(raw)

  return {
    get state() : boolean { return store.state },
    set state(newValue: boolean) { store.state = newValue},
    registerTask: prepareRegisterTask(store),
    reset: prepareReset(store),
    unregisterTask: prepareUnregisterTask(store),
  }
}

export const loader = instantiate()