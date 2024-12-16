import type {
  NumberOptions,
} from '../types.js'

export function formatNumber (value: number | bigint, options?: NumberOptions) : string {
  return new Intl.NumberFormat(undefined, options).format(value)
}