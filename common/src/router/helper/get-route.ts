import {
  SvelteComponent,
} from 'svelte'
import {
  get,
  Writable,
} from 'svelte/store'

import {
  RouterData,
} from '../types.js'

import {
  prepareSetRoutingParameters,
} from '../action/index.js'

import {
  Error404,
} from '../view/index.js'

export function prepareGetRoute(store: Writable<RouterData>) : (route: string) => SvelteComponent {
  const setRoutingParameters = prepareSetRoutingParameters(store)
  return (route: string) : SvelteComponent => {
    const routePieces = route.split('?')
    const { routes } = get(store)
    if (routes.normal[routePieces[0]]) {
      return routes.normal[routePieces[0]]
    }
    for (const regexRoute of routes.regex) {
      const match = regexRoute.regex.exec(routePieces[0])
      if (match) {
        setRoutingParameters({
          named: match.groups,
          unnamed: [...match]
        })
        return regexRoute.component
      }
    }
    return Error404
  }
}
