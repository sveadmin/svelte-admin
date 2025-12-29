import type {
  Option,
} from '$lib/types.js'

export function optionGetKeyLowercase(option: Option) : string {
  return option.value.toString().toLowerCase()
}