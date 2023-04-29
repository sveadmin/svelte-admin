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
  prepareSetWasBackButtonUsed,
} from './index.js'

export function prepareNavigate(store: Writable<RouterData>) : (
    path: string,
    routingParameters?: RoutingParameters
  ) => void {
  const setCurrentRoute = prepareSetCurrentRoute(store)
  const setRoutingParameters = prepareSetRoutingParameters(store)
  const setWasBackButtonUsed = prepareSetWasBackButtonUsed(store)
  return function (path: string, routingParameters: RoutingParameters = null) : void {
    if (routingParameters) {
      setRoutingParameters(routingParameters)

    }
    setWasBackButtonUsed(false)
    setCurrentRoute(path)
    window.history.pushState(
      {
        path: path,
        routingParams: routingParameters || {}
      },
      '',
      window.location.origin + path
    )
  }

}