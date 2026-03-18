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
  // @ts-ignore TS NumberFormatOptionsStyleRegistry does not support 'unit' which is a valid style
  const numberFormat = new Intl.NumberFormat(locale, options)
  if (options?.removeIntegerPart) {
    let fractionDigits: number
    if (typeof value !== 'number') {
      return ''
    }
    fractionDigits = value - (value & -1)
    const formatted = numberFormat.format(fractionDigits)
    if (fractionDigits === 0) {
      const isUnitAttached = formatted.indexOf(' ')
      return (isUnitAttached > -1)
        ? formatted.substring(isUnitAttached)
        : ''
    }
    return formatted.substring(formatted.indexOf('.'))
  }
  return numberFormat.format(value)
}