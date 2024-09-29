import type {
  RouterData,
} from '../types.js'

import {
  prepareGetRoute,
} from '../helper/index.js'

export function prepareSetCurrentRoute(store: {routes: RouterData}) : (path: string, doesRequireHistoryEntry: boolean) => void {
  const getRoute = prepareGetRoute(store)
  return function (path: string, doesRequireHistoryEntry: boolean = true) : void {
    store.routes.current = path
    store.routes.routingHelpers.requiresHistoryEntry = doesRequireHistoryEntry
    store.routes.currentComponent = getRoute(store.routes.current)

  }
}