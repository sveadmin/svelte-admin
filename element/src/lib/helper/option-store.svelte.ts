import type {
  Option,
  OptionData,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

function getOptionsById(options: Option[] = []) : Map<string, OptionIndexed> {
  const optionsById: Map<string, OptionIndexed> = new Map()
  options.forEach((option: Option, index: number) => {
    if (!optionsById.get(option.id)) {
      const newOption: OptionIndexed = {
        index,
        label: option.value.toString(),
        properties: Object.keys(option?.properties ?? {}).reduce((aggregator: {[key: string] : string}, currentKey: string | number) => {
          aggregator[currentKey.toString().toLocaleLowerCase()] = option?.properties && option?.properties[currentKey].toString().toLocaleLowerCase() || ''
          return aggregator
        }, {}),
        search: option.value.toString().toLowerCase()
      }
      if (option.properties) {
        const properties = Object.keys(option.properties) as (keyof typeof option.properties)[]
        properties.forEach(key => {
          newOption.search += ` ${option.properties && option.properties[key].toLowerCase()}`
        })
      }
      optionsById.set(
        option.id,
        newOption
      )
    }
  })

  return optionsById
}

export function createOptionStore(options: Option[]): OptionStore {
  const store: OptionData = $state({
    options,
    optionsById: getOptionsById(options)
  })

  return {
    add: (option: Option) => {
      const key = option.id.toString()
      if (!store.optionsById.get(key)) {
        store.options.push(option)
      } else {
        const index = store.options.findIndex(entry => entry.id === key)
        store.options.splice(index, 1, option)
      }
      store.optionsById = getOptionsById(store.options)
    },
    get options() { return store.options },
    get optionsById() { return store.optionsById },
    removeById: (id: string) => {
      const index = store.optionsById.get(id)?.index
      if (index) {
        store.options.splice(index, 1)
        store.optionsById = getOptionsById(options)
      }
    },
    removeByValue: (value: string) => {
      const index = store.options.findIndex((option: Option) => option.value == value)
      store.options.splice(index, 1)
      store.optionsById = getOptionsById(options)
    },
    set options(options: Option[]) {
      store.options = options
      store.optionsById = getOptionsById(options)
    },
  }
}