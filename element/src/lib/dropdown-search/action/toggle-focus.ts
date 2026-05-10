import type {
  ElementInstance,
  ValueHelperStore,
} from '$lib/types.js'

import {
  focusNext,
} from '$lib/helper/index.js'

export const prepareToggleFocus = (valueHelper: ValueHelperStore, instance: ElementInstance) => {
  return (event?: Event) : boolean => {
    if (valueHelper.inputFocused) {
      instance?.ref?.blur()
      focusNext(instance as HTMLInputElement)
      return true
    } else {
      instance?.ref?.focus()
      return true
    }
  }
}