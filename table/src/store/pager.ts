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
    first = null,
    prev = null,
    next = null,
    last = null,
  } = parameters

  const store : Writable<PagerData> = writable({
    first,
    prev,
    next,
    last,
  })

  return store
}