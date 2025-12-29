import type {
  Option,
} from '$lib/types.js'

export function sortByLabel(a: Option, b: Option) {
  const labelA = a.label.toUpperCase()
  const labelB = b.label.toUpperCase()
  if (labelA < labelB) {
    return -1
  }
  if (labelA > labelB) {
    return 1
  }
  return 0
}