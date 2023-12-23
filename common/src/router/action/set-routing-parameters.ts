import {
  Writable,
} from 'svelte/store'

import {
  RouterData,
  RoutingParameters,
} from '../types.js'

export function prepareSetRoutingParameters (store: Writable<RouterData>) : (parameters: RoutingParameters) => void {
  const { update } = store
  return (parameters: RoutingParameters = {}) : void => {
    const { namedParameters = {}, unnamedParameters = [] } = parameters
    update(currentValue => {
      currentValue.routingParameters = {
        namedParameters,
        unnamedParameters
      }
      return currentValue
    })
  }
}