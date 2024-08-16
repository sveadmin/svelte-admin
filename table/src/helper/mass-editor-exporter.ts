import {
  RowAttributes,
} from '../types.js'

function boundString(
  text: string,
  joinString: string = ';',
  textBoundary: string = '"'
) {
  return [textBoundary,
    text.replaceAll(textBoundary, "\\" + textBoundary)
      .replaceAll(joinString, "\\" + joinString),
    textBoundary
  ].join('')
}

export const massEditorExporter = (
  rowAttributes: RowAttributes = {},
  columnsToExport: {[key: string]: boolean} = {},
  joinString: string = ';',
  textBoundary: string = '"'
) : string => {
  let results : string[] = []
  Object.keys(columnsToExport).forEach(property => {
    if (columnsToExport[property]) {
      if (typeof rowAttributes[property] === 'object' ) {
        if (!!rowAttributes[property]) {
          results.push(boundString(
            JSON.stringify(rowAttributes[property]),
            joinString,
            textBoundary
          ))
        } else {
          results.push(JSON.stringify(rowAttributes[property])) // for null
        }
      } else {
        if (Number.isFinite(+rowAttributes[property])) {
          results.push(rowAttributes[property])
        } else {
          results.push(boundString(
            rowAttributes[property],
            joinString,
            textBoundary
          ))
        }
      }
    }
  });

  return results.join(joinString)
} 