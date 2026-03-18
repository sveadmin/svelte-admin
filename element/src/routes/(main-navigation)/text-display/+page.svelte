<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextDisplay from '$lib/text-display/examples/text-display.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextDisplayWrapped from '$lib/text-display/examples/text-display-wrapped.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplayCopy from '$lib/text-display/examples/text-display-copy.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple text display</h2>
  {/snippet}
  <SimpleTextDisplay />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Text display wrapped</h2>
  {/snippet}
  <SimpleTextDisplayWrapped />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Copy value of the container</h2>
  {/snippet}
  <TextDisplayCopy />
</Accordion>