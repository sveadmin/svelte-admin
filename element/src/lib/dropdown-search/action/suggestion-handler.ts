import type {
  SuggestionHandlerProps,
} from '../types.js'

export const prepareSuggestionHandler = (parameters: SuggestionHandlerProps) : ((event?: KeyboardEvent) => boolean) => {
  const {
    keyMap,
    suggestions,
    generateSuggestions,
    onKeyUp,
    valueHelper,
  } = parameters

  return function (event?: KeyboardEvent) : boolean {
    if (!event) {
      return false
    }
    const target = event.target as HTMLInputElement
    const value = target.value
    const key = event.key
    if (key) {
      if (keyMap[key]) {
        if (!keyMap[key](event)) {
          return false
        }
      }
      valueHelper.current = value
      suggestions.list = generateSuggestions(value)
      suggestions.selected = -1;
      if (typeof onKeyUp === 'function') {
        onKeyUp(event)
      }
    }
    return true
  }
}