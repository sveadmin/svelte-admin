import {
  noop,
} from 'svelte/internal'

import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  BOUNDARY_LOWER,
  BOUNDARY_UPPER,
  BoundaryData,
  BoundaryStore,
  BoundaryStoreConstructor,
} from './types.js'

export function getBoundaryStore(parameters: BoundaryStoreConstructor): BoundaryStore {
  const {
    lower = 0,
    upper = 1
  } = parameters

  const store: Writable<BoundaryData> = writable({
    lower,
    upper
  })

  const { subscribe, update } = store

  const setLower = (lower: number) : void => {
    update((currentValue: BoundaryData) => {
      currentValue[BOUNDARY_LOWER] = lower
      return currentValue
    })
  }

  const setUpper = (upper: number) : void => {
    update((currentValue: BoundaryData) => {
      currentValue[BOUNDARY_UPPER] = upper
      return currentValue
    })
  }

  return {
    set: noop,
    setLower,
    setUpper,
    subscribe,
    update,
  }
}