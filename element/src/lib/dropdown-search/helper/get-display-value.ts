import {
  i18n,
} from '@sveadmin/common'

import type {
  AllowedDisplayMode,
  OptionStore,
} from '$lib/types.js'

export function prepareGetDisplayValue (displayMode: AllowedDisplayMode, values: OptionStore) : (value: string | number | null) => string | null {
  return (value: string | number | null) : string | null => {
    if (!value
      || value === null) {
      return ''
    }
    const optionByValue = values.getOption(value)
    switch (displayMode) {
      case 'value':
        return value.toString()
      case 'label':
        return (optionByValue)
          ? values.options[optionByValue?.index]?.label
          : value.toString()
      case 'combo':
        if (value) {
          return value + ' - ' + ((optionByValue)
            ? values.options[optionByValue?.index]?.label
            : i18n.t('DropdownNewValue'))
        } else {
          return null
        }
    }
  }
}