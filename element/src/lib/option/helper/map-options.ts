import type {
  Option,
  OptionIndexed,
} from '$lib/types.js'

export function mapOptions(options: Option[] = [], getKey: (option: Option) => string) : Map<string, OptionIndexed> {
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