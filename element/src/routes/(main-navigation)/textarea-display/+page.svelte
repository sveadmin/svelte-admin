<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextareaDisplay from '$lib/textarea-display/examples/textarea-display.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple text display</h2>
  {/snippet}
  <SimpleTextareaDisplay />
</Accordion>