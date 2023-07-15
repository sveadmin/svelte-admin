export function prepareGetDigits (digits: number = 7 ) : (value : string | number) => string[] {
  return function (value : string | number = '') : string[] {
    if (digits === 0) {
      return []
    }

    const [digitContent = ''] = value.toString().split('.')
    let digitsArray = digitContent.slice(-1 * digits).split('')
    if (digitsArray.length < digits) {
      digitsArray = [...new Array(digits - digitsArray.length).fill(' '), ...digitsArray]
    }

    return digitsArray
  }
}