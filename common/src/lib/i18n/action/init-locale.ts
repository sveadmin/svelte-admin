import type {
  MultiLanguageTranslations,
} from '../types.js'

export function prepareInitLocale (store: MultiLanguageTranslations, ALLOWED_LOCALES: string[] = []) {
  return (locale: string) : boolean => {
    if (ALLOWED_LOCALES.indexOf(locale) === -1) {
      console.error(`${locale} is not in the list of allowed locales`)
      return false
    }
    if (!store[locale]) {
      store[locale] = {}
    }
    return true
  }
} 