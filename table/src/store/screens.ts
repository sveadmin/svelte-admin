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
  ScreenType,
} from '../types.js'

export const getScreens = function () : ScreenStore {
  const store: Writable<ScreenData> = writable({})
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

  const displayAll = (type: ScreenType, component: typeof SvelteComponent) : void => {
    update(currentValue => {
      currentValue[type].map(currentScreen => currentScreen.component = component)
      return currentValue
    })
  }

  const displayTop = (type: ScreenType, component: typeof SvelteComponent) : void => {
    update(currentValue => {
      currentValue[type][0].component = component
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