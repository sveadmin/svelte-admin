import {
  i18n,
  regexValidator,
} from '@sveadmin/common'

import type {
  PasswordHelper,
} from '../types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function specialCharacterHelper() : PasswordHelper {
  return {
    id: 'specialCharacterHelper',
    tooltip: i18n.t('specialCharacterHelper'),
    validator: regexValidator({
      errorMessage: i18n.t('specialCharacterHelper'),
      pattern: /[\!\"\#\$\%\&\'\(\)\*\+\,-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~]+/
    }),
  }
}