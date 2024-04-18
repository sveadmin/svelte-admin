import {
  Writable,
} from 'svelte/store'

import {
  ALLOWED_LOCALES,
  Locale,
  Translations,
} from '../types.js'

import {
    prepareAdd,
} from './add.js'

export function prepareAddMultiple (defaultLocale: Locale, store: Writable<Translations>) {
    const add = prepareAdd(defaultLocale, store)

    return (translations: Translations) : void => {
      let key: typeof ALLOWED_LOCALES[number]
      for (key in translations) {
        add({
          translations: translations[key],
          locale: key
        })
      }
    }
}