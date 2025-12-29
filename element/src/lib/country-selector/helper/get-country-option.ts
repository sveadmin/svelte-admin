  import {
    i18n,
  } from '@sveadmin/common'

  import type {
    Option,
    OptionIndexed,
    OptionStore,
  } from '$lib/types.js'

export function prepareGetCountryOption(countryData: OptionStore) {
  return (key?: string) : Option | undefined => {
    const currentCountry : OptionIndexed | undefined = countryData.getOption(key)
    if (!currentCountry) {
      return
    }
    return {
      label: (currentCountry.label) ? i18n.t(currentCountry.label) ?? '' : currentCountry.value?.toString() ?? '',
      properties: currentCountry.properties,
      value: currentCountry.value ?? '',
    }
  }
}