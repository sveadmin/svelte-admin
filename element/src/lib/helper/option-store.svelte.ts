import type {
  Option,
  OptionData,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

function getOptionsByValue(options: Option[] = []) : Map<string, OptionIndexed> {
  const optionsByValue: Map<string, OptionIndexed> = new Map()
  options.forEach((option: Option, index: number) => {
    if (!optionsByValue.get(option.value)) {
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
        option.value,
        newOption
      )
    }
  })

  return optionsByValue
}

export function createOptionStore(options: Option[]): OptionStore {
  const store: OptionData = $state({
    options,
    optionsByValue: getOptionsByValue(options)
  })

  return {
    add: (option: Option) => {
      const key = option.value.toString()
      if (!store.optionsByValue.get(key)) {
        store.options.push(option)
      } else {
        const index = store.options.findIndex(entry => entry.value === key)
        store.options.splice(index, 1, option)
      }
      store.optionsByValue = getOptionsByValue(store.options)
    },
    get options() { return store.options },
    get optionsByValue() { return store.optionsByValue },
    removeByLabel: (label: string) => {
      const index = store.options.findIndex((option: Option) => option.label == label)
      store.options.splice(index, 1)
      store.optionsByValue = getOptionsByValue(options)
    },
    removeByValue: (value: string) => {
      const index = store.optionsByValue.get(value)?.index
      if (index) {
        store.options.splice(index, 1)
        store.optionsByValue = getOptionsByValue(options)
      }
    },
    set options(options: Option[]) {
      store.options = options
      store.optionsByValue = getOptionsByValue(options)
    },
  }
}