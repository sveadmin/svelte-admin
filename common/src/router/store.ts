import {
  noop,
} from 'svelte/internal'

import {
  get,
  writable,
  Writable,
} from 'svelte/store'

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

  const addRoute = prepareAddRoute(store)
  const getNamedRoute = prepareGetNamedRoute(store)
  const getRoute = prepareGetRoute(store)
  const navigate = prepareNavigate(store)
  const navigateFromLink = prepareNavigateFromLink(store)
  const setCurrentRoute = prepareSetCurrentRoute(store)
  const setRoutingParameters = prepareSetRoutingParameters(store)
  const setRequiresHistoryEntry = prepareSetRequiresHistoryEntry(store)

  return {
    add: addRoute,
    get: getRoute,
    getNamedRoute,
    navigate,
    navigateFromLink,
    set: noop,
    setCurrentRoute,
    setRoutingParameters,
    setRequiresHistoryEntry,
    subscribe,
    update: noop,
  }
}

export const router = instantiate()