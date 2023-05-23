import { getContext, SvelteComponent } from 'svelte'

import {
  EventDispatcher,
} from '@sveadmin/common'

import {
  RowAttributes,
  SettingsData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const getChangeComponent = function (dispatch: EventDispatcher, contextKey: TableContextKey) {
  const context = getContext(contextKey) as TableContext

  const {
    components,
    getKey
   } = context

  let settings : SettingsData


  context.settings.subscribe(value => settings = value)

  return (
    component: typeof SvelteComponent,
    rowAttributes: RowAttributes,
    columnIndex: number
  ) => {
    const rowId = getKey(rowAttributes)

    dispatch('componentChanged', {
      column: settings[columnIndex],
      id: rowId
    })
    components.setByIndex(
      rowId,
      columnIndex,
      component
    )
  }
}