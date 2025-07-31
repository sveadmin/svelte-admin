import {
  focusPrevious,
} from '$lib/helper/index.js'

export function prepareJumpToPrevious(extraCondition?: ((event: KeyboardEvent) => boolean)) : (event: KeyboardEvent) => boolean {
  return (event: KeyboardEvent) : boolean => {
    const target = event.target as HTMLInputElement
    if (!extraCondition
        || extraCondition(event)
    ) {
      event.preventDefault()
      const previous = focusPrevious(target)
      if (previous) {
        previous.setSelectionRange(previous.value.length, previous.value.length)
      }
    }
    return true
  }
}