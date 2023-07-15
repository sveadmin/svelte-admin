import {
  writable,
  Writable,
} from 'svelte/store';

import {
  OriginalDataData,
  OriginalDataStore,
} from '../types.js'

export const getOriginalData = function () : OriginalDataStore {
  const store : Writable<OriginalDataData> = writable({})

  return store
}