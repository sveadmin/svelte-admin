import { normalizeArray } from './normalize-array.js'

export const mergeClasses = (classList: string | string[], additionalClassList?: string | string[]) => {
  // Spread is needed when classList is an array defined as $state,
  // in which case this classes.push would try to manipulate the $state outside of the safe scope
  // resulting in a svelte unsafe mutation error
  const classes = [...normalizeArray(classList, ' ')]
  normalizeArray(additionalClassList, ' ').map(newClass => {
    if (classes.indexOf(newClass) === -1) {
      classes.push(newClass)
    }
  })

  return classes
}