import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextInputWrappedProps } from '$lib/text-input/index.js'

export const addressLine1Config : TextInputWrappedProps = {
  placeholder: 'Address line 1',
  validators: createFieldValidator([requiredValidator()]),
}