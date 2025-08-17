import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextInputWrappedProps } from '$lib/text-input/index.js'

export const zipCodeConfig : TextInputWrappedProps = {
  placeholder: 'ZIP',
  validators: createFieldValidator([requiredValidator()]),
}