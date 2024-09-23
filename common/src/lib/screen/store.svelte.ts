import type {
  Screen,
  ScreenData,
  ScreenStore,
  ScreenStoreConstructor,
  ScreenType,
} from './types.js'

import {
  prepareAdd,
  prepareClear,
  prepareSetComponent,
  prepareSetFallbackType,
  prepareSetType,
} from './action/index.js'


export function instantiate(parameters: ScreenStoreConstructor = {}): ScreenStore {
  const {
    screens = {},
    fallbacks = {},
  } = parameters

  const store: ScreenData = $state({screens, fallbacks})

  return {
    get screens() : { [key: ScreenType]: Screen } { return store.screens },
    get fallbacks() : {[key: ScreenType]: ScreenType} | undefined { return store.fallbacks},
    addComponent: prepareAdd(store),
    clearComponent: prepareClear(store),
    setComponent: prepareSetComponent(store),
    setFallbackType: prepareSetFallbackType(store),
    setType: prepareSetType(store),
  }
}

export const screen = instantiate()