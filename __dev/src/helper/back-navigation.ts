import {
  router,
} from '@sveadmin/common'

export function backNavigation (event: PopStateEvent) {
  console.log(window.history)
  if (event.state) {
    router.setRoutingParameters(event.state.routingParams)
    router.setWasBackButtonUsed(true)
    router.setCurrentRoute(event.state.path)
  }
}