import type {
  ExternalData,
} from '../types.js'

import {
  prepareHas,
} from './has.js'

import {
  prepareRemove,
} from './remove.js'

export function prepareGet (store: {raw: ExternalData}) {
  const has = prepareHas(store)
  const remove = prepareRemove(store)
  return (
      key: string,
      defaultValue: any = {},
      removeKey: boolean = true
  ) :  any => {
    let response = defaultValue
    if (has(key)) {
      response = store.raw[key]
      if (removeKey) {
        remove(key)
      }
    }
    return response
  }
}