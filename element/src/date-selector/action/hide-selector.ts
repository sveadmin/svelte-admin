import {
  DateSelectorDisplayStore
} from '../types.js'

export function prepareHideSelector(store: DateSelectorDisplayStore) : (event?: Event) => void {
  return (event?: Event) : void => {
    if (event
      && event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    store.setIsSelectorVisible(false)
  }
}