import type {
  NumberOptions,
} from '../types.js'

export function formatNumber (
  value: number | bigint | string,
  locale?: string,
  options?: NumberOptions
) : string {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }

  if (typeof value === 'number'
    && isNaN(value)) {
    return ''
  }
  // @ts-ignore TS NumberFormatOptionsStyleRegistry does not support 'unit' which a valid style
  const numberFormat = new Intl.NumberFormat(locale, options)
  if (options?.removeIntegerPart) {
    let fractionDigits: number
    if (typeof value !== 'number') {
      return ''
    }
    fractionDigits = value - (value & -1)
    if (fractionDigits === 0) {
      return ''
    }
    const formatted = numberFormat.format(fractionDigits)
    const decimalPoint = formatted.indexOf('.')
    return numberFormat.format(fractionDigits).substring(decimalPoint)
  }
  return numberFormat.format(value)


}