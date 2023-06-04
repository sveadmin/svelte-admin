import {
  getContext
} from 'svelte'

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

  let componentData: ComponentData

  components.subscribe(currentValue => componentData = currentValue)

  return async (
    value: any,
    componentType: CellComponent
  ) : Promise<void> => {
    const columnIndex = settings.getColumnPosition(field)
    data.update(allData => {
      return allData.map(
        dataRow => {
          if (componentType
            && componentData[dataRow.attributes.id][columnIndex] !== componentType) {
            return dataRow
          }
          dataRow.attributes[field] = value
          return dataRow
        }
      )
    })
  }
}