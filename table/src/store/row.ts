import {
  writable,
  Writable,
} from 'svelte/store';

import {
  Row,
  RowStore,
} from '../types.js'

export const getRow = function (row?: Row) : RowStore {
  const store : Writable<Row> = writable(row)
  return store
}