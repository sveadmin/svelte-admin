import { getContext } from 'svelte';

export const getChangeComponent = function (dispatch, contextKey) {
  const context = getContext(contextKey)

  const components = context.components,
    getKey = context.getKey

  let settings


  context.settings.subscribe(value => settings = value)

  return (
    component,
    rowAttributes,
    columnIndex
  ) => {
    dispatch('componentChanged', {
      column: settings.columns[columnIndex],
      id: getKey(rowAttributes)
    })
    components.update(
      (currentValue) => {
        currentValue[getKey(rowAttributes)][columnIndex] = component
        return currentValue
      }
    )
  }
}