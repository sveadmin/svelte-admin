<script lang="ts">
  import {
    Accordion
  } from '$lib/accordion/index.js'

  import CurrencyInput from '$lib/currency-input/examples/currency-input.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple currency input</h2>
  {/snippet}
  <CurrencyInput />
</Accordion>
