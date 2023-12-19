import {
  get,
  Writable,
} from 'svelte/store'

import {
  NamedRoute,
  RouterData,
} from '../types.js'

export function prepareGetNamedRoute(store: Writable<RouterData>) : (parameters: NamedRoute) => string {
  return (parameters: NamedRoute): string => {
    const {
      name,
      namedParameters = {},
      unnamedParameters = []
    } = parameters 
    const data = get(store)
    if (!data.namedRoutes[name]) {
      return ''
    }
    let url = data.namedRoutes[name]
    const matches = url.matchAll(/\{([^:]*):?[^\}:]*\}/g)
    for (const match of matches) {
      const value = (match[1]) ? namedParameters[match[1]] : unnamedParameters.shift()
      url = url.replace(match[0], value)
    }
    return url
  }
}