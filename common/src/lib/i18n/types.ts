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

export interface TranslateVariableFunction {
  (
    t: (
      key: string,
      variables?: TranslateVariables,
      path?: string) => string | Translations,
    variables?: TranslateVariables,
    variableKey?: string
  ) : string | Translations
}

export type TranslateVariables = {
  [key: string] : string | number | TranslateVariableFunction
}

export interface TranslationStore {
  add: (params: AddParameters) => void;
  addMultipleLocales: (translations: MultiLanguageTranslations) => void
  get: (
    key: string,
    variables?: TranslateVariables,
    path?: string
  ) => string | Translations;
  locale: () => string,
  setLocale: (locale: Locale) => void;
  t: (
    key: string,
    variables?: TranslateVariables,
    path?: string
  ) => string;
}

export interface TranslationStoreConstructor {
  defaultLocale?: string;
  allowedLocales?: string[];
  fallbackToDefault?: boolean;
}

export interface TranslationMetaStore {
  currentLocale: Locale;
  defaultLocale: Locale;
  fallbackToDefault: boolean;
}