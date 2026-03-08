import { mergeClasses } from './merge-classes.js'
import { mergeStyles } from './merge-styles.js'

export function propertyMerger(...configurations: Array<{[key: string] : any} | undefined>) : {[key: string] : any} {
  const currentProperties : {[key: string] : any} = {}
  for (const configuration of configurations) {
    if (configuration) {
      Object.keys(configuration).map(currentKey => {
        if (currentKey === 'class') {
          currentProperties[currentKey] = mergeClasses(currentProperties[currentKey], configuration[currentKey])
          return
        }
        if (currentKey === 'style') {
          currentProperties[currentKey] = mergeStyles(currentProperties[currentKey], configuration[currentKey])
          return
        }
        if (!currentProperties.hasOwnProperty(currentKey)) {
          currentProperties[currentKey] = configuration[currentKey]
        }
      })
    }
  }

  return currentProperties
}