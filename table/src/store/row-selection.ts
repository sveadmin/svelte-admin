import {
  writable,
  Writable,
} from 'svelte/store';

import {
  RowSelectionData,
  RowSelectionStore,
} from '../types.js'

export const getRowSelection = function () : RowSelectionStore {
  const store : Writable<RowSelectionData> = writable({
    allChecked: false,
    partiallyChecked: false,
    selectionCount: 0,
  })

  return store
}