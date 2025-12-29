import type {
  Option,
} from '$lib/types.js'

export function optionGetPhonePrefixKey(option: Option) : string {
  return option.value.toString() + '-' + option.properties?.iso2
}