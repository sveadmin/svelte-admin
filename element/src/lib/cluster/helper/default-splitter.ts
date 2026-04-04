import {
  i18n as defaultI18n,
} from '@sveadmin/common'

import type {
  TranslationStore,
} from '@sveadmin/common'

import type {
  SveadminComponent
} from '$lib/types.js'

export function defaultSplitter(
  valueToSplit: any,
  dynamicParts?: SveadminComponent<any>[],
  i18n: TranslationStore = defaultI18n
) : any[] {
  return (Array.isArray(valueToSplit))
    ? [...valueToSplit]
    : [valueToSplit]
}