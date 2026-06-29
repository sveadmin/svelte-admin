import {
  i18n,
  longerThanOrEqualValidator,
} from '@sveadmin/common'

import type {
  PasswordHelper,
} from '../types.js'

import * as translations from '../translation/index.js'

i18n.addMultipleLocales(translations)

export function minimumLengthHelper(minimumLength: number) : PasswordHelper {
  return {
    id: 'minimumLengthHelper',
    tooltip: i18n.t('minimumLengthHelper', {length: minimumLength}),
    validator: longerThanOrEqualValidator({
      base: minimumLength,
      errorMessage: i18n.t('minimumLengthHelper', {length: minimumLength}),
    }),
  }
}