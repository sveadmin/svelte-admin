export function prepareGetDecimals (decimals: number = 2 ) : (value : string | number) => string[] {
  return function (value : string | number = '') : string[] {
    if (decimals === 0) {
      return []
    }
    
    const [digitContent = '', decimalContent = ''] = value.toString().split('.')
    let decimalsArray = decimalContent.slice(0, decimals).split('')
    if (decimalsArray.length < decimals) {
      decimalsArray = [...decimalsArray, ...new Array(decimals - decimalsArray.length).fill('0')]
    }

    return decimalsArray
  }
}