import {
  getContext
} from 'svelte'

import {
  get, 
} from 'svelte/store'

import {
  CellComponent,
  ComponentData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareSetAllFieldValues = function (contextKey: TableContextKey, field: string) : ((value: any, componentType: CellComponent) => Promise<void>) {
  const {
    components,
    data,
    settings,
  } = getContext(contextKey) as TableContext

  const columnIndex = settings.getColumnPosition(field)

  let componentData: ComponentData

  components.subscribe(currentComponent => {componentData = currentComponent})

  return async (
    value: any,
    componentType: CellComponent
  ) : Promise<void> => {
    data.update(allData => {
      return allData.map(
        dataRow => {
          if (componentType
            && componentData[dataRow.attributes.id][columnIndex]) {
            const currentType = get(componentData[dataRow.attributes.id][columnIndex])
            if (currentType !== componentType) {
              return dataRow
            }
          }
          dataRow.attributes[field] = value
          return dataRow
        }
      )
    })
  }
}