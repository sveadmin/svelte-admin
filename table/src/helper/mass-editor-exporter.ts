import {
  MassEditorColumnSettings,
  MassEditorOptions,
  MASS_EDITOR_TRANSFORMER_JSON,
  RowAttributes,
  MASS_EDITOR_TRANSFORMER_NONE,
  MASS_EDITOR_TRANSFORMER_STRING,
} from '../types.js'

function boundString(
  text: string,
  parameters: MassEditorOptions
) {
  return [parameters.textBoundary,
    text.replaceAll(parameters.lineSeparator, "\\" + parameters.lineSeparator)
      .replaceAll(parameters.textBoundary, "\\" + parameters.textBoundary)
      .replaceAll(parameters.joinString, "\\" + parameters.joinString),
    parameters.textBoundary
  ].join('')
}

function detectTransformer (value) {
  if (typeof value === 'object' ) {
    return MASS_EDITOR_TRANSFORMER_JSON
  } else {
    if (Number.isFinite(+value)) {
      return MASS_EDITOR_TRANSFORMER_NONE
    } else {
      return MASS_EDITOR_TRANSFORMER_STRING
    }
  }
}

export const massEditorExporter = (
  rowAttributes: RowAttributes = {},
  columnsToExport: {[key: string]: MassEditorColumnSettings} = {},
  parameters: MassEditorOptions
) : string => {
  let results : string[] = []
  Object.keys(columnsToExport).forEach(property => {
    if (columnsToExport[property].enabled) {
      switch (columnsToExport[property].transformer) {
        case MASS_EDITOR_TRANSFORMER_JSON:
          if (!!rowAttributes[property]) {
            results.push(boundString(
              JSON.stringify(rowAttributes[property]),
              parameters
            ))
          } else {
            results.push(JSON.stringify(rowAttributes[property])) // for null
          }
          break
        case MASS_EDITOR_TRANSFORMER_NONE:
          results.push(rowAttributes[property])
          break
        case MASS_EDITOR_TRANSFORMER_STRING:
        default:
          results.push(boundString(
              rowAttributes[property].toString(),
              parameters
          ))
      }
    }
  });

  return results.join(parameters.joinString)
} 