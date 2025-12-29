import {
  i18n,
} from '@sveadmin/common'

import type {
  OptionIndexed,
} from '$lib/types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function getDisplayValueDefault (key?: string | null, option?: OptionIndexed) : string | null {
  if (key) {
    return (option?.value ?? `[${key.toString()}]`) + ' - ' + (option?.label || i18n.t('DropdownNewValue'))
  } else {
    return ''
  }
}