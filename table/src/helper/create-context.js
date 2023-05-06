import { setContext  } from 'svelte'
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
} from '../store'
import {
  getKey,
} from './get-key'

export function createContext (contextKey, importedValues = {}) {
  const context = {
    actions : importedValues.actions || getActions(),
    components : importedValues.components || getComponents(),
    data : importedValues.data || getData(),
    editors : importedValues.editors || getEditors(),
    filters:  getFilters(importedValues.filters),
    getKey : importedValues.getKey || getKey,
    instance: {},
    meta: getMeta(),
    originalData : importedValues.originalData || getOriginalData(),
    pageDetails : importedValues.pageDetails || getPageDetails(),
    pager : importedValues.pager || getPager(),
    rowKeys : importedValues.rowKeys || getRowKeys(),
    rowMeta : importedValues.rowMeta || getRowMeta(),
    rowSelection : importedValues.rowSelection || getRowSelection(),
    savedSelection : importedValues.savedSelection || getSavedSelection(),
    selection : importedValues.selection || getSelection(),
    settings : importedValues.settings || getSettings(),
    sort : getSort(importedValues.sort),
  }

  setContext(contextKey, context)
}