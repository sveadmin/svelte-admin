import type {
  SuggestionHandlerProps,
} from '../types.js'

export const prepareSuggestionHandler = (parameters: SuggestionHandlerProps) => {
  const {
    keyMap,
    suggestions,
    generateSuggestions,
    onKeyUp,
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
console.log('KKKKK', key)
      valueHelper.current = value
      suggestions.list = generateSuggestions(value)
      suggestions.selected = -1;
      if (typeof onKeyUp === 'function') {
        onKeyUp(event)
      }
    }
  }
}