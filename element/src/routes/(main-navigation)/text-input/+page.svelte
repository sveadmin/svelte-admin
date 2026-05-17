<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'
  import TextInputSimple from '$lib/text-input/examples/text-input-simple.svelte'
  import TextInputValidation from '$lib/text-input/examples/text-input-validation.svelte'
  import TextInputValueBinding from '$lib/text-input/examples/text-input-value-binding.svelte'
  import TextInputWrapped from '$lib/text-input/examples/text-input-wrapped.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple text input</h2>
  {/snippet}
  <TextInputSimple />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Text input Wrapped</h2>
  {/snippet}
  <TextInputWrapped />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Value binding</h2>
  {/snippet}
  <TextInputValueBinding />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Validation</h2>
  {/snippet}
  <TextInputValidation />
</Accordion>