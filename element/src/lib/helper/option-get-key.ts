import type {
  Option,
} from '$lib/types.js'

export function optionGetKey(option: Option) : string {
  return option.value.toString()
}