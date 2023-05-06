import {
  writable,
  Writable,
} from 'svelte/store'

import {
  noop,
} from 'svelte/internal'

import {
  router,
  RouterData,
} from '@sveadmin/common'

import {
  PageDetailData,
  PageDetailStore,
} from '../types.js'

export const getPageDetails = () : PageDetailStore => {
  let namedRoutingParameters: {[key: string] : any} = {}

  router.subscribe((currentValue : RouterData) => namedRoutingParameters = currentValue.routingParameters && currentValue.routingParameters.named || {})

  const store : Writable<PageDetailData> = writable({
    size: namedRoutingParameters && namedRoutingParameters.size || 0,
    limit: namedRoutingParameters && namedRoutingParameters.limit || 10,
    offset: namedRoutingParameters && namedRoutingParameters.offset || 0,
  })
  const {subscribe, set, update} = store

  const setSize = (size: number) : void => {
    update((currentValue) => {currentValue.size = size; return currentValue})
  }

  const setLimit = (limit: number) : void => {
    update((currentValue) => {currentValue.limit = limit; return currentValue})
  }

  const setOffset = (offset: number) : void => {
    update((currentValue) => {currentValue.offset = offset; return currentValue})
  }

  return {
    set,
    setLimit,
    setOffset,
    setSize,
    subscribe,
    update : noop
  }

}