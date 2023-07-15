import {
  get,
  writable,
  Writable, 
} from 'svelte/store'

import {
  LoaderData,
  LoaderStore
} from './types.js'

const GRACE_PERIOD = 200

export function instantiate(): LoaderStore {
  const store: Writable<LoaderData> = writable(false)

  const {
    subscribe,
  } = store

  const keys: {[key: string]: boolean} = {}

  let grace: number;

  const registerTask = () : string => {
    clearTimeout(grace)
    store.set(true)
    const key = Math.random().toString(36).substring(2, 7)
    keys[key] = true
    return key
  }

  const unregisterTask = (key: string) : void => {
    delete keys[key]
    if (Object.keys(keys).length === 0) {
      grace = setTimeout(() => store.set(false), GRACE_PERIOD)
    }
  }

  return {
    registerTask,
    subscribe,
    unregisterTask
  }
}

export const loader = instantiate()