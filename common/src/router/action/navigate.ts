import {
  Writable,
} from 'svelte/store'

import {
  RouterData,
  RoutingParameters,
} from '../types.js'

import {
  prepareSetCurrentRoute,
  prepareSetRoutingParameters,
  prepareSetRequiresHistoryEntry,
} from './index.js'

export function prepareNavigate(store: Writable<RouterData>) : (
    path: string,
    routingParameters?: RoutingParameters
  ) => void {
  const setCurrentRoute = prepareSetCurrentRoute(store)
  const setRoutingParameters = prepareSetRoutingParameters(store)
  return function (path: string, routingParameters: RoutingParameters = {}) : void {
    setRoutingParameters(routingParameters)
    setCurrentRoute(path, true)
    window.history.pushState(
      {
        path: path,
        routingParameters: routingParameters || {}
      },
      '',
      window.location.origin + path
    )
  }

}