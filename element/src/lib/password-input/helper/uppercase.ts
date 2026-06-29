import {
  hasUppercaseValidator,
  i18n,
} from '@sveadmin/common'

import type {
  PasswordHelper,
} from '../types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function uppercaseHelper() : PasswordHelper {
  return {
    id: 'uppercaseHelper',
    tooltip: i18n.t('uppercaseHelper'),
    validator: hasUppercaseValidator({
      errorMessage: i18n.t('uppercaseHelper'),
    }),
  }
}