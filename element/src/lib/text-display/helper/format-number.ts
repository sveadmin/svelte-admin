import type {
  NumberOptions,
} from '../types.js'

export function formatNumber (value: number | bigint, options?: NumberOptions) : string {
  // @ts-ignore TS NumberFormatOptionsStyleRegistry does not support 'unit' which a valid style
  return new Intl.NumberFormat(undefined, options).format(value)
}