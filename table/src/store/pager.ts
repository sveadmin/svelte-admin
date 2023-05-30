import {
  writable,
  Writable,
} from 'svelte/store';

import {
  PagerData,
  PagerStore,
} from '../types.js';

export const getPager = function (parameters: PagerData = {}) : PagerStore {
  const {
    firstPage = null,
    previousPage = null,
    nextPage = null,
    lastPage = null,
  } = parameters

  const store : Writable<PagerData> = writable({
    firstPage,
    previousPage,
    nextPage,
    lastPage,
  })

  return store
}