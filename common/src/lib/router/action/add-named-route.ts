import {
  Writable,
} from 'svelte/store'

import {
  RouterData,
} from '../types.js'

export function prepareAddNamedRoute(store: Writable<RouterData>) : (name: string, url: string) => void {
  const { update } = store
  return (name: string, url: string): void => {
    update(currentValue => {
      if (!currentValue.namedRoutes) {
        currentValue.namedRoutes = {}
      }
      currentValue.namedRoutes[name] = url
      return currentValue
    })
  }
}