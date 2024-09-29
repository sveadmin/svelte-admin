import type {
  RouterData
} from '../types.js'

export function prepareSetRequiresHistoryEntry (store: {routes: RouterData}) : (value: boolean) => void {
  return (value: boolean) : void => {
    store.routes.routingHelpers.requiresHistoryEntry = value
  }
}