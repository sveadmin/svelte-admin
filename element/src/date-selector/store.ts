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
  DATE_PART__SECOND,
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
    currentValue.displaySecond = (currentValue.displayValue)
      ? currentValue.displayValue.getUTCSeconds().toString()
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
    update(currentValue => {
      currentValue.selected = date
      currentValue = updateDateParts(currentValue)
      return currentValue
    })
  }

  const setSelectedDatePart = (part: DatePart, newValue: number) : void => {
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
          break
        case DATE_PART__MONTH:
          currentValue.selected.setUTCMonth(newValue)
          break
        case DATE_PART__SECOND:
          currentValue.selected.setUTCSeconds(newValue)
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

  const setDisplayValue = (date: Date) : void => {
    update(currentValue => {
      currentValue.displayValue = date
      currentValue = updateDisplayStrings(currentValue)
      return currentValue
    })
  }

  const getSelectedDate = () : Date | null => {
    const { selected } = get(store)
    return selected
  }

  const getByDatePart = (part: DatePart) : string => {
    const {
      displayDay,
      displayHour,
      displayMinute,
      displayMonth,
      displaySecond,
      displayYear,
    } = get(store)
    switch (part) {
      case DATE_PART__DAY:
        return displayDay
      case DATE_PART__HOUR:
        return displayHour
      case DATE_PART__MINUTE:
        return displayMinute
      case DATE_PART__MONTH:
        return displayMonth
      case DATE_PART__SECOND:
        return displaySecond
      case DATE_PART__YEAR:
        return displayYear
    }
    return ''
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
    getByDatePart,
    getSelectedDate,
    set: noop,
    setIsSelectorVisible,
    setDisplayValue,
    setSelectedDate,
    setSelectedDatePart,
    setSelectedView,
    subscribe,
    update: noop,
  }
}