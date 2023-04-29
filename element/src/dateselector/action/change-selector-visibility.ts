import {
  DateSelectorDisplayStore
} from '../types'


export function prepareChageSelectorVisiblity(store: DateSelectorDisplayStore) : (event: Event) => void {
  let isSelectorVisible: boolean = false
  store.subscribe(currentValue => isSelectorVisible = currentValue.isSelectorVisible)
  return (event: Event) : void => {
    store.setIsSelectorVisible(!isSelectorVisible)
  }
}