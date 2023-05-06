import {
  writable,
  Writable,
} from 'svelte/store';

import {
  SavedSelectionData,
  SavedSelectionStore,
} from '../types.js'

export const getSavedSelection = function () : SavedSelectionStore {
  const store : Writable<SavedSelectionData> = writable([])
  return store
}