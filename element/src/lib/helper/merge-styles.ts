import { normalizeArray } from './normalize-array.js'

export const mergeStyles = (styleList: string | string[], additionalStyleList?: string | string[]) => {
  // Spread is needed when classList is an array defined as $state,
  // in which case this classes.push would try to manipulate the $state outside of the safe scope
  // resulting in a svelte unsafe mutation error
  const styles = [...normalizeArray(styleList, ';')]

  const styleDefinitions = styles.map(style => {
    style.split(':')
    return style.trim()
  })
  normalizeArray(additionalStyleList, ';').map(newStyle => {
    const stylePieces = newStyle.split(':')
    const styleDefinition = stylePieces[0].trim()
    const styleIndex = styleDefinitions.indexOf(styleDefinition)

    if (styleIndex === -1) {
      styles.push(newStyle)
      styleDefinitions.push(styleDefinition)
    } else {
      styles[styleIndex] = newStyle
    }
  })

  return styles
}