import {
  getContext
} from 'svelte'

import {
  TableContext,
  TableContextKey,
} from '../types.js'


export const prepareGetChangePageAction = (contextKey: TableContextKey, callback: {() : void}) : (() => void) => {
  const {
    loader,
  } = getContext(contextKey) as TableContext
  return async () => {
    loader.set(true);
    await callback();
    loader.set(false);
  }
}