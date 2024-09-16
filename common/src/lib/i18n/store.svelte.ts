import {
  prepareAdd,
  prepareAddMultiple,
  prepareInitLocale,
  prepareTranslate,
} from './action/index.js'

import {
  DEFAULT_LOCALE,
} from './config.js'

import {
  ALLOWED_LOCALES as DEFAULT_ALLOWED_LOCALES,
  LOCALE_ENGLISH_UNITED_KINGDOM,
} from './locales.js'

import type {
  AllowedLocales,
  AddParameters,
  Translations,
  MultiLanguageTranslations,
  TranslationStore,
  TranslationMetaStore,
} from './types.js'

export async function instantiate(
  defaultLocale: string = DEFAULT_LOCALE,
  sourceOfLocales: string = './locales.js',
  fallbackToDefault: boolean = true,
) : Promise<TranslationStore> {
  const store: MultiLanguageTranslations = $state({})

  const {
    ALLOWED_LOCALES = DEFAULT_ALLOWED_LOCALES
  } = await import(sourceOfLocales) as AllowedLocales
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
    locale: () : string => {
      return meta.currentLocale
    },
    setLocale: (newLocale: typeof ALLOWED_LOCALES[number]) : void => {
      initLocale(newLocale)
      if (store[newLocale]) {
        meta.currentLocale = newLocale
      }
    },
    t: prepareTranslate(store, meta),
  }
}

export const i18n: TranslationStore = await instantiate()