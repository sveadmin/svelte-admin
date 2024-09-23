import {
  CONFLICTING_TYPE_KEY,
} from '../config.js'

import type {
  MultiLanguageTranslations,
  TranslateVariables,
  TranslationMetaStore,
  Translations,
} from '../types.js'

import {
  prepareTranslate,
} from './translate.js'

export function prepareTranslateToString (store: MultiLanguageTranslations, meta: TranslationMetaStore) {
  const translate = prepareTranslate(store, meta)
  
  return function (
    key: string,
    variables?: TranslateVariables,
    path?: string,
  ) : string {
    const translated = translate(
      key,
      variables,
      path
    )

    return (typeof translated !== 'string')
      ? translated.toString()
      : translated
  }
} 