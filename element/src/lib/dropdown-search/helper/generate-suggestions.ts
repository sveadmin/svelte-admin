import type {
  OptionStore,
} from '$lib/types.js'

export const prepareGenerateSuggestions = (
  values: OptionStore,
  suggestionsLength: number = 10,
  isEmptyAllowed: boolean = false
): ((
    value?: string | number | null
  ) => Array<string | null>) => {
    return (value?: string | number | null) => {
      const valueString = (value) ? value.toString().toLowerCase() : null
      const valuePieces : string[] = valueString?.split(':', 2) ?? []
      const hardMatch : Array<string | null> = []
      const softMatch: Array<string | null> = []
      const propertyMatch: Array<string | null> = []

      lookup: for (const [optionValue, option] of values.optionsByValue) {
        if (hardMatch.length >= suggestionsLength) {
          continue lookup
        }
        if (!valueString) {
          //EMPTY match
          hardMatch.push(optionValue.toString());
          continue lookup
        }
        if (optionValue.toString().toLowerCase() === valueString) {
          //ID match
          hardMatch.unshift(optionValue.toString());
          continue lookup
        }
        let foundAt: number = option.search.indexOf(valueString)
        if (option
          && foundAt !== -1) {
          if (foundAt === 0) {
            //BEGINNING OF LABEL match
            hardMatch.push(optionValue.toString());
            continue lookup
          } 
          if (foundAt < option.label.length) {
            //IN LABEL match
            softMatch.push(optionValue.toString());
            continue lookup
          }
          //IN PROPERTY match
          propertyMatch.push(optionValue.toString());
          continue lookup
        }

        if (optionValue.toLowerCase().substring(0, valueString.length) === valueString) {
          //PARTIAL ID match
          hardMatch.push(optionValue.toString());
          continue lookup
        }
        if (valuePieces.length === 2
          && option?.properties
          && option?.properties[valuePieces[0]]
          && option?.properties[valuePieces[0]].toString().indexOf(valuePieces[1]) > -1) {
          //SPECIFIC PROPERTY match
          propertyMatch.push(optionValue.toString());
        }
      }
      if (hardMatch.length < suggestionsLength) {
        hardMatch.push(...softMatch.slice(0, suggestionsLength - hardMatch.length))
      }
      if (hardMatch.length < suggestionsLength) {
        hardMatch.push(...propertyMatch.slice(0, suggestionsLength - hardMatch.length))
      }
      if (isEmptyAllowed) {
        hardMatch.push(null)
      }
      return hardMatch
  }
}