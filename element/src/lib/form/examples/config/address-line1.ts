import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextWrappedInputProps } from '$lib/text-input/index.js'

export const addressLine1Config : TextWrappedInputProps = {
  data: {
    testid: 'address-line-1'
  },
  placeholder: 'Address line 1',
  validators: createFieldValidator([requiredValidator()]),
}