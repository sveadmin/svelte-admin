import {
  SvelteComponent
} from 'svelte'

import {
  get,
  writable,
  Writable,
} from 'svelte/store';

import {
  Screen,
  ScreenData,
  ScreenStore,
  ScreenStoreConstructor,
  ScreenType,
} from './types.js'

export const getScreens = function (parameters: ScreenStoreConstructor = {}) : ScreenStore {
  const {
    initialValue = {}
  } = parameters

  const store: Writable<ScreenData> = writable(initialValue)
  const {subscribe, set, update} = store

  const addToType = (
    type: ScreenType,
    screen: Screen,
    addToTop: boolean = true
  ) : void => {
    update(currentValue => {
      if (addToTop) {
        currentValue[type].unshift(screen)
      } else {
        currentValue[type].push(screen)
      }
      return currentValue
    })
  }

  const displayAll = (parameters: RegisterScreen) : void => {
    //TODO: What is the purpose of this?
    // update(currentValue => {
    //   currentValue[type].map(currentScreen => currentScreen.component = component)
    //   return currentValue
    // })
  }

  const displayTop = (parameters: RegisterScreen) : void => {
    const {
      component,
      listeners,
      parameters,
    } = parameters
    update(currentValue => {
      currentValue[type][0] = {
        component,
        listeners,
        parameters,
      }

      return currentValue
    })
  }

  const setType = (type: ScreenType, screens: Screen[]) : void => {
    update(currentValue => {
      currentValue[type] = screens
      return currentValue
    })
  }

  return {
    addToType,
    displayAll,
    displayTop,
    set,
    setType,
    subscribe,
    update,
  }
}