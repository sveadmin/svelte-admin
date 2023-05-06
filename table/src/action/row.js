import { getContext } from 'svelte'
import { isLoading } from '../../../../store/loader'
import { prepareUpdateMeta } from '../handler'

export const prepareRowAction = function (contextKey) {
  const context = getContext(contextKey)
  const getKey = context.getKey
  const updateMeta = prepareUpdateMeta(contextKey)

  let data = [],
    rowMeta = {},
    rowSelection = {}
    

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
    isLoading.set(true)
    await Promise.all(rowActions.map(callback => callback()))
    isLoading.set(false)
    if (finalCallback) {
      finalCallback()
    }
  }
}