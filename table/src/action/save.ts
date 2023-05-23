import { prepareUpdateMeta } from '../handler/index.js'

import {
  Action,
  Row,
  SaveActionParameters,
} from '../types.js'

export const getSaveAction = function (parameters: SaveActionParameters) : Action {
  const {
    action,
    contextKey,
    errorCallback = null,
    finalCallback = null,
    successCallback = null,
  } = parameters

  const updateMeta = prepareUpdateMeta(contextKey)

  return {
    label: 'Save',
    finalCallback: finalCallback,
    callback: async (row: Row) => {
      updateMeta(row.attributes, 'saving', true)
      updateMeta(row.attributes, 'selected', false)
      if (await action(row)) {
        updateMeta(row.attributes, 'dirty', false)
        updateMeta(row.attributes, 'status', 'ok')
        if (successCallback) {
          successCallback(row)
        }
      } else {
        updateMeta(row.attributes, 'status', 'failed')
        if (errorCallback) {
          errorCallback(row)
        }
        return false
      }
      updateMeta(row.attributes, 'saving', false)
      return true
    }
  }
}