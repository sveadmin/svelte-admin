import type {
  AddRouteParameters,
  RouterData,
} from '../types.js'

import {
  prepareGetRoute,
  parseRoutePlaceholders,
} from '../helper/index.js'

export function prepareAddRoute(store: {routes: RouterData}) : (parameters: AddRouteParameters) => void {
  const getRoute = prepareGetRoute(store)
  return (parameters: AddRouteParameters) : void => {
    const { current, errorComponents } = store.routes
    const { route, component, name } = parameters
    const regexRoute = parseRoutePlaceholders(route)
    store.routes.routes.normal[route] = component
    if (route.indexOf(':') >= 0
      || route.indexOf('{') >= 0) {
      store.routes.routes.regex.push(
        {
          regex: new RegExp(regexRoute),
          component: store.routes.routes.normal[route]
        }
      )
    }

    if (name) {
      if (!store.routes.namedRoutes) {
        store.routes.namedRoutes = {}
      }
      store.routes.namedRoutes[name] = route
    }

    const checkComponent = getRoute(current)
    if (checkComponent !== errorComponents.notFound) {
      store.routes.currentComponent = checkComponent
    }
  }
}