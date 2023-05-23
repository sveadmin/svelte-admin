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
  const store: Writable<LoaderData> = writable(true)
  return store
}

export const loader = instantiate()