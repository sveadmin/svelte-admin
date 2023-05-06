import { getContext } from 'svelte'
import { noop } from 'svelte/internal'
import { modal } from '../../../../store/modal'
import Empty from '../../../../view/shared/empty.svelte'
import { getChangeComponent } from'../handler'

export const getMakeEditable = function(contextKey) {
  const context = getContext(contextKey)
  const changeComponent = getChangeComponent(contextKey)

  let settings

  context.settings.subscribe(value => settings = value)

  switch (settings.target) {
    case 'modal':
      return async ({row, columnIndex}) => {
        modal.set({
          component: settings.component ?? Empty,
          parameters: {row, columnIndex, ...settings.parameters},
          listeners: {
            submit: settings.callback ?? noop
          }
        })
      }
    case 'cell':
    default:
      return async ({row, columnIndex}) => {
        changeComponent(
          settings.type ?? 'input-text',
          row.attributes,
          columnIndex
        )
      }
  }
}