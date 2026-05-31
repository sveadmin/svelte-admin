import type {
  SuggestionHandlerProps,
} from '../types.js'

export const prepareSuggestionHandler = (parameters: SuggestionHandlerProps) : ((event?: KeyboardEvent) => boolean) => {
  const {
    keyMap,
    suggestions,
    onKeyUp,
    options,
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
      suggestions.list = options.generateSuggestions(value)

      if (options.settings?.suggestionsLength === -1) {
        const bestMatch = options.generateSuggestions(value, 1)?.[0]
        suggestions.selected = (value
          && bestMatch)
          ? suggestions.list.indexOf(bestMatch)
          : -1
      } else {
        suggestions.selected = -1
      }

      if (typeof onKeyUp === 'function') {
        onKeyUp(event)
      }
    }
    return true
  }
}