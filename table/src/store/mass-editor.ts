import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  COMPONENT_NUMBER_DISPLAY,
  COMPONENT_TAG,
} from '@sveadmin/element'

import {
  MASS_EDITOR_TRANSFORMER_JSON,
  MASS_EDITOR_TRANSFORMER_NONE,
  MASS_EDITOR_TRANSFORMER_STRING,
  MassEditorColumnSettings,
  MassEditorData,
  MassEditorOptions,
  MassEditorStore,
  RowAttributes,
  RowMeta,
  SETTING_FIELD,
  SETTING_READ_ONLY,
  SETTING_TYPE,
  SettingsData,
  SettingsList,
} from '../types.js'

import {
  massEditorExporter,
  massEditorImporter,
} from '../helper/index.js'

export const getMassEditor = (importedParameters : MassEditorOptions = {}) : MassEditorStore => {
  const parameters = {
    joinString: importedParameters.joinString ?? ';',
    lineSeparator: importedParameters.lineSeparator ?? '\n',
    nullValue: importedParameters.nullValue ?? 'null',
    textBoundary: importedParameters.textBoundary ?? '"'
  }

  const store : Writable<MassEditorData> = writable({
    columnsToExport: {},
    display: true,
    value: ''
  })
  const {subscribe, set, update} = store

  function addLine (attributes: RowAttributes) : void {
    const data = get(store)
    store.update(currentValue => {
      const lineAsString = massEditorExporter(
        attributes,
        data.columnsToExport,
        parameters
      )
      if (currentValue.value !== '') {
        currentValue.value += parameters.lineSeparator
      }
      currentValue.value += lineAsString
      return currentValue
    })
  }

  function calculateColumns(settings: SettingsData) : void {
    const data = get(store)
    if (Object.keys(data.columnsToExport).length > 0) {
      return
    }
    const columns = settings.reduce((aggregator: {[key: string] : MassEditorColumnSettings}, setting: SettingsList) => {
      let transformer = MASS_EDITOR_TRANSFORMER_STRING
      switch (setting[SETTING_TYPE]) {
        case COMPONENT_NUMBER_DISPLAY:
          transformer = MASS_EDITOR_TRANSFORMER_NONE
          break
        case COMPONENT_TAG:
          transformer = MASS_EDITOR_TRANSFORMER_JSON
          break
      }
      aggregator[setting[SETTING_FIELD]] = {
        enabled: !setting[SETTING_READ_ONLY],
        transformer,
      }
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

  function splitValue() : RowAttributes[] {
    const data = get(store)
    let value = data.value.replaceAll('\\' + parameters.lineSeparator, '[--LINESEPARATOR--]')
    const rows = value.split(parameters.lineSeparator);
    return rows.map((currentRow) => {
      currentRow = currentRow.replaceAll( '[--LINESEPARATOR--]', parameters.lineSeparator)
      return massEditorImporter(
        currentRow,
        data.columnsToExport,
        parameters
      )
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

  function setColumnsToExport(columns: {[key: string] : MassEditorColumnSettings}) : void {
    store.update(currentValue => {
      currentValue.columnsToExport = columns
      return currentValue
    })
  }

  function setColumnToExport(column: string): void {
    store.update(currentValue => {
      if (currentValue.columnsToExport.hasOwnProperty(column)) {
        currentValue.columnsToExport[column].enabled = true
      }
      return currentValue
    })
  }

  function setColumnToNotExport(column: string): void {
    store.update(currentValue => {
      if (currentValue.columnsToExport.hasOwnProperty(column)) {
        currentValue.columnsToExport[column].enabled = false
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
    splitValue,
  }
}