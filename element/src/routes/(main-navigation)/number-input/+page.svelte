<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import Number from '$lib/number-input/examples/number.ts.svelte'
  import NumberWithCluster from '$lib/number-input/examples/number-with-cluster.ts.svelte'
  import NumberValidators from '$lib/number-input/examples/number-validators.ts.svelte'
  import NumberRange from '$lib/number-input/examples/number-range.ts.svelte'
</script>
<Accordion>
  {#snippet title()}
    <h2>Normal number input</h2>
  {/snippet}
  <Number />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Number using cluster to edit decimal and fraction separately</h2>
  {/snippet}
  <NumberWithCluster />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Number validators</h2>
  {/snippet}
  <NumberValidators />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Number range with connected inputs</h2>
  {/snippet}
  <NumberRange />
</Accordion>