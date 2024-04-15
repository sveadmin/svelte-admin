import {
  get,
  Writable,
} from 'svelte/store'

import {
  ExternalData,
} from '../types.js'

export function prepareRemove (store: Writable<ExternalData>) {
  return (key: string) : void => {
    store.update((currentValue: ExternalData) => {
      delete currentValue[key]

      return currentValue
    })
  }
}