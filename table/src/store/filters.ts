import {
  noop,
} from 'svelte/internal'

import { 
  get as internalGet,
  writable,
  Writable,
} from 'svelte/store'

import {
  FilterData,
  FilterStore,
  FilterStoreConstructor,
} from '../types.js'

export const getFilters = (parameters: FilterStoreConstructor = {}) : FilterStore => {
  const {
    initialValue = {}
  } = parameters
  const store: Writable<FilterData> = writable(initialValue)
  const {subscribe, set, update} = store

  const add = (key: string, value: any) : void => {
    update(currentValue => {
      currentValue[key] = value;
      return currentValue
    })
  }

  const has = (key: string) : boolean => {
    const data = internalGet(store)
    return !!data[key]
  }

  const get = (key: string) : any => {
    const data = internalGet(store)
    return data[key]
  }

  const remove = (key: string) : void => {
    update(currentValue => {
      delete currentValue[key];
      return currentValue
    })
  }

  return {
    add,
    get,
    has,
    remove,
    set,
    subscribe,
    update: noop,
  }
}