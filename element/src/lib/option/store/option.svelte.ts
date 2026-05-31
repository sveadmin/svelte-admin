import type {
  Option,
  OptionData,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

import {
  lookupOptions,
  mapOptions,
  optionGetKeyLowercase,
} from '../helper/index.js'

export function createOptionStore(
  options: Option[],
  suggestionsLength: number = 10,
  isEmptyAllowed: boolean = false,
  getKey: (option: Option) => string = optionGetKeyLowercase,
  getDisplayValue?: (key?: string | null, option?: OptionIndexed) => string | null
) : OptionStore {

  const store: OptionData = $state({
    options,
    optionsMapped: mapOptions(options, getKey),
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
      store.optionsMapped = mapOptions(store.options, getKey)
    },
    generateSuggestions: (value?: string | number | null, suggestionsLength?: number) : Array<string | null> => {
      const options = lookupOptions(
        value ?? null,
        store.optionsMapped,
        suggestionsLength ?? settings.suggestionsLength
      )
      if (settings.isEmptyAllowed) {
        options.push(null)
      }
      return options
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
    set options(options: Option[]) {
      store.options = options
      store.optionsMapped = mapOptions(options, getKey)
    },
    get optionsMapped() { return store.optionsMapped },
    removeByKey: (value: string) => {
      const index = store.optionsMapped.get(value)?.index
      if (index) {
        store.options.splice(index, 1)
        store.optionsMapped = mapOptions(options, getKey)
      }
    },
    removeByLabel: (label: string) => {
      const index = store.options.findIndex((option: Option) => option.label == label)
      store.options.splice(index, 1)
      store.optionsMapped = mapOptions(options, getKey)
    },
    removeByValue: (value: string) => {
      const index = store.options.findIndex((option: Option) => option.value == value)
      if (index) {
        store.options.splice(index, 1)
        store.optionsMapped = mapOptions(options, getKey)
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
    settings
  }
}