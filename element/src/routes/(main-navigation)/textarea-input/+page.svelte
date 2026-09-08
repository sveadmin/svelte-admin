<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextareaInput from '$lib/textarea-input/examples/textarea-input.ts.svelte'
  import TextareaInputAutoExpand from '$lib/textarea-input/examples/textarea-input-auto-expand.ts.svelte'
  import TextareaInputResize from '$lib/textarea-input/examples/textarea-input-resize.ts.svelte'
  import TextareaInputSpellcheck from '$lib/textarea-input/examples/textarea-input-spellcheck.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple textarea input</h2>
  {/snippet}
  <SimpleTextareaInput />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Text area display with resize</h2>
  {/snippet}
  <TextareaInputResize />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Text area display with spellcheck</h2>
  {/snippet}
  <TextareaInputSpellcheck />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Auto expanding textarea0</h2>
  {/snippet}
  <TextareaInputAutoExpand />
</Accordion>