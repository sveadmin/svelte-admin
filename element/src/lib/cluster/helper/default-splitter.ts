import {
  i18n as defaultI18n,
} from '@sveadmin/common'

import type {
  TranslationStore,
} from '@sveadmin/common'

export function defaultSplitter(
  valueToSplit: any,
  dynamicParts?: any,
  i18n: TranslationStore = defaultI18n
) : any[] {
  return (Array.isArray(valueToSplit))
    ? [...valueToSplit]
    : [valueToSplit]
}