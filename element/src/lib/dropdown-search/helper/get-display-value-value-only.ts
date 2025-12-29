import type {
  OptionIndexed,
} from '$lib/types.js'

export function getDisplayValueValueOnly (key?: string | null, option?: OptionIndexed) : string | null {
  if (key) {
    return option?.value?.toString() ?? `[${key.toString()}]`
  } else {
    return ''
  }
}