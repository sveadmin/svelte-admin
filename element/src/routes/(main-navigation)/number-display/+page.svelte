<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import Number from '$lib/number-display/examples/number.ts.svelte'
  import NumberWrapped from '$lib/number-display/examples/number-wrapped.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Number display</h2>
  {/snippet}
  <Number />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Number display wrapped</h2>
  {/snippet}
  <NumberWrapped />
</Accordion>