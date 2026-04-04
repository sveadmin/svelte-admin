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
      nestedValidators[index] = currentPart.input.config.validators
      delete currentPart.input.config.validators
    }

    return currentPart
  }

}