import type {
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

export function lookupOptions (
  value: string | number | null,
  optionMap: OptionStore | Map<string, OptionIndexed>,
  suggestionsLength: number = 10,
) : Array<string | null> {
  const valueString = (value) ? value.toString().toLowerCase() : null
  const valuePieces : string[] = valueString?.split(':', 2) ?? []
  const hardMatch : Array<string | null> = []
  const softMatch: Array<string | null> = []
  const propertyMatch: Array<string | null> = []
  const options: Map<string, OptionIndexed> = (optionMap instanceof Map)
    ? optionMap
    : optionMap.optionsMapped

  lookup: for (const [optionValue, option] of options) {
    if (suggestionsLength === -1) {
      hardMatch.push(option.key);
      continue lookup
    }
    if (hardMatch.length >= suggestionsLength) {
      continue lookup
    }
    if (!valueString) {
      //EMPTY match
      hardMatch.push(option.key);
      continue lookup
    }
    if (optionValue.toString().toLowerCase() === valueString) {
      //ID match
      hardMatch.unshift(option.key);
      continue lookup
    }
    let foundAt: number = option.search.indexOf(valueString)
    if (option
      && foundAt !== -1) {
      if (foundAt === 0) {
        //BEGINNING OF LABEL match
        hardMatch.push(option.key);
        continue lookup
      } 
      if (foundAt < option.label.length) {
        //IN LABEL match
        softMatch.push(option.key);
        continue lookup
      }
      //IN PROPERTY match
      propertyMatch.push(option.key);
      continue lookup
    }

    if (optionValue.toLowerCase().substring(0, valueString.length) === valueString) {
      //PARTIAL ID match
      hardMatch.push(option.key);
      continue lookup
    }
    if (valuePieces.length === 2
      && option?.properties
      && option?.properties[valuePieces[0]]
      && option?.properties[valuePieces[0]].toString().indexOf(valuePieces[1]) > -1) {
      //SPECIFIC PROPERTY match
      propertyMatch.push(option.key);
    }
  }
  if (hardMatch.length < suggestionsLength) {
    hardMatch.push(...softMatch.slice(0, suggestionsLength - hardMatch.length))
  }
  if (hardMatch.length < suggestionsLength) {
    hardMatch.push(...propertyMatch.slice(0, suggestionsLength - hardMatch.length))
  }

  return hardMatch
}