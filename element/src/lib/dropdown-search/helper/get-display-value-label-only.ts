import type {
  OptionIndexed,
} from '$lib/types.js'

export function getDisplayValueLabelOnly (value: string | number | null, option?: OptionIndexed) : string | null {
  if (value) {
    return (option?.label || `[${value.toString()}]`)
  } else {
    return ''
  }
}