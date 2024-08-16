import {
  getContext,
} from 'svelte'

import {
  Action,
  MassEditorData,
  TableContext,
  TableContextKey,
} from '../types.js';

export const getMassEditAction = function (contextKey: TableContextKey) : Action {
  let massEditorData: MassEditorData
  
  const {
    massEditor
  } = getContext(contextKey) as TableContext

  massEditor.subscribe(currentValue => {
    massEditorData = currentValue
  })

  return {
    label: 'Mass Edit',
    callback: async () => {
      if (massEditorData
          && massEditorData.display) {
        massEditor.hide()
      } else {
        massEditor.show()
      }
      return true
    }
  }
}