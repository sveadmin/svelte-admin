import {
  createFieldValidator,
} from '@sveadmin/common'

import type {
  ValidatorStore,
} from '@sveadmin/common'

import type {
  SveadminComponent,
} from '$lib/types.js'

export function prepareValidatorParser(nestedValidators: {[key: number] : ValidatorStore}) {
  return (
    currentPart: SveadminComponent<any>,
    index: number
  ) : SveadminComponent<any> => {
    if (currentPart?.input?.config?.validators) {
      nestedValidators[index] = createFieldValidator(currentPart.input.config.validators)
      delete currentPart.input.config.validators //This is needed so subsequent instances of the same validator do not get the same result
    }

    return currentPart
  }

}