<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextDisplayWrapped from '../../../lib/text-display/examples/text-display-wrapped.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
</script>

<Accordion>
  {#snippet title()}
    <h2>Use a wrapping element</h2>
  {/snippet}
  <SimpleTextDisplayWrapped />
</Accordion>