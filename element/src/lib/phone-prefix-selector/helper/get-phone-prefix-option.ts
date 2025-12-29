  import {
    i18n,
  } from '@sveadmin/common'

  import type {
    Option,
    OptionIndexed,
    OptionStore,
  } from '$lib/types.js'

export function prepareGetPhonePrefixOption(phonePrefixData: OptionStore, countryData: OptionStore) {
  return (key?: string) : Option | undefined => {
    const currentPhonePrefix : OptionIndexed | undefined = phonePrefixData.getOption(key)
    const currentCountry : OptionIndexed | undefined = countryData.getOption(currentPhonePrefix?.properties?.iso2?.toString())
    if (!currentPhonePrefix) {
      return
    }
    return {
      label: (currentPhonePrefix.label) ? i18n.t(currentPhonePrefix.label) ?? '' : currentPhonePrefix.value?.toString() ?? '',
      properties: {
        ...currentPhonePrefix.properties,
        flag: currentCountry?.properties?.flag ?? ''
      },
      value: currentPhonePrefix.value ?? '',
    }
  }
}