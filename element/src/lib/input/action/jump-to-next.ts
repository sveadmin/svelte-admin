import {
  focusNext,
} from '$lib/helper/index.js'

export function prepareJumpToNext(extraCondition?: ((event: KeyboardEvent) => boolean)) : (event: KeyboardEvent) => boolean {
  return (event: KeyboardEvent) : any => {
    const target = event.target as HTMLInputElement
    if (!extraCondition
        || extraCondition(event)
    ) {
      event.preventDefault()
      const next = focusNext(target)
      if (next) {
        next.setSelectionRange(0, 0)
      }
    }
    return true
  }
}