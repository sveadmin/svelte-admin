import { getContext } from "svelte"

export const getSetAllFieldValues = function (contextKey, field) {
  const {
    components,
    data,
    settings,
  } = getContext(contextKey)

  let componentData

  components.subscribe(currentValue => componentData = currentValue)

  return async (
    value,
    componentType = null
  ) => {
    const columnIndex = settings.getColumnId(field)
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