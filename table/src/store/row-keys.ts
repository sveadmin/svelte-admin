import {
  writable,
  Writable,
} from 'svelte/store';

import {
  RowKeyData,
  RowKeyStore,
} from '../types.js'

export const getRowKeys = function () : RowKeyStore {
  const store : Writable<RowKeyData> = writable([])
  return store
}