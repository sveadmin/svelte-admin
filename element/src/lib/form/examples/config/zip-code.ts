import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import type { TextWrappedInputProps } from '$lib/text-input/index.js'

export const zipCodeConfig : TextWrappedInputProps = {
  placeholder: 'ZIP',
  validators: createFieldValidator([requiredValidator()]),
}