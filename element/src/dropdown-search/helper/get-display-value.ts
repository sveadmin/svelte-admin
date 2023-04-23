import {
  i18n,
  LookupTableFunction,
} from '@sveadmin/common'
import {
  AllowedDisplayMode
} from '../types'

export function prepareGetDisplayValue (displayMode: AllowedDisplayMode, getLookupTable: LookupTableFunction) : (value: string) => string {
  return (value: string) : string => {
    const lookupTable = getLookupTable()
    switch (displayMode) {
      case 'value':
        return value
      case 'label':
        return lookupTable[value] || value
      case 'combo':
        if (value) {
          return value + ' - ' + lookupTable[value] || i18n.t('DropdownNewValue')
        } else {
          return null
        }
    }
    return value
  }
}