import {
  getContext
} from 'svelte'

import {
  loader,
} from '@sveadmin/common'

import {
  prepareUpdateMeta
} from '../handler/index.js'

import {
  DataData,
  RowMetaData,
  RowSelectionData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareRowAction = function (contextKey: TableContextKey) {
  const context = getContext(contextKey) as TableContext
  const getKey = context.getKey
  const updateMeta = prepareUpdateMeta(contextKey)

  let data: DataData = [],
    rowMeta: RowMetaData = {},
    rowSelection: RowSelectionData = {}
    

  context.data.subscribe(value => data = value)
  context.rowMeta.subscribe(value => rowMeta = value)
  context.rowSelection.subscribe(value => rowSelection = value)

  return async function({
    callback,
    failedCallback,
    finalCallback,
    successCallback,
  }) {
    const rowActions = []
    if (!rowSelection.allChecked
      && !rowSelection.partiallyChecked) {
        return
      }
    for (const row of data) {
      if (rowMeta[getKey(row.attributes)].selected) {
        rowActions.push(async () => {
          updateMeta(row.attributes, 'saving', true)
          if(await callback(row)) {
            updateMeta(row.attributes, 'status', 'ok')
            if (successCallback) {
              successCallback(row)
            }
          } else {
            updateMeta(row.attributes, 'status', 'failed')
            if (failedCallback) {
              failedCallback(row)
            }
          }
          updateMeta(row.attributes, 'saving', false)
        })
      }
    }
    if (rowActions.length === 0) {
      return
    }
    loader.set(true)
    await Promise.all(rowActions.map(callback => callback()))
    loader.set(false)
    if (finalCallback) {
      finalCallback()
    }
  }
}