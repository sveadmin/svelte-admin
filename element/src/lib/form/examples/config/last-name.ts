import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextWrappedInputProps } from '$lib/text-input/index.js'

export const lastNameConfig : TextWrappedInputProps = {
  data: {
    testid: 'last-name',
  },
  placeholder: 'Last name',
  validators: createFieldValidator([requiredValidator()]),
}