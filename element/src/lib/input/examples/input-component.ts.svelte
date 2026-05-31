<script lang="ts">
  import {
    createFieldValidator,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Input,
    InputWrapped,
  } from '$lib/input/index.js'

  import {
    NumberInput,
  } from '$lib/number-input/index.js'

  import type {
    ComponentNumberInput,
  } from '$lib/number-input/index.js'

  const validators = createFieldValidator([requiredValidator()]) //If the same instance is used, the two validator gets updated by both inputs

  const numberConfig : ComponentNumberInput = {
    input: {
      config: {
        fractionDigits: 4,
      }
    },
    component: NumberInput
  }

</script>

<GridLine>
  <h3 class="grid-span-4">
    Using NumberInput
  </h3>
  <span class="grid-span-8">
    <Input areErrorsVisible={true}
      class="grid-span-8"
      componentConfig={{input: numberConfig}}
      label="Number is needed!"
      isValidationPerformedOnLoad={true}
      validators={validators} />
  </span>
</GridLine>
<GridLine>
  <h3 class="grid-span-4">
    Using NumberInput with wrapped display
  </h3>
  <InputWrapped areErrorsVisible={true}
    class="grid-span-8"
    componentConfig={{input: numberConfig}}
    label="Number is needed!"
    isValidationPerformedOnLoad={true}
    validators={validators} />
</GridLine>
