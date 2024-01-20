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
  Action,
  DataData,
  OriginalDataData,
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
    originalData: OriginalDataData = {},
    rowMeta: RowMetaData = {},
    rowSelection: RowSelectionData = {}
    

  context.data.subscribe(value => data = value)
  context.originalData.subscribe(value => originalData = value)
  context.rowMeta.subscribe(value => rowMeta = value)
  context.rowSelection.subscribe(value => rowSelection = value)

  return async function(
    action: Action,
    event: Event
  ) {
    const {
      callback,
      failCallback,
      finalCallback,
      successCallback,
    } = action
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    const rowActions = []
    if (!rowSelection.allChecked
      && !rowSelection.partiallyChecked) {
        return
      }
    for (const row of data) {
      if (rowMeta[getKey(row.attributes)].selected) {
        rowActions.push(async () => {
          updateMeta(row.attributes, 'saving', true)
          if(await callback(row, originalData[getKey(row.attributes)])) {
            updateMeta(row.attributes, 'status', 'ok')
            if (successCallback) {
              successCallback(row)
            }
          } else {
            updateMeta(row.attributes, 'status', 'failed')
            if (failCallback) {
              failCallback(row)
            }
          }
          updateMeta(row.attributes, 'saving', false)
        })
      }
    }
    if (rowActions.length === 0) {
      return
    }
    const actionKey = loader.registerTask();
    await Promise.all(rowActions.map(callback => callback()))
    loader.unregisterTask(actionKey)
    if (finalCallback) {
      finalCallback()
    }
  }
}