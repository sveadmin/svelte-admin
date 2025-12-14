import type {
  Option,
  OptionData,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

function getOptionsByValue(options: Option[] = [], isIndexCaseSensitive: boolean) : Map<string, OptionIndexed> {
  const optionsByValue: Map<string, OptionIndexed> = new Map()
  options.forEach((option: Option, index: number) => {
    const key = (isIndexCaseSensitive)
      ? option.value.toString()
      : option.value.toString().toLowerCase()
    if (!optionsByValue.get(key)) {
      const newOption: OptionIndexed = {
        index,
        label: option.label.toString(),
        properties: Object.keys(option?.properties ?? {}).reduce((aggregator: {[key: string] : string}, currentKey: string | number) => {
          aggregator[currentKey.toString().toLocaleLowerCase()] = option?.properties && option?.properties[currentKey].toString().toLocaleLowerCase() || ''
          return aggregator
        }, {}),
        search: option.label.toString().toLowerCase()
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
      optionsByValue.set(
        key,
        newOption
      )
    }
  })

  return optionsByValue
}

export function createOptionStore(
  options: Option[],
  isIndexCaseSensitive: boolean = false,
  getDisplayValue?: (value: string | number | null, option?: OptionIndexed) => string | null
) : OptionStore {
  const store: OptionData = $state({
    options,
    optionsByValue: getOptionsByValue(options, isIndexCaseSensitive)
  })

  if (!getDisplayValue) {
    getDisplayValue = (value: string | number | null) => value?.toString() ?? ''
  }

  return {
    add: (option: Option) => {
      const key = option.value.toString()
      if (!store.optionsByValue.get(key)) {
        store.options.push(option)
      } else {
        const index = store.options.findIndex(entry => entry.value === key)
        store.options.splice(index, 1, option)
      }
      store.optionsByValue = getOptionsByValue(store.options, isIndexCaseSensitive)
    },
    getDisplayValue: (value: string | number | null) : string | null => {
      const key = (isIndexCaseSensitive)
        ? value?.toString() ?? ''
        : value?.toString().toLocaleLowerCase() ?? ''
      return getDisplayValue?.(value, store.optionsByValue.get(key)) ?? ''
    },
    getOption: (value: string | number | null) : OptionIndexed | undefined => {
      const key = (isIndexCaseSensitive)
        ? value?.toString() ?? ''
        : value?.toString().toLocaleLowerCase() ?? ''
      return store.optionsByValue.get(key)
    },
    get options() { return store.options },
    get optionsByValue() { return store.optionsByValue },
    removeByLabel: (label: string) => {
      const index = store.options.findIndex((option: Option) => option.label == label)
      store.options.splice(index, 1)
      store.optionsByValue = getOptionsByValue(options, isIndexCaseSensitive)
    },
    removeByValue: (value: string) => {
      const index = store.optionsByValue.get(value)?.index
      if (index) {
        store.options.splice(index, 1)
        store.optionsByValue = getOptionsByValue(options, isIndexCaseSensitive)
      }
    },
    setGetDisplayValue(newGetDisplayValue: (value: string | number | null) => string | null) : void {
      getDisplayValue = newGetDisplayValue
    },
    set options(options: Option[]) {
      store.options = options
      store.optionsByValue = getOptionsByValue(options, isIndexCaseSensitive)
    },
  }
}