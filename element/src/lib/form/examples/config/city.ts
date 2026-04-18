import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextInputWrappedProps } from '$lib/text-input/index.js'

export const cityConfig : TextInputWrappedProps = {
  data: {
    testid: 'city',
  },
  placeholder: 'City',
  validators: createFieldValidator([requiredValidator()]),
}