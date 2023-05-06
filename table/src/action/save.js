import { prepareUpdateMeta } from '../handler'

export const prepareSaveAction = function ({
  action,
  contextKey,
  errorCallback = null,
  finalCallback = null,
  successCallback = null,
}) {
  const updateMeta = prepareUpdateMeta(contextKey)

  return {
    label: 'Save',
    finalCallback: finalCallback,
    callback: async (row) => {
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