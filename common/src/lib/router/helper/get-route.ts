import type {
  Component,
} from 'svelte'

import type {
  RouterData,
} from '../types.js'

import {
  prepareSetRoutingParameters,
} from '../action/index.js'

export function prepareGetRoute(store: {routes: RouterData}) : (route: string) => Component {
  const setRoutingParameters = prepareSetRoutingParameters(store)
  return (route: string) : Component => {
    const routePieces = route.split('?')
    const { errorComponents, routes } = store.routes
    if (routes.normal[routePieces[0]]) {
      return routes.normal[routePieces[0]]
    }
    for (const regexRoute of routes.regex) {
      const match = regexRoute.regex.exec(routePieces[0])
      if (match) {
        setRoutingParameters({
          namedParameters: match.groups,
          unnamedParameters: [...match]
        })
        return regexRoute.component
      }
    }
    return errorComponents.notFound
  }
}
