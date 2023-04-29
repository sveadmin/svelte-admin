import {
  Writable,
} from 'svelte/store'

import {
  AddRouteParameters,
  RouterData,
} from '../types.js'

import {
  parseRoutePlaceholders,
} from '../helper/index.js'

import {
  prepareAddNamedRoute,
} from './index.js'

export function prepareAddRoute(store: Writable<RouterData>) : (parameters: AddRouteParameters) => void {
  const { update } = store
  const addNamedRoute = prepareAddNamedRoute(store)
  return (parameters: AddRouteParameters) : void => {
    const { route, component, name } = parameters
    const regexRoute = parseRoutePlaceholders(route)
    update(currentValue => {
      currentValue.routes.normal[route] = component
      if (route.indexOf(':') >= 0
        || route.indexOf('{') >= 0) {
        currentValue.routes.regex.push(
          {
            regex: new RegExp(regexRoute),
            component: currentValue.routes.normal[route]
          }
        )
      }
      return currentValue
    })

    if (name) {
      addNamedRoute(name, route)
    }
  }
}