import type {
  InputMask,
  InputPart,
  TextInputPartObjects,
} from '$lib/text-input/index.js'


import type { MaskPartReducerProps } from '../types.js'

export const prepareMaskPartReducer = (properties: MaskPartReducerProps) => 
{
  const {
    nestedValidators,
  } = properties

  return (aggregator: InputMask, maskPiece: InputPart, index: number) : InputMask => {

    if (maskPiece.hasOwnProperty('validators')) {
      maskPiece = maskPiece as TextInputPartObjects
      if (maskPiece.validators) {
        nestedValidators[index] = maskPiece.validators
        delete maskPiece.validators
      }
    }

    return aggregator
  }
}