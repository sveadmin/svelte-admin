import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextInputWrappedProps } from '$lib/text-input/index.js'

export const cityConfig : TextInputWrappedProps = {
  placeholder: 'City',
  validators: createFieldValidator([requiredValidator()]),
}