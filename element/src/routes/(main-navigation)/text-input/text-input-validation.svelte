<script lang="ts">
  import {
    blockedListValidator,
    createFieldValidator,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    dataParser,
  } from '$lib/helper/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Input,
  } from '$lib/input/index.js'

  import {
    TextInput,
    TextInputWrapped,
  } from '$lib/text-input/index.js'

  const validators = createFieldValidator([requiredValidator()])
  const validatorsWrapped = createFieldValidator([requiredValidator()])

  const blockedValues = ['not-allowed']
  const blockedValuesValidator1 = createFieldValidator([blockedListValidator({get lookupTable () { return blockedValues}})])
  const blockedValuesValidator2 = createFieldValidator([blockedListValidator({get lookupTable () { return blockedValues}})])
  const blockedValuesValidator3 = createFieldValidator([blockedListValidator({get lookupTable () { return blockedValues}})])
</script>

<GridLine>
  <h3 class="grid-span-6">Required value has no error message display, but indicates issue</h3>
  <TextInput class="grid-span-3" {validators} />
  <span class="grid-span-3">{validators?.result?.message}</span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Wrapped text has no error message display, but indicates issue</h3>
  <TextInputWrapped class="grid-span-3" validators={validatorsWrapped} />
  <span class="grid-span-3">{validators?.result?.message}</span>
</GridLine>
<GridLine>
  <h3 class="grid-span-6">Using input can have a built in error display</h3>
  <Input class="grid-span-3" areErrorsVisible={true} validators={createFieldValidator([requiredValidator()])} />
</GridLine>
<GridLine data={{testid: 'on-type-validation'}} >
  <h3 class="grid-span-6">By default, validation is not done when the input is loaded, but each time its value changes</h3>
  <TextInput class="grid-span-3"
    validators={blockedValuesValidator1}
    value="not-allowed" />
  <span class="grid-span-3">{blockedValuesValidator1?.result?.message}</span>
</GridLine>
<GridLine data={{testid: 'on-load-validation'}}>
  <h3 class="grid-span-6">Check enabled on loading the component</h3>
  <TextInput class="grid-span-3"
    isValidationPerformedOnLoad={true}
    validators={blockedValuesValidator2}
    value="not-allowed" />
  <span class="grid-span-3">{blockedValuesValidator2?.result?.message}</span>
</GridLine>
<GridLine data={{testid: 'on-leave-validation'}}>
  <h3 class="grid-span-6">Check only performed on leaving the input and value has changed</h3>
  <TextInput class="grid-span-3"
    
    isValidationPerformedWhileTyping={false}
    validators={blockedValuesValidator3}
    value="not-allowed" />
  <span class="grid-span-3">{blockedValuesValidator3?.result?.message}</span>
</GridLine>