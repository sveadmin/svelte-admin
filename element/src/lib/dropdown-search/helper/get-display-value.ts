import {
  i18n,
} from '@sveadmin/common'

import type {
  AllowedDisplayMode,
  OptionStore,
} from '$lib/types.js'

export function prepareGetDisplayValue (displayMode: AllowedDisplayMode, values: OptionStore) : (value: string | number | null) => string | null {
  return (value: string | number | null) : string | null => {
    if (!value) {
      return null
    }
    switch (displayMode) {
      case 'value':
        return value.toString()
      case 'label':
        return values.options[values.optionsById[value]?.index]?.value || value.toString()
      case 'combo':
        if (value) {
          return value + ' - ' + (values.options[values.optionsById[value]?.index]?.value || i18n.t('DropdownNewValue'))
        } else {
          return null
        }
    }
    return value.toString()
  }
}