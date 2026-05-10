import type {
  ElementInstance,
  ValueHelperStore,
} from '$lib/types.js'

import {
  focusNext,
} from '$lib/helper/index.js'

export const prepareToggleSelectionInProgress = (valueHelper: ValueHelperStore, instance: ElementInstance) => {
  return (event?: Event) : boolean => {
    if (valueHelper.suggestionSelectionInProgress) {
      valueHelper.suggestionSelectionInProgress = false
      valueHelper.inputFocused = false
      instance?.ref?.blur()
      focusNext(instance as HTMLInputElement)
      return true
    } else {
      instance?.ref?.focus()
      valueHelper.suggestionSelectionInProgress = true
      return true
    }
  }
}