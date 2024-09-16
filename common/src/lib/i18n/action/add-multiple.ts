import type {
  MultiLanguageTranslations,
  TranslationMetaStore,
} from '../types.js'

import {
    prepareAdd,
} from './add.js'

export function prepareAddMultiple (
  store: MultiLanguageTranslations,
  meta: TranslationMetaStore,
  initLocale: (locale: string) => boolean
) {
    const add = prepareAdd(
      store,
      meta,
      initLocale
    )

    return (translations: MultiLanguageTranslations) : void => {
      let key: string
      for (key in translations) {
        add({
          translations: translations[key],
          locale: key
        })
      }
    }
}