import {
  MassEditorColumnSettings,
  MassEditorOptions,
  MASS_EDITOR_TRANSFORMER_JSON,
  MASS_EDITOR_TRANSFORMER_NONE,
  MASS_EDITOR_TRANSFORMER_STRING,
  RowAttributes,
} from '../types.js'

function unboundString(
  text: string,
  parameters: MassEditorOptions
) {
  if (!text
    || text.length < 2) {
    return text
  }
  
  if (text.slice(0, 1) === parameters.textBoundary) {
    text = text.slice(1)
  }
  if (text.slice(-1) === parameters.textBoundary) {
    text = text.slice(0, -1)
  }

  return text.replaceAll("\\" + parameters.textBoundary, parameters.textBoundary)
      .replaceAll('[--JOINSTRING--]', parameters.joinString)
}

export const massEditorImporter = (
  value: string = '',
  columnsToExport: {[key: string]: MassEditorColumnSettings} = {},
  parameters: MassEditorOptions
) : RowAttributes => {
  const rowAttributes : RowAttributes = {}

  value = value.replaceAll('\\' + parameters.joinString, '[--JOINSTRING--]')
  const properties = value.split(parameters.joinString)
  Object.keys(columnsToExport).forEach(property => {
    if (columnsToExport[property].enabled) {
      const currentValue = unboundString(
        properties.shift(),
        parameters
      )
      switch (columnsToExport[property].transformer) {
        case MASS_EDITOR_TRANSFORMER_JSON:
          if (currentValue) {
            rowAttributes[property] = JSON.parse(currentValue)
          } else { //null
            rowAttributes[property] = currentValue
          }
          break
        case MASS_EDITOR_TRANSFORMER_NONE:
        case MASS_EDITOR_TRANSFORMER_STRING:
        default:
          rowAttributes[property] = currentValue
      }
    }
  });

  return rowAttributes
} 