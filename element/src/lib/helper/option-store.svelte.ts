import type {
  Option,
  OptionData,
  OptionStore,
} from '$lib/types.js'

function getOptionsById(options: Option[] = []) : {[key: string] : {
    index: number;
    search: string;
  }} {
  const optionsById: {[key: string] : {
    index: number;
    search: string;
  }} = {}
  options.forEach((option: Option, index: number) => {
    if (!optionsById[option.id]) {
      optionsById[option.id] = {
        index,
        search: option.value.toString()
      }
      if (option.properties) {
        const properties = Object.keys(option.properties) as (keyof typeof option.properties)[]
        properties.forEach(key => {
          optionsById[option.id].search += ` ${key}:${option.properties && option.properties[key]}`
        })
      }
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
      store.options.push(option)
      store.optionsById = getOptionsById(options)
    },
    get options() { return store.options },
    get optionsById() { return store.optionsById },
    removeById: (id: string) => {
      const index = store.optionsById[id].index
      store.options.splice(index, 1)
      store.optionsById = getOptionsById(options)
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