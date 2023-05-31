import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  noop,
} from 'svelte/internal'

import { orderColumns } from '../helper/index.js'

import {
  createFieldValidator,
  ValidatorStore,
} from '@sveadmin/common'

import {
  COMPONENT_TEXT_DISPLAY,
} from '@sveadmin/element'

import {
  RepeatedColumn,
  SETTING_DISPLAY_NAME,
  SETTING_FIELD,
  SETTING_ID,
  SETTING_REPEATED_COLUMNS,
  SETTING_TYPE,
  SETTING_VALIDATOR,
  Settings,
  SettingsData,
  SettingsList,
  SettingsStore,
  SettingsStoreConstructor,
} from '../types.js'

export const getSettings = (parameters: SettingsStoreConstructor = {}) : SettingsStore => {
  const {
    initialValue = []
  } = parameters
  let columnLookup = {}
  const store: Writable<SettingsData> = writable(initialValue.map(normalizeSetting))
  const {subscribe, update} = store

  const emptyValidator = createFieldValidator([])

  function normalizeSetting (settings: SettingsList) : SettingsList {
    if (!settings[SETTING_ID]) {
      settings[SETTING_ID] = settings[SETTING_FIELD] || 'invalid-settings-field-definition'
    }
    if (!settings[SETTING_TYPE]) {
      settings[SETTING_TYPE] = COMPONENT_TEXT_DISPLAY
    }
    if (!columnLookup[settings[SETTING_ID]]) {
      columnLookup[settings[SETTING_ID]] = Object.keys(columnLookup).length
    }

    return settings
  }

  const add = (column: string, values : {[key: Settings] : any}) : void => {
      values[SETTING_ID] = column
      columnLookup[column] = Object.keys(columnLookup).length
      updateColumn(column, values)
    }

  const getColumn = (column: string) : any => {
    const settings = get(store)
    const columnIndex = getColumnPosition(column)
    return settings[columnIndex]
  }

  const getColumnPosition = (column: string) : number => columnLookup[column]

  const getValidator = (column: string) : ValidatorStore => {
    const settings = get(store)
    const columnPosition: number = getColumnPosition(column)
    return settings[columnPosition].validator ?? emptyValidator
  }

  const populateField = function (aggregator: SettingsData, rowSetting: {[key: Settings]: any}) : SettingsData {
    if (!rowSetting[SETTING_FIELD]) {
      rowSetting[SETTING_FIELD] = rowSetting[SETTING_ID]
    }
    if (rowSetting[SETTING_REPEATED_COLUMNS]) {
      rowSetting[SETTING_REPEATED_COLUMNS].map((repeatedColumn: RepeatedColumn) => {
        aggregator.push({
          ...rowSetting,
          [SETTING_FIELD]: repeatedColumn.key,
          [SETTING_DISPLAY_NAME]: repeatedColumn.label,
        })
      })
    } else {
      aggregator.push(rowSetting)
    }
    return aggregator
  }

  const set = (newValue: SettingsData) : void => {
    newValue = newValue.reduce(populateField, []) as SettingsData
    columnLookup = orderColumns(newValue) // This needs to be before set, so the subscriptions can work with getColumnId
    update(currentValue => {
      return newValue
    })
  }

  const setValidators = (validators: {[key: string] : ValidatorStore}) : void => {
    update((currentValue) =>{
      for (const column in validators) {
        const columnPosition: number = getColumnPosition(column)
        currentValue[columnPosition][SETTING_VALIDATOR] = validators[column] // validators have to be an array of valid validators
      }
      return currentValue
    })
  }

  const updateColumn = (column : string, values: {[key: Settings] : any}) => {
      for (const [key, value] of Object.entries(values)) {
        updateColumnProperty(column, key, value)
      }
    }

  const updateColumnProperty = (
    column: string,
    key: Settings,
    value: any
  ) : void => {
    const columnPosition: number = getColumnPosition(column)
    update((currentValue) => {
      if (!currentValue[columnPosition]) {
        currentValue[columnPosition] = {}
      }
      currentValue[columnPosition][key] = value
      return currentValue
    })
  }

  return {
    add,
    getColumn,
    getColumnPosition,
    getValidator,
    set,
    setValidators,
    subscribe,
    update: noop,
    updateColumn,
    updateColumnProperty,
  }
}