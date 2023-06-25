import {
  get,
  writable,
  Writable, 
} from 'svelte/store'

import {
  LoaderData,
  LoaderStore
} from './types.js'

export function instantiate(): LoaderStore {
  const store: Writable<LoaderData> = writable(false)

  const {
    subscribe,
  } = store

  const keys: {[key: string]: boolean} = {}

  const registerTask = () : string => {
    store.set(true)
    const key = Math.random().toString(36).substring(2, 7)
    keys[key] = true
    return key
  }

  const unregisterTask = (key: string) : void => {
    delete keys[key]
    if (Object.keys(keys).length === 0) {
      store.set(false)
    }
  }

  return {
    registerTask,
    subscribe,
    unregisterTask
  }
}

export const loader = instantiate()