import {
  i18n,
  LookupTable,
} from '@sveadmin/common'

export function generateMonthLookup() : LookupTable {
  return Array.from({length: 12}, (_, i) => i + 1).map(
    (index: number) : {[key: string] : string} => {
      return {
        id: index.toString(),
        value: i18n.t('month' + index)
      }
    }
  )
}