export const prepareGenerateSuggestions = (
  suggestionsLength: number = 10,
  isEmptyAllowed: boolean = false
): ((
    value: string | number,
    lookupTable: {[key: string]: string}
  ) => string[]) => {
    return (value, lookupTable) => {
      const valueString = (value) ? value.toString().toLowerCase() : null
      const suggestions = lookupTable[valueString] ? [valueString] : []
      for (const id in lookupTable) {
        if ((!valueString
              || (lookupTable[id]
                && lookupTable[id].toLowerCase().indexOf(valueString) !== -1))
            && suggestions.indexOf(id) === -1
            && suggestions.length < suggestionsLength) {
          suggestions.push(id.toString());
        }
      }
      if (suggestions.length < suggestionsLength) {
        for (const id in lookupTable) {
          if (valueString
              && id.toLowerCase().substring(0, valueString.length) === valueString
              && suggestions.indexOf(id) === -1
              && suggestions.length < suggestionsLength) {
            suggestions.push(id.toString());
          }
        }
      }
      if (isEmptyAllowed) {
        suggestions.push(null)
      }
      return suggestions
  }
}