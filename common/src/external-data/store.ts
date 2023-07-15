import {
  get,
  writable,
  Writable, 
} from 'svelte/store'

import {
  ExternalData, ExternalDataStore
} from './types.js'

function instantiate(): ExternalDataStore {
  const store: Writable<ExternalData> = writable({})
  const {subscribe, set, update} = store

  const has = (key: string) : boolean => {
    const data: ExternalData = get(store)
    return !!data[key]
  }

  return {
    get: (
      key: string,
      defaultValue: any = {},
      removeKey: boolean = true
    ) :  any => {
      const data = get(store)
      const response = has(key) ? data[key] : defaultValue
      if (removeKey) {
        delete data[key]
      }
      return response
    },
    has,
    set,
    subscribe,
    update
  }
}

export const externalData = instantiate()