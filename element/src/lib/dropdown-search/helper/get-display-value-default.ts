import {
  i18n,
} from '@sveadmin/common'

import type {
  OptionIndexed,
} from '$lib/types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function getDisplayValueDefault (value: string | number | null, option?: OptionIndexed) : string | null {
  if (value) {
    return value + ' - ' + (option?.label || i18n.t('DropdownNewValue'))
  } else {
    return ''
  }
}