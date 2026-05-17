<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import InputLabel from '$lib/input/examples/input-label.ts.svelte'
  import InputValidation from '$lib/input/examples/input-validation.ts.svelte'
  import InputGrid from '$lib/input/examples/input-grid.ts.svelte'
  import InputComponent from '$lib/input/examples/input-component.ts.svelte'

</script>
<Accordion>
  {#snippet title()}
    <h2>Label usage with inputs</h2>
  {/snippet}
  <InputLabel />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Validating inputs</h2>
  {/snippet}
  <InputValidation />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Changing the input layout</h2>
  {/snippet}
  <InputGrid />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Using different components</h2>
  {/snippet}
  <InputComponent />
</Accordion>