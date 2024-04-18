import {
  writable,
  Writable,
} from 'svelte/store';

import {
  ScreenData,
  ScreenStore,
  ScreenStoreConstructor,
} from './types.js'

import {
  prepareAdd,
  prepareClear,
  prepareSetComponent,
  prepareSetFallbackType,
  prepareSetType,
} from './action/index.js'

function instantiate (parameters: ScreenStoreConstructor = {}) : ScreenStore {
  const {
    screens = {}
  } = parameters

  const store: Writable<ScreenData> = writable({
    fallbacks: {},
    screens
  })
  const {subscribe, set, update} = store

  return {
    addComponent: prepareAdd(store),
    clearComponent: prepareClear(store),
    set,
    setComponent: prepareSetComponent(store),
    setFallbackType: prepareSetFallbackType(store),
    setType: prepareSetType(store),
    subscribe,
    update,
  }
}

export const screen = instantiate()