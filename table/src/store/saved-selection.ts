import {
  writable,
  Writable,
} from 'svelte/store';

import {
  SavedSelectionData,
  SavedSelectionStore,
  SavedSelectionStoreConstructor,
} from '../types.js'

export const getSavedSelection = function (parameters: SavedSelectionStoreConstructor = {}) : SavedSelectionStore {
  const {
    initialValue = []
  } = parameters
  const store : Writable<SavedSelectionData> = writable(initialValue)
  return store
}