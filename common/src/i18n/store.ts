import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  prepareAdd,
  prepareAddMultiple,
} from './action/index.js'

import {
  DEFAULT_LOCALE,
} from './config.js'

import {
  AddParameters,
  ALLOWED_LOCALES,
  LOCALE_ENGLISH_UNITED_KINGDOM,
  Translation,
  Translations,
  TranslationStore,
} from './types.js'

function instantiate() : TranslationStore {
  const store: Writable<Translations> = writable({})
  const {subscribe, set, update} = store
  const data = get(store)

  let locale : string = (ALLOWED_LOCALES.indexOf(DEFAULT_LOCALE) > -1)
    ? DEFAULT_LOCALE
    : LOCALE_ENGLISH_UNITED_KINGDOM

  if (!data[locale]) {
    data[locale] = {}
  }
  let currentTranslations: Translation = data[locale]

  return {
    add: prepareAdd(locale, store),
    addMultipleLocales: prepareAddMultiple(locale, store),
    locale: () : string => {
      return locale
    },
    set,
    setLocale: (newLocale: typeof ALLOWED_LOCALES[number]) : void => {
      const data = get(store)
      locale = newLocale
      if (!data[locale]) {
        data[locale] = {}
      }
      currentTranslations = data[locale]
    },
    subscribe,
    t: (key: string) : string => {
      return currentTranslations
        && currentTranslations[key]
        || '${' + key + '}(' + locale + ')'
    },
    update
  }
}

export const i18n: TranslationStore = instantiate()