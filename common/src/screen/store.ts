import {
  get,
  writable,
  Writable,
} from 'svelte/store';

import {
  DisplayComponent,
  Screen,
  ScreenComponent,
  ScreenData,
  ScreenStore,
  ScreenStoreConstructor,
  ScreenType,
} from './types.js'

function instantiate (parameters: ScreenStoreConstructor = {}) : ScreenStore {
  const {
    screens = {}
  } = parameters

  const store: Writable<ScreenData> = writable({
    fallbacks: {},
    screens
  })
  const {subscribe, set, update} = store

  const addComponent = (type: ScreenType, parameters: DisplayComponent) : void =>{
    update(currentValue => {
      const visibleType = findVisibleType(type)
      if (visibleType) {
        currentValue.screens[visibleType].components.push(parameters)
      }

      return currentValue
    })
  };

  const clearComponent = (type: ScreenType, index?: number) : void => {
    update(currentValue => {
      const visibleType = findVisibleType(type)
      if (visibleType) {
        if (index) {
          currentValue.screens[visibleType].components = currentValue.screens[visibleType].components.splice(
            index,
            1,
            currentValue.screens[visibleType].emptyComponent
          )
        } else {
          currentValue.screens[visibleType].components = [currentValue.screens[visibleType].emptyComponent]
        }
      }

      return currentValue
    })
  };

  const findVisibleType = (type: ScreenType) : ScreenType => {
    const data = get(store)
    if (data.screens[type]) {
      return type
    }
    if (data.fallbacks[type]) {
      return findVisibleType(data.fallbacks[type])
    }
    return null
  }

  const setComponent = (type: ScreenType, parameters: DisplayComponent) : void => {
    update(currentValue => {
      const visibleType = findVisibleType(type)
      if (visibleType) {
        currentValue.screens[visibleType].components = [parameters]
      }

      return currentValue
    })
  }

  const setFallbackType = (type: ScreenType, fallbackType: ScreenType) : void => {
    update(currentValue => {
      currentValue.fallbacks[type] = fallbackType
      return currentValue
    })
  }

  const setType = (type: ScreenType, screen: Screen = {}) : void => {
    const {
      components = [],
      emptyComponent,
      fallbackType,
    } = screen
    update(currentValue => {
      currentValue.screens[type] = {
        components,
        emptyComponent,
        type,
      }
      if (fallbackType) {
        currentValue.fallbacks[screen.type] = fallbackType
      }
      return currentValue
    })
  }

  return {
    addComponent,
    clearComponent,
    setComponent,
    set,
    setFallbackType,
    setType,
    subscribe,
    update,
  }
}

export const screen = instantiate()