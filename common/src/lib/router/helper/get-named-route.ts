import type {
  NamedRoute,
  RouterData,
} from '../types.js'

export function prepareGetNamedRoute(store: {routes: RouterData}) : (parameters: NamedRoute) => string {
  return (parameters: NamedRoute): string => {
    const {
      name,
      namedParameters = {},
      unnamedParameters = []
    } = parameters 
    if (!store.routes?.namedRoutes
      || !store.routes?.namedRoutes[name]) {
      return ''
    }
    let url = store.routes.namedRoutes[name]
    const matches = url.matchAll(/\{([^:]*):?[^\}:]*\}/g)
    for (const match of matches) {
      const value = (match[1]) ? namedParameters[match[1]] : unnamedParameters.shift()
      url = url.replace(match[0], value)
    }
    return url
  }
}