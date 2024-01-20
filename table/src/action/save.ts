import { prepareUpdateMeta } from '../handler/index.js'

import {
  Action,
  Row,
  RowAttributes,
  SaveActionParameters,
} from '../types.js'

export const getSaveAction = function (parameters: SaveActionParameters) : Action {
  const {
    action,
    contextKey,
    errorCallback = null,
    finalCallback = null,
    label = 'Save',
    successCallback = null,
  } = parameters

  const updateMeta = prepareUpdateMeta(contextKey)

  return {
    label,
    finalCallback: finalCallback,
    callback: async (row: Row, originalData: RowAttributes) => {
      updateMeta(row.attributes, 'saving', true)
      updateMeta(row.attributes, 'selected', false)
      if (await action(row, originalData)) {
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