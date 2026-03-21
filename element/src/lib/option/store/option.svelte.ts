import type {
  Option,
  OptionData,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

import { optionGetKeyLowercase } from '../helper/index.js'

function getOptionsMapped(options: Option[] = [], getKey: (option: Option) => string) : Map<string, OptionIndexed> {
  const optionsMapped: Map<string, OptionIndexed> = new Map()
  options.forEach((option: Option, index: number) => {
    const key = getKey(option)
    if (!optionsMapped.get(key)) {
      const newOption: OptionIndexed = {
        index,
        key,
        label: option.label.toString(),
        properties: Object.keys(option?.properties ?? {}).reduce((aggregator: {[key: string] : string}, currentKey: string | number) => {
          aggregator[currentKey.toString().toLocaleLowerCase()] = option?.properties && option?.properties[currentKey].toString().toLocaleLowerCase() || ''
          return aggregator
        }, {}),
        search: option.label.toString().toLowerCase(),
        value: option.value
      }

      if (option.properties) {
        const properties = Object.keys(option.properties) as (keyof typeof option.properties)[]
        properties.forEach(key => {
          if (!option.properties
            || !option.properties[key]
            || typeof option.properties[key] !== 'string'
          ) {
            return
          }
          newOption.search += ` ${option.properties[key].toLowerCase()}`
        })
      }
      optionsMapped.set(
        key,
        newOption
      )
    }
  })

  return optionsMapped
}

export function createOptionStore(
  options: Option[],
  suggestionsLength: number = 10,
  isEmptyAllowed: boolean = false,
  getKey: (option: Option) => string = optionGetKeyLowercase,
  getDisplayValue?: (key?: string | null, option?: OptionIndexed) => string | null
) : OptionStore {

  const store: OptionData = $state({
    options,
    optionsMapped: getOptionsMapped(options, getKey),
  })

  const settings = {
    isEmptyAllowed,
    suggestionsLength,
  }


  if (!getDisplayValue) {
    getDisplayValue = (key?: string | null) => key?.toString() ?? ''
  }

  return {
    add: (option?: Option) => {
      if (!option) {
        return
      }
      const key = getKey(option)
      if (!store.optionsMapped.get(key)) {
        store.options.push(option)
      } else {
        const index = store.options.findIndex(entry => entry.value === key)
        store.options.splice(index, 1, option)
      }
      store.optionsMapped = getOptionsMapped(store.options, getKey)
    },
    generateSuggestions: (value?: string | number | null) : Array<string | null> => {
      const valueString = (value) ? value.toString().toLowerCase() : null
      const valuePieces : string[] = valueString?.split(':', 2) ?? []
      const hardMatch : Array<string | null> = []
      const softMatch: Array<string | null> = []
      const propertyMatch: Array<string | null> = []

      lookup: for (const [optionValue, option] of store.optionsMapped) {
        if (hardMatch.length >= settings.suggestionsLength) {
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
      if (hardMatch.length < settings.suggestionsLength) {
        hardMatch.push(...softMatch.slice(0, settings.suggestionsLength - hardMatch.length))
      }
      if (hardMatch.length < settings.suggestionsLength) {
        hardMatch.push(...propertyMatch.slice(0, settings.suggestionsLength - hardMatch.length))
      }
      if (settings.isEmptyAllowed) {
        hardMatch.push(null)
      }
      return hardMatch
    },
    getDisplayValue: (key?: string | null) : string | null => {
      const option = (key)
        ? store.optionsMapped.get(key)
        : undefined
      return getDisplayValue?.(key, option) ?? ''
    },
    getKey,
    getKeyByValue: (value?: string | number | null) : string | undefined => {
      if (!value) {
        return undefined
      }
      const iter = store.optionsMapped.values()
      let currentValue = iter.next(),
        key
      while (!key
        && !currentValue.done
      ) {
        if (currentValue?.value?.value === value) {
          key = currentValue.value.key
        }
        currentValue = iter.next()
      }
      return key
    },
    getOption: (key?: string) : OptionIndexed | undefined => {
      if (!key) {
        return undefined
      }
      return store.optionsMapped.get(key)
    },
    getValue: (key?: string) : string | number => {
      if (!key) {
        return ''
      }
      const option = store.optionsMapped.get(key)
      return option?.value ?? ''
    },
    get options() { return store.options },
    get optionsMapped() { return store.optionsMapped },
    removeByKey: (value: string) => {
      const index = store.optionsMapped.get(value)?.index
      if (index) {
        store.options.splice(index, 1)
        store.optionsMapped = getOptionsMapped(options, getKey)
      }
    },
    removeByLabel: (label: string) => {
      const index = store.options.findIndex((option: Option) => option.label == label)
      store.options.splice(index, 1)
      store.optionsMapped = getOptionsMapped(options, getKey)
    },
    removeByValue: (value: string) => {
      const index = store.options.findIndex((option: Option) => option.value == value)
      if (index) {
        store.options.splice(index, 1)
        store.optionsMapped = getOptionsMapped(options, getKey)
      }
    },
    setGetDisplayValue(newGetDisplayValue: (key?: string | null) => string | null) : void {
      getDisplayValue = newGetDisplayValue
    },
    setIsEmptyAllowed : (isEmptyAllowed: boolean) => {
      settings.isEmptyAllowed = isEmptyAllowed
    },
    setSuggestionsLength : (suggestionsLength: number) => {
      settings.suggestionsLength = suggestionsLength
    },
    set options(options: Option[]) {
      store.options = options
      store.optionsMapped = getOptionsMapped(options, getKey)
    },
  }
}