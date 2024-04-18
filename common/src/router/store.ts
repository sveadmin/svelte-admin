import {
  writable,
  Writable,
} from 'svelte/store'

import {
  noop,
} from '../noop/index.js'

import {
  RouterData,
  RouterStore
} from './types.js'

import {
  prepareAddRoute,
  prepareNavigate,
  prepareNavigateFromLink,
  prepareSetCurrentRoute,
  prepareSetRequiresHistoryEntry,
  prepareSetRoutingParameters,
} from './action/index.js'

import {
  prepareGetNamedRoute,
  prepareGetRoute,
} from './helper/index.js'

import {
  Error404,
} from './view/index.js'

function instantiate(): RouterStore {
  const store: Writable<RouterData> = writable({
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
  })
  const { subscribe } = store

  return {
    add: prepareAddRoute(store),
    get: prepareGetRoute(store),
    getNamedRoute: prepareGetNamedRoute(store),
    navigate: prepareNavigate(store),
    navigateFromLink: prepareNavigateFromLink(store),
    set: noop,
    setCurrentRoute: prepareSetCurrentRoute(store),
    setRoutingParameters: prepareSetRoutingParameters(store),
    setRequiresHistoryEntry: prepareSetRequiresHistoryEntry(store),
    subscribe,
    update: noop,
  }
}

export const router = instantiate()