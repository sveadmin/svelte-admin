import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextInputWrappedProps } from '$lib/text-input/index.js'

export const firstNameConfig : TextInputWrappedProps = {
  data: {
    testid: 'first-name',
  },
  placeholder: 'First name',
  validators: createFieldValidator([requiredValidator()]),
}