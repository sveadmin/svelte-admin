import {
  Writable,
} from 'svelte/store'

import {
  RouterData,
} from '../types.js'

import {
  prepareGetRoute,
} from '../helper/index.js'

export function prepareSetCurrentRoute(store: Writable<RouterData>) : (path: string) => void {
  const { update } = store
  const getRoute = prepareGetRoute(store)
  return function (path: string, doesRequireHistoryEntry: boolean = true) : void {
    update((currentValue: RouterData)=> {
      currentValue.current = path
      currentValue.routingHelpers.requiresHistoryEntry = doesRequireHistoryEntry
      currentValue.currentComponent = getRoute(currentValue.current)

      return currentValue
    })
  }
}