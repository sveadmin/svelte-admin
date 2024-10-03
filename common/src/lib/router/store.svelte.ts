import type {
  RouterData,
  RouterStore,
} from './types.js'

import {
  prepareAddRoute,
  prepareNavigate,
  prepareNavigateFromLink,
  prepareSetCurrentRoute,
  prepareSetRoutingParameters,
  prepareSetRequiresHistoryEntry,
} from './action/index.js'

import {
  prepareGetRoute,
  prepareGetNamedRoute,
} from './helper/index.js'


import {
  Error404,
} from './view/index.js'

function instantiate(): RouterStore {
  let routes: RouterData = {
    current: '',
    currentComponent: Error404,
    errorComponents: {
      'notFound': Error404
    },
    routes: {
      normal: {},
      regex: []
    },
    routingHelpers: {
      requiresHistoryEntry: false
    }
  }
  const store: {routes: RouterData} = $state({routes})

  return {
    add: prepareAddRoute(store),
    get: prepareGetRoute(store),
    get routes() : RouterData { return store.routes },
    getNamedRoute: prepareGetNamedRoute(store),
    navigate: prepareNavigate(store),
    navigateFromLink: prepareNavigateFromLink(store),
    setCurrentRoute: prepareSetCurrentRoute(store),
    setRoutingParameters: prepareSetRoutingParameters(store),
    setRequiresHistoryEntry: prepareSetRequiresHistoryEntry(store),
  }
}

export const router = instantiate()