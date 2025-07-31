import {
  i18n,
} from '@sveadmin/common'

import type {
  AllowedDisplayMode,
  OptionStore,
} from '$lib/types.js'

export function prepareGetDisplayValue (displayMode: AllowedDisplayMode, values: OptionStore) : (value: string | number | null) => string {
  return (value: string | number | null) : string => {
    if (!value
      || value === null) {
      return ''
    }
    const optionById = values.optionsById.get(value.toString())
    switch (displayMode) {
      case 'value':
        return value.toString()
      case 'label':
        return (optionById)
          ? values.options[optionById?.index]?.value
          : value.toString()
      case 'combo':
        if (value) {
          return value + ' - ' + ((optionById)
            ? values.options[optionById?.index]?.value
            : i18n.t('DropdownNewValue'))
        } else {
          return null
        }
    }
    return value.toString()
  }
}