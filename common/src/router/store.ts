import {
  noop,
} from 'svelte/internal'

import {
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
  prepareSetRoutingParameters,
  prepareSetWasBackButtonUsed,
} from './action/index.js'

import {
  prepareGetNamedRoute,
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
  const navigate = prepareNavigate(store)
  const navigateFromLink = prepareNavigateFromLink(store)
  const setRoutingParameters = prepareSetRoutingParameters(store)
  const setWasBackButtonUsed = prepareSetWasBackButtonUsed(store)


  return {
    add: addRoute,
    getNamedRoute,
    navigate,
    navigateFromLink,
    set: noop,
    setRoutingParameters,
    setWasBackButtonUsed,
    subscribe,
    update: noop,
  }
}

export const router = instantiate()