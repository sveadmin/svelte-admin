import {
  hasLowercaseValidator,
  i18n,
} from '@sveadmin/common'

import type {
  PasswordHelper,
} from '../types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function lowercaseHelper() : PasswordHelper {
  return {
    id: 'lowercaseHelper',
    tooltip: i18n.t('lowercaseHelper'),
    validator: hasLowercaseValidator({
      errorMessage: i18n.t('lowercaseHelper')
    }),
  }
}