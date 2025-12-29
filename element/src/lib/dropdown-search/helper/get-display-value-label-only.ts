import type {
  OptionIndexed,
} from '$lib/types.js'

export function getDisplayValueLabelOnly (key?: string | null, option?: OptionIndexed) : string | null {
  if (key) {
    return (option?.label || `[${key.toString()}]`)
  } else {
    return ''
  }
}