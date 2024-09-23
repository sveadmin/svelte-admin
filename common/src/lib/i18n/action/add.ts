import {
  CONFLICTING_TYPE_KEY,
} from '../config.js'

import type {
  AddParameters,
  Locale, 
  MultiLanguageTranslations,
  TranslationMetaStore,
  Translations,
} from '../types.js'

function initPath(
  path: string,
  store: MultiLanguageTranslations,
  locale: string,
  pin?: string
) : Translations | null {
    const pathPieces = path.split('.')
    const currentPath: string = pathPieces.shift() as string // pathPieces will always have a value, no point for checking it
    const fullPath: string = [
      pin,
      currentPath
    ].filter(value => value).join('.')
    const currentObject: string | Translations = (pin)
      ? store[locale][pin]
      : store[locale]

    if (typeof currentObject !== 'object') {
      return null
    }

    if (!currentObject[currentPath]) {
      currentObject[currentPath] = {}
      store[locale][fullPath] = currentObject[currentPath]
    }

    if (typeof currentObject[currentPath] !== 'object') {
      currentObject[currentPath] = {
        [CONFLICTING_TYPE_KEY]: currentObject[currentPath],
      }
      store[locale][fullPath] = currentObject[currentPath]
    }

    if (pathPieces.length === 0) {
      return currentObject[currentPath]
    }

    return initPath(
      pathPieces.join('.'),
      store,
      locale,
      fullPath,
    )
}

export function prepareAdd (
  store: MultiLanguageTranslations,
  meta: TranslationMetaStore,
  initLocale: (locale: string) => boolean
) {
  return (params: AddParameters) : void => {
    const { locale = meta.currentLocale, path, translations } = params
    initLocale(locale)
    if (store
      && store[locale]) {
      for (const key in translations) {
        const keyPieces = key.split('.')
        const realKey: string = keyPieces.pop() as string // keyPieces will always have a value, no point for checking it
        let realPath: string | undefined = path
        if (keyPieces.length > 0) {
          realPath = [
            path,
            keyPieces.join('.')
          ].filter(value => value).join('.')
        }

        let objectAtPath: Translations | null = store[locale]
        if (realPath) {
          objectAtPath = initPath(
            realPath,
            store,
            locale,
          ) ?? store[locale]
        }

        if (objectAtPath) {
          objectAtPath[realKey] = translations[key]
        }
      }
    }
  }
}