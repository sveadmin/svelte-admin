import {
  writable,
  Writable,
} from 'svelte/store'

import {
  noop,
} from '@sveadmin/common'

import {
  DATE_SELECTOR__VIEW_DAY_GRID,
  DateSelectorDisplayData,
  DateSelectorDisplayStore,
  DateSelectorDisplayStoreConstructor,
  AllowedDateValue,
} from './types.js'

import {
  preapreGetByDatePart,
  preapreGetSelectedDate,
  prepareSetDisplayValue,
  prepareSetIsSelectorVisible,
  prepareSetSelectedDate,
  prepareSetSelectedDatePart,
  prepareSetSelectedView,
  prepareUpdateDateParts,
  updateDisplayStrings,
} from './action/index.js'

export function getDateDisplayStore(parameters: DateSelectorDisplayStoreConstructor): DateSelectorDisplayStore {
  const {
    format = 'yyyy-mm-dd HH-MM-ss',
    selected,
    selectedView = DATE_SELECTOR__VIEW_DAY_GRID,
    validators,
    value,
  } = parameters

  const store: Writable<DateSelectorDisplayData> = writable({
    displayDay: '',
    displayHour: '',
    displayMinute: '',
    displayMonth: '', //January is 1
    displaySecond: '',
    displayYear: '',
    displayValue: null,
    displaySelected: '',
    displaySelectedUTC: '',
    isSelectorVisible: false,
    selected, //January is 0, for selectedYear January is 1
    selectedView,
  })

  const { subscribe, update } = store
  const { validate } = validators

  const updateDateParts = prepareUpdateDateParts(validate, format)

  value.subscribe((currentInputValue: AllowedDateValue) => {
    update(currentValue => {
      if (currentInputValue !== null) {
        currentValue.displayValue = ((currentInputValue instanceof Date))
          ? Object.assign({}, currentInputValue)
          : new Date(currentInputValue)
      } else {
        currentValue.displayValue = null
      }
      currentValue.selected = currentValue.displayValue
      currentValue = updateDisplayStrings(currentValue)
      currentValue = updateDateParts(currentValue)

console.log('currentVALKUE', currentValue)

      return currentValue
    })
  })

  return {
    getByDatePart: preapreGetByDatePart(store),
    getSelectedDate: preapreGetSelectedDate(store),
    set: noop,
    setIsSelectorVisible: prepareSetIsSelectorVisible(store),
    setDisplayValue: prepareSetDisplayValue(store),
    setSelectedDate: prepareSetSelectedDate(store, updateDateParts),
    setSelectedDatePart: prepareSetSelectedDatePart(store, updateDateParts),
    setSelectedView: prepareSetSelectedView(store),
    subscribe,
    update: noop,
  }
}