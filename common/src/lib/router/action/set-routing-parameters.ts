import type {
  RouterData,
  RoutingParameters,
} from '../types.js'

export function prepareSetRoutingParameters (store: {routes: RouterData}) : (parameters: RoutingParameters) => void {
  return (parameters: RoutingParameters = {}) : void => {
    const { namedParameters = {}, unnamedParameters = [] } = parameters
    store.routes.routingParameters = {
      namedParameters,
      unnamedParameters
    }
  }
}