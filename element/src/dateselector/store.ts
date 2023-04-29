import dateFormat from 'dateformat'

import {
  noop,
} from 'svelte/internal'

import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  DATE_PART__DAY,
  DATE_PART__HOUR,
  DATE_PART__MINUTE,
  DATE_PART__MONTH,
  DATE_PART__YEAR,
  DatePart,
  DateSelectorView,
  DATE_SELECTOR__VIEW_DAY_GRID,
  DateSelectorDisplayData,
  DateSelectorDisplayStore,
  DateSelectorDisplayStoreConstructor,
} from './types.js'

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
    displayMonth: '',
    displayYear: '',
    displayValue: null,
    displaySelected: '',
    displaySelectedUTC: '',
    isSelectorVisible: false,
    selected,
    selectedView,
  })

  const { subscribe, update } = store
  const { validate } = validators

  const updateDisplayStrings = (currentValue: DateSelectorDisplayData) : DateSelectorDisplayData => {
    currentValue.displayYear = (currentValue.displayValue)
      ? currentValue.displayValue.getUTCFullYear().toString()
      : ''
    currentValue.displayMonth = (currentValue.displayValue)
      ? '0'.substring(0, 2 - (currentValue.displayValue.getUTCMonth() + 1).toString().length)
        + (currentValue.displayValue.getUTCMonth() + 1).toString()
      : ''
    currentValue.displayDay = (currentValue.displayValue)
      ? '0'.substring(0, 2 - currentValue.displayValue.getUTCDate().toString().length)
        + currentValue.displayValue.getUTCDate().toString()
      : ''
    currentValue.displayHour = (currentValue.displayValue)
      ? currentValue.displayValue.getUTCHours().toString()
      : ''
    currentValue.displayMinute = (currentValue.displayValue)
      ? currentValue.displayValue.getUTCMinutes().toString()
      : ''
    return currentValue
  }

  const setIsSelectorVisible = (isSelectorVisible: boolean) : void => {
    update(currentValue => {
      currentValue.isSelectorVisible = isSelectorVisible
      return currentValue
    })
  }

  const setSelectedView = (view: DateSelectorView) : void => {
    update(currentValue => {
      currentValue.selectedView = view
      return currentValue
    })
  }

  const updateDateParts = (currentValue: DateSelectorDisplayData) : DateSelectorDisplayData => {
      const isValid = validate({value: currentValue.selected})
      if (!isValid.valid) {
        currentValue.selected = new Date()
      }
      currentValue.selectedYear = currentValue.selected.getUTCFullYear()
      currentValue.selectedMonth = currentValue.selected.getUTCMonth() + 1
      currentValue.displaySelected = dateFormat(currentValue.selected, format)
      currentValue.displaySelectedUTC = dateFormat(
        new Date(
          currentValue.selected.getTime()
          + currentValue.selected.getTimezoneOffset() * 60000
        ),
        format
      )
      currentValue.selectedHour = currentValue.selected.getUTCHours()
      currentValue.selectedMinute = currentValue.selected.getUTCMinutes()

      return currentValue
  }

  const setSelectedDate = (date: Date | null) : void => {

  }

  const setSelectedDatePart = (part: DatePart, newValue: number) : void => {
    if (!newValue) {
      return
    }
    update(currentValue => {
      if (!currentValue.selected) {
        currentValue.selected = new Date()
      }

      switch (part) {
        case DATE_PART__DAY:
          currentValue.selected.setUTCDate(newValue)
          break
        case DATE_PART__HOUR:
          currentValue.selected.setUTCHours(newValue)
          break
        case DATE_PART__MINUTE:
          currentValue.selected.setUTCMinutes(newValue)
          currentValue.selected.setUTCSeconds(0)
          break
        case DATE_PART__MONTH:
          currentValue.selected.setUTCMonth(newValue)
          break
        case DATE_PART__YEAR:
          newValue = (newValue < 2000) ? newValue + 2000 : newValue
          currentValue.selected.setUTCFullYear(newValue)
          break
      }
      currentValue = updateDateParts(currentValue)
      return currentValue
    })
  }

  update(currentValue => {
    if (value !== null) {
      currentValue.displayValue = ((value instanceof Date))
        ? value
        : new Date(value)
      currentValue = updateDisplayStrings(currentValue)
      currentValue = updateDateParts(currentValue)
    }
    return currentValue
  })

  return {
    set: noop,
    setIsSelectorVisible,
    setSelectedDate,
    setSelectedDatePart,
    setSelectedView,
    subscribe,
    update: noop,
  }
}