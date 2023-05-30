import { setContext  } from 'svelte'

import {
  createLoader,
} from '@sveadmin/common'

import {
  getActions,
  getComponents,
  getData,
  // getEditors,
  getFilters,
  getMeta,
  getOriginalData,
  getPageDetails,
  getPager,
  getRowKeys,
  getRowMeta,
  getRowSelection,
  getSavedSelection,
  getScreens,
  getSelection,
  getSettings,
  getSort,
} from '../store/index.js'

import {
  getKey,
} from './get-key.js'

import {
  TableContext,
  TableContextKey,
  TableContextConstructor,
} from '../types.js'

export function createContext (contextKey: TableContextKey, importedValues: TableContextConstructor = {}) : TableContext {
  const context = {
    actions : getActions(importedValues.actions),
    components : getComponents({initialValue: importedValues.components}),
    data : importedValues.dataStore || getData({initialValue: importedValues.data}),
    filters:  getFilters({initialValue: importedValues.filters}),
    getKey : importedValues.getKey || getKey,
    instance: {},
    loader: importedValues.loader || createLoader(),
    meta: getMeta(),
    originalData: getOriginalData(),
    pageDetails :  getPageDetails(importedValues.pageDetails),
    pager : getPager(importedValues.pager),
    rowKeys : getRowKeys(),
    rowMeta : getRowMeta({initialValue: importedValues.rowMeta}),
    rowSelection : getRowSelection(importedValues.rowSelection),
    savedSelection : getSavedSelection({initialValue: importedValues.savedSelection}),
    screens: getScreens({initialValue: importedValues.screens}),
    selection : getSelection(importedValues.selection),
    settings : getSettings({initialValue: importedValues.settings}),
    sort : getSort(importedValues.sort),
  } as TableContext

  setContext(contextKey, context)
  return context
}