import { setContext  } from 'svelte'

import {
  createLoader,
} from '@sveadmin/common'

import {
  getActions,
  getComponents,
  getData,
  getEditors,
  getFilters,
  getMeta,
  getOriginalData,
  getPageDetails,
  getPager,
  getRowKeys,
  getRowMeta,
  getRowSelection,
  getSavedSelection,
  getSelection,
  getSettings,
  getSort,
} from '../store/index.js'

import {
  getKey,
} from './get-key.js'

import {
  TableContext,
  TableContextConstructor,
} from '../types.js'

export function createContext (contextKey: string, importedValues: TableContextConstructor = {}) : void {
  const context = {
    actions : importedValues.actions || getActions(),
    components : importedValues.components || getComponents(),
    data : importedValues.data || getData(),
    editors : importedValues.editors || getEditors(),
    filters:  importedValues.filters || getFilters(),
    getKey : importedValues.getKey || getKey,
    instance: {},
    loader: importedValues.loader || createLoader(),
    meta: getMeta(),
    originalData : importedValues.originalData || getOriginalData(),
    pageDetails : importedValues.pageDetails || getPageDetails(),
    pager : importedValues.pager || getPager(),
    rowKeys : importedValues.rowKeys || getRowKeys(),
    rowMeta : importedValues.rowMeta || getRowMeta(),
    rowSelection : importedValues.rowSelection || getRowSelection(),
    savedSelection : importedValues.savedSelection || getSavedSelection(),
    screens: importedValues.screens,
    selection : importedValues.selection || getSelection(),
    settings : importedValues.settings || getSettings(),
    sort : importedValues.sort || getSort(),
  } as TableContext

  setContext(contextKey, context)
}