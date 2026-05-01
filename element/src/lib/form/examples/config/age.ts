import type { NumberInputProps } from '$lib/number-input/index.js'

export const ageConfig : NumberInputProps = {
  childrenConfig: {
    digit: {
      data: {
        testid: 'age-digit',
      }
    }
  },
  data: {
    testid: 'age',
  },
  id: 'age',
  isCopyButtonEnabled: false
}