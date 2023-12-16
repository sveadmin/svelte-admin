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
    const actionKey = loader.registerTask();
    await callback();
    loader.unregisterTask(actionKey);
  }
}