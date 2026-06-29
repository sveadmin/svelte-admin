import {
  i18n,
  regexValidator,
} from '@sveadmin/common'

import type {
  PasswordHelper,
} from '../types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function numberHelper() : PasswordHelper {
  return {
    id: 'numberHelper',
      tooltip: i18n.t('numberHelper'),
      validator: regexValidator({
        errorMessage: i18n.t('numberHelper'),
        pattern: /[0-9]+/
      }),
  }
}