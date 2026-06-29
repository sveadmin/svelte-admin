import {
  i18n,
  shorterThanOrEqualValidator,
} from '@sveadmin/common'

import type {
  PasswordHelper,
} from '../types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function maximumLengthHelper(maximumLength: number) : PasswordHelper {
  return {
    id: 'maximumLengthHelper',
    tooltip: i18n.t('maximumLengthHelper', {length: maximumLength}),
    validator: shorterThanOrEqualValidator({
      base: maximumLength,
      errorMessage: i18n.t('maximumLengthHelper', {length: maximumLength}),
    }),
  }
}