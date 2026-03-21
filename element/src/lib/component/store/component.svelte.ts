import type {
  Component,
  Snippet,
} from 'svelte'

import type{
  ComponentStore,
  ComponentStoreData,
} from '../types.js'

export function createComponentStore(components: ComponentStoreData = {}): ComponentStore {
  const list: ComponentStoreData = $state(
    components
  )

  const get = (key: string) : Component | Snippet | undefined => {
    return list?.[key]
  }

  const add = (key: string, component: Component | Snippet) => {
    list[key] = component
  }

  return {
    add,
    get,
    list,
  }
}