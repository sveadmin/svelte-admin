import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextInputWrappedProps } from '$lib/text-input/index.js'

export const lastNameConfig : TextInputWrappedProps = {
  placeholder: 'Last name',
  validators: createFieldValidator([requiredValidator()]),
}