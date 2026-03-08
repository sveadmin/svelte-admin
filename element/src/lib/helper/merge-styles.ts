import { normalizeArray } from './normalize-array.js'

export const mergeStyles = (styleList: string | string[] | undefined, additionalStyleList?: string | string[]) => {
  if (!styleList) {
    styleList = []
  }
  // Spread is needed when classList is an array defined as $state,
  // in which case this classes.push would try to manipulate the $state outside of the safe scope
  // resulting in a svelte unsafe mutation error
  const styles = [...normalizeArray(styleList, ';')]

  const styleDefinitions = styles.map(style => {
    const stylePieces = style.split(':')
    return stylePieces[0].trim()
  })
  normalizeArray(additionalStyleList, ';').map(newStyle => {
    const stylePieces = newStyle.split(':')
    const styleDefinition = stylePieces[0].trim()
    const styleIndex = styleDefinitions.indexOf(styleDefinition)

    if (styleIndex === -1) {
      styles.push(newStyle)
      styleDefinitions.push(styleDefinition)
    // } else { // This is not used to make it compatible with the highest significance in the propertyMerger being on the left
    //   styles[styleIndex] = newStyle
    }
  })

  return styles
}