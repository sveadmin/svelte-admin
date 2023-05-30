import {
  writable,
  Writable,
} from 'svelte/store';

import {
  RowSelectionData,
  RowSelectionStore,
} from '../types.js'

export const getRowSelection = function (parameters: RowSelectionData = {}) : RowSelectionStore {
  const {
    allChecked = false,
    partiallyChecked = false,
    selectionCount = 0,
  } = parameters

  const store : Writable<RowSelectionData> = writable({
    allChecked,
    partiallyChecked,
    selectionCount,
  })

  return store
}