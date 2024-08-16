import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  MassEditorData,
  MassEditorStore,
  RowAttributes,
  SETTING_FIELD,
  SETTING_READ_ONLY,
  SettingsData,
  SettingsList,
} from '../types.js'

import {
  massEditorExporter,
} from '../helper/index.js'

export const getMassEditor = () : MassEditorStore => {
  const store : Writable<MassEditorData> = writable({
    columnsToExport: {},
    display: true,
    value: ''
  })
  const {subscribe, set, update} = store

  function addLine (attributes: RowAttributes) : void {
    const data = get(store)
    store.update(currentValue => {
      const lineAsString = massEditorExporter(attributes, data.columnsToExport)
      if (lineAsString !== '') {
        currentValue.value += lineAsString + '\n'
      }
      return currentValue
    })
  }

  function calculateColumns(settings: SettingsData) : void {
    const data = get(store)
    if (Object.keys(data.columnsToExport).length > 0) {
      return
    }
    const columns = settings.reduce((aggregator: {[key: string] : boolean}, setting: SettingsList) => {
      aggregator[setting[SETTING_FIELD]] = !setting[SETTING_READ_ONLY]
      return aggregator
    }, {})
    setColumnsToExport(columns)
  }

  function hide () : void {
    store.update(currentValue => {
      currentValue.display = false
      return currentValue
    })
  }

  function resetValue () : void {
    store.update(currentValue => {
      currentValue.value = ''
      return currentValue
    })
  }

  function show () : void {
    store.update(currentValue => {
      currentValue.display = true
      return currentValue
    })
  }

  function setColumnsToExport(columns: {[key: string] : boolean}) : void {
    store.update(currentValue => {
      currentValue.columnsToExport = columns
      return currentValue
    })
  }

  function setColumnToExport(column: string): void {
    store.update(currentValue => {
      if (currentValue.columnsToExport.hasOwnProperty(column)) {
        currentValue.columnsToExport[column] = true
      }
      return currentValue
    })
  }

  function setColumnToNotExport(column: string): void {
    store.update(currentValue => {
      if (currentValue.columnsToExport.hasOwnProperty(column)) {
        currentValue.columnsToExport[column] = false
      }
      return currentValue
    })
  }

  return {
    addLine,
    calculateColumns,
    hide,
    set,
    subscribe,
    update,
    resetValue,
    setColumnsToExport,
    setColumnToExport,
    setColumnToNotExport,
    show,
  }
}