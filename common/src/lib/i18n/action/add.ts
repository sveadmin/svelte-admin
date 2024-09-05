import {
  Writable,
} from 'svelte/store'

import {
  AddParameters,
  Locale, 
  Translations,
} from '../types.js'

export function prepareAdd (defaultLocale: Locale, store: Writable<Translations>) {
  const { update } = store
  return (params: AddParameters) : void => {
    const { locale = defaultLocale, translations } = params
    update((currentValues: Translations) => {
      for (const key in translations) {
        currentValues[locale][key] = translations[key]
      }
      return currentValues
    })
  }
}