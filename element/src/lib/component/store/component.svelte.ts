import type {
  Component,
} from 'svelte'

import type {
  SveadminElementConfig,
} from '$lib/types.js'

import type{
  ComponentStore,
  ComponentStoreData,
  ComponentWithConfig,
} from '../types.js'

export function createComponentStore(components: ComponentStoreData = {}): ComponentStore {
  const list: ComponentStoreData = $state(
    components
  )

  const get = (key: string) : Component  | undefined => {
    const listItem = list?.[key]
    if (!listItem) {
      return undefined
    }

    if (!listItem.hasOwnProperty('component')) {
      return listItem as Component
    }

    const componentWithConfig : ComponentWithConfig = listItem as ComponentWithConfig
    return componentWithConfig.component
  }

  const getConfig = (key: string) : SveadminElementConfig => {
    const listItem = list?.[key]
    if (!listItem
      || !listItem.hasOwnProperty('component'))
    {
      return {}
    }

    const componentWithConfig : ComponentWithConfig = listItem as ComponentWithConfig
    return componentWithConfig?.config ?? {}
  }

  const add = (key: string, component: Component | ComponentWithConfig) => {
    list[key] = component
  }

  return {
    add,
    get,
    getConfig,
    list,
  }
}