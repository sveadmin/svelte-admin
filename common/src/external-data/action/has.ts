import {
  get,
  Writable,
} from 'svelte/store'

import {
  ExternalData,
} from '../types.js'

export function prepareHas (store: Writable<ExternalData>) {
  return (key: string) : boolean => {
    const data: ExternalData = get(store)
    return !!data[key]
  }
}