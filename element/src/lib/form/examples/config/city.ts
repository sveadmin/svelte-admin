import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextWrappedInputProps } from '$lib/text-input/index.js'

export const cityConfig : TextWrappedInputProps = {
  data: {
    testid: 'city',
  },
  placeholder: 'City',
  validators: createFieldValidator([requiredValidator()]),
}