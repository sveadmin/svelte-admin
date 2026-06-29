import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextWrappedInputProps } from '$lib/text-input/index.js'

export const firstNameConfig : TextWrappedInputProps = {
  data: {
    testid: 'first-name',
  },
  placeholder: 'First name',
  validators: createFieldValidator([requiredValidator()]),
}