import {
  DateSelectorDisplayStore
} from '../types.js'


export function prepareChageSelectorView(store: DateSelectorDisplayStore) : (event: Event) => void {
  return (event: Event) : void => {
    const target = event.target as HTMLElement
    store.setSelectedView(target.dataset.view)
  }
}