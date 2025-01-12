import {
  prepareAdd,
  prepareAddMultiple,
  prepareInitLocale,
  prepareTranslate,
  prepareTranslateToString,
} from './action/index.js'

import {
  DEFAULT_LOCALE,
} from './config.js'

import {
  ALLOWED_LOCALES as DEFAULT_ALLOWED_LOCALES,
} from './locales.js'

import type {
  MultiLanguageTranslations,
  TranslationStore,
  TranslationStoreConstructor,
  TranslationMetaStore,
} from './types.js'

export function instantiate(parameters?: TranslationStoreConstructor) : TranslationStore {
  const {
    defaultLocale = DEFAULT_LOCALE,
    allowedLocales,
    fallbackToDefault = true,
  } = parameters || {}

  const store: MultiLanguageTranslations = $state({})

  const ALLOWED_LOCALES = allowedLocales ?? DEFAULT_ALLOWED_LOCALES
  const initLocale = prepareInitLocale(store, ALLOWED_LOCALES)

  const meta: TranslationMetaStore = $state({
    currentLocale: (ALLOWED_LOCALES.indexOf(defaultLocale) > -1)
      ? defaultLocale
      : ALLOWED_LOCALES[0],
    defaultLocale,
    fallbackToDefault,
  })

  initLocale(meta.currentLocale)

  return {
    add: prepareAdd(store, meta, initLocale),
    addMultipleLocales: prepareAddMultiple(store, meta, initLocale),
    get: prepareTranslate(store, meta),
    locale: () : string => {
      return meta.currentLocale
    },
    setLocale: (newLocale: typeof ALLOWED_LOCALES[number]) : void => {
      initLocale(newLocale)
      if (store[newLocale]) {
        meta.currentLocale = newLocale
      }
    },
    t: prepareTranslateToString(store, meta),
  }
}

export const i18n: TranslationStore = instantiate()