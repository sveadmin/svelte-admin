import {
  Writable,
} from 'svelte/store'

import {
  RouterData,
  RoutingParameters,
} from '../types.js'

import {
  prepareNavigate,
} from './index.js'

export function prepareNavigateFromLink(store: Writable<RouterData>) : (
  event: MouseEvent,
  routingParameters?: RoutingParameters,
  callback?: (path: string, routingParameters?: RoutingParameters) => void
) => void {
  const defaultNavigate = prepareNavigate(store)
  return function (
    event: MouseEvent,
    routingParameters: RoutingParameters = null,
    callback: (path: string, routingParameters?: RoutingParameters) => void = defaultNavigate
  ) : void {
    if (!event.shiftKey
      && !event.ctrlKey) {
      let target = event.target as HTMLAnchorElement
      while (target &&
        target.tagName !== 'A') {
        target = target.parentNode as HTMLAnchorElement
      }
      event.preventDefault();
      callback(target.pathname, routingParameters);
    }
  }
}