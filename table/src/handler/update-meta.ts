import { getContext } from 'svelte';

import {
  RowAttributes,
  ROW_META_STATUS,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareUpdateMeta = function (contextKey: TableContextKey) : ((
  rowAttributes: RowAttributes,
  key: string,
  value: any,
) => void) {
  const {
    getKey,
    rowMeta,
  } = getContext(contextKey) as TableContext

  return (
    rowAttributes: RowAttributes,
    key: string,
    value: any
  ) : void => {
    const rowId = getKey(rowAttributes)
    rowMeta.updateProperty(rowId, key, value)
    if (key === ROW_META_STATUS) {
      setTimeout(
        () => rowMeta.updateProperty(
          rowId,
          ROW_META_STATUS,
          null
        ),
        4000
      );
    }
  }
}