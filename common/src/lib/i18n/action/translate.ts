import type {
  MultiLanguageTranslations,
  TranslationMetaStore,
  Translations,
} from '../types.js'

export function prepareTranslate (store: MultiLanguageTranslations, meta: TranslationMetaStore) {
  return (
    key: string,
    variables?: {[key: string] : string | (() => string)},
    path?: string
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
console.log(store, realPath, realKey)

    return store
      && store[meta.currentLocale]
      && ((realPath)
        ? (store[meta.currentLocale][realPath] && store[meta.currentLocale][realPath][realKey])
        : store[meta.currentLocale][realKey])
      || '${' + fullKey + '}(' + meta.currentLocale + ')'
  }
} 