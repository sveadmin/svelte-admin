<script lang="ts">
  import {
    createFieldValidator,
    requiredValidator,
  } from '@sveadmin/common'


  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    InputWrapped,
  } from '$lib/input/index.js'

  const validators = createFieldValidator([requiredValidator()]) //If the same instance is used, the two validator gets updated by both inputs
</script>

<GridLine>
  <h3 class="grid-span-4">
    Default input grid layout
  </h3>
  <InputWrapped areErrorsVisible={true}
    class="grid-span-8"
    label="This is needed!"
    isValidationPerformedOnLoad={true}
    validators={validators} />
</GridLine>
<GridLine>
  <h3 class="grid-span-4">
    Stacked on top
  </h3>
  <InputWrapped areErrorsVisible={true}
    class="grid-span-8"
    label="This is needed!"
    isValidationPerformedOnLoad={true}
    style="grid-template-areas: 'label' 'error' 'input'; grid-template-columns: 1fr"
    validators={validators} />
</GridLine>
<GridLine>
  <h3 class="grid-span-4">
    Error next to label
  </h3>
  <InputWrapped areErrorsVisible={true}
    class="grid-span-8"
    label="This is needed!"
    isValidationPerformedOnLoad={true}
    style="grid-template-areas: 'label error' 'input input'"
    validators={validators} />
</GridLine>
