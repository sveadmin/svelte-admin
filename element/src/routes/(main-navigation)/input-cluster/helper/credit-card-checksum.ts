import type {
  IsValid,
  Rune,
} from '@sveadmin/common'

export function creditCardChecksum(ccNumber: Rune<string[]>) : IsValid {
  const flatCcNumber: string = ccNumber.value.reduce((aggregator: string, ccPiece: string) => {
    aggregator += ccPiece
    return aggregator
  }, '')

  if (flatCcNumber.length !== 16) {
    return {
      message: 'Credit card number has to be 16 characters long',
      error: 'CC_INVALID_LENGTH',
      valid: false,
      validatedValue: flatCcNumber,
    }
  }

  let isDigitToBeDoubled = true

  const sum: number = flatCcNumber.split('').reduce((aggregator, char) => {
    let digit: number = parseInt(char)

    if (isDigitToBeDoubled) {
      if ((digit *= 2) > 9) {
        digit -= 9
      }
    }

    isDigitToBeDoubled = !isDigitToBeDoubled
    return aggregator + digit
  }, 0)

  if (sum % 10 !== 0) {
    return {
      message: 'Credit card number checksum failed',
      error: 'CC_INVALID_CHECKSUM',
      valid: false,
      validatedValue: flatCcNumber,
    }
  }

  return {
    valid: true
  }
}