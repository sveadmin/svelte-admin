import type {
  SuggestionHandlerProps,
} from '../types.js'

export const prepareSuggestionHandler = (parameters: SuggestionHandlerProps) => {
  const {
    keyMap,
    suggestions,
    generateSuggestions,
    onKeyup,
    valueHelper,
  } = parameters

  return function (event: KeyboardEvent) {
    const target = event.target as HTMLInputElement
    const value = target.value
    const key = event.key
    if (key) {
      if (keyMap[key]) {
        if (!keyMap[key](event)) {
          return
        }
      }

      valueHelper.current = value
      suggestions.list = generateSuggestions(value)
      suggestions.selected = -1;
      if (typeof onKeyup === 'function') {
        onKeyup(event)
      }
    }
  }
}