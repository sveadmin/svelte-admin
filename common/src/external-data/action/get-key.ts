import {
  get,
  Writable,
} from 'svelte/store'

import {
  ExternalData,
} from '../types.js'

import {
  prepareHas,
} from './has.js'

import {
  prepareRemove,
} from './remove.js'

export function prepareGetKey (store: Writable<ExternalData>) {
  const has = prepareHas(store)
  const remove = prepareRemove(store)
  return (
      key: string,
      defaultValue: any = {},
      removeKey: boolean = true
  ) :  any => {
    const data: ExternalData = get(store)
    let response = defaultValue
    if (has(key)) {
      response = data[key]
      if (removeKey) {
        remove(key)
      }
    }
    return response
  }
}