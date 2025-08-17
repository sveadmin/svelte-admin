import {
  CONFLICTING_TYPE_KEY,
} from '../config.js'

import type {
  MultiLanguageTranslations,
  TranslateVariables,
  TranslationMetaStore,
  Translations,
} from '../types.js'

function getRaw(
  store: MultiLanguageTranslations,
  locale: string,
  realPath: string | undefined,
  realKey: string,
) : string | Translations | undefined{
  const currentPath : string | Translations = (realPath)
      ? store[locale][realPath]
      : store[locale]

  if (typeof currentPath === 'undefined'
    || typeof currentPath === 'string') {
    return
  }

  const currentTranslation = currentPath[realKey]

  return (typeof(currentTranslation) === 'object'
    && currentTranslation[CONFLICTING_TYPE_KEY])
    ? currentTranslation[CONFLICTING_TYPE_KEY]
    : currentTranslation
}

export function prepareTranslate (
  store: MultiLanguageTranslations,
  meta: TranslationMetaStore,
  showPlaceholder: boolean = true,
) {
  const translate = (
    key: string,
    variables?: TranslateVariables,
    path?: string,
  ) : string | Translations => {
    const keyPieces = key.split('.')
    const realKey: string = keyPieces.pop() as string // keyPieces will always have a value, no point for checking it
    let realPath: string | undefined = path
    if (keyPieces.length > 0) {
      realPath = [
        path,
        keyPieces.join('.')
      ].filter(value => value).join('.')
    }
    const fullKey: string = [
      path,
      key
    ].filter(value => value).join('.')

    const placeHolder = (showPlaceholder) ? '${' + fullKey + '}(' + meta.currentLocale + ')' : fullKey
    if (!store
      || !store[meta.currentLocale]) {
      return placeHolder
    }

    let raw = getRaw(
      store,
      meta.currentLocale,
      realPath,
      realKey
    )

    if (typeof raw === 'undefined'
      && meta.fallbackToDefault
      && meta.defaultLocale !== meta.currentLocale) {
      raw = getRaw(
        store,
        meta.defaultLocale,
        realPath,
        realKey,
      )
    }

    if (typeof raw === 'undefined') {
      return placeHolder
    }

    if (!variables
      || Object.keys(variables).length === 0
      || typeof raw !== 'string') {
      return raw
    }
    let processed: string = raw

    Object.keys(variables).forEach((variableKey: string) => {
      const substitutionKey = '${' + variableKey + '}'
      if (typeof(variables[variableKey]) === 'function') {
        let evaluated = variables[variableKey](translate, variables, variableKey)
        if (typeof evaluated === 'object') {
          evaluated = placeHolder
        }
        processed = processed.replaceAll(substitutionKey, evaluated)
      } else {
        processed = processed.replaceAll(substitutionKey, variables[variableKey].toString())
      }
    })

    return processed
  }

  return translate
} 