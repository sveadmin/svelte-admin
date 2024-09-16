import {
  ALLOWED_LOCALES,
} from './locales.js'

export interface AllowedLocales {
  ALLOWED_LOCALES: string[]
}

export type Locale = typeof ALLOWED_LOCALES[number] | string

export interface Translations {
  [key: string] : string | Translations;
}

export interface MultiLanguageTranslations {
  [key: Locale] : Translations
}

export interface MultiLanguageText { //This is a collection of translations for one element
  [key: Locale] : string;
}

export interface AddParameters {
  locale?: Locale;
  path?: string;
  translations: Translations;
}

export interface TranslationStore {
  add: (params: AddParameters) => void;
  addMultipleLocales: (translations: MultiLanguageTranslations) => void
  locale: () => string,
  setLocale: (locale: Locale) => void;
  t: (
    key: string,
    variables?: {[key: string] : string | (() => string)},
    path?: string
  ) => string | Translations;
}

export interface TranslationMetaStore {
  currentLocale: Locale;
  defaultLocale: Locale;
  fallbackToDefault: boolean;
}