import {
  Writable,
} from 'svelte/store'

import {
  RouterData,
} from '../types.js'

export function prepareSetCurrentRoute(store: Writable<RouterData>) : (path: string) => void {
  const { update } = store
  return function (path: string) : void {
    update((currentValue: RouterData)=> {
      currentValue.current = path

      return currentValue
    })
  }
}