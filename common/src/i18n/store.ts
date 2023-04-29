import {
  get,
  writable,
  Writable,
} from 'svelte/store'

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

  let locale : string = LOCALE_ENGLISH_UNITED_KINGDOM

  if (!data[locale]) {
    data[locale] = {}
  }
  let currentTranslations: Translation = data[locale]

  const add = (params: AddParameters) : void => {
    const { locale: selectedLocale = locale, translations } = params
    update((currentValues: Translations) => {
      for (const key in translations) {
        currentValues[selectedLocale][key] = translations[key]
      }
      return currentValues
    })
  }

  return {
    add,
    addMultipleLocales: (translations: Translations) : void => {
      let key: typeof ALLOWED_LOCALES[number]
      for (key in translations) {
        add({
          translations: translations[key],
          locale: key
        })
      }
    },
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

export const i18n = instantiate()