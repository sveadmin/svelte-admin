import {
  writable,
  Writable,
} from 'svelte/store'

import {
  MetaData,
  MetaStore,
  MetaStoreConstructor,
} from '../types.js'

export const getMeta = (parameters: MetaStoreConstructor) : MetaStore => {
  const {
    initialValue = {},
  } = parameters
  const store : Writable<MetaData> = writable(initialValue)
  const {subscribe, set, update} = store

  function updateAttribute (key: string, value: any) : void {
    store.update(currentValue => {
      currentValue[key] = value
      return currentValue
    })
  }

  function updateAttributes (attributes: MetaData) : void {
    Object.keys(attributes).map(key => updateAttribute(key, attributes[key]))
  }

  return {
    set,
    subscribe,
    update,
    updateAttribute,
    updateAttributes,
  }
}