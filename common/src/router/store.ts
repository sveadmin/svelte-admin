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
  prepareSetRoutingParameters,
  prepareSetWasBackButtonUsed,
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
    errorComponents: {
      'notFound': Error404
    },
    routes: {
      normal: {},
      regex: []
    },
    routingHelpers: {
      wasBackButtonUsed: false
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
  const setWasBackButtonUsed = prepareSetWasBackButtonUsed(store)

  return {
    add: addRoute,
    get: getRoute,
    getNamedRoute,
    navigate,
    navigateFromLink,
    set: noop,
    setCurrentRoute,
    setRoutingParameters,
    setWasBackButtonUsed,
    subscribe,
    update: noop,
  }
}

export const router = instantiate()