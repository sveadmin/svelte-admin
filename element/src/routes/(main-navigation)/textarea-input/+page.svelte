<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextareaInput from '$lib/textarea-input/examples/textarea-input.ts.svelte'
  import SimpleTextareaInputBound from '$lib/textarea-input/examples/textarea-input-bound.ts.svelte'
  import SimpleTextareaInputSanitize from '$lib/textarea-input/examples/textarea-input-sanitize.ts.svelte'
  import TextareaInputFixedSize from '$lib/textarea-input/examples/textarea-input-fixed-size.ts.svelte'
  import TextareaInputResize from '$lib/textarea-input/examples/textarea-input-resize.ts.svelte'
  import TextareaInputSpellcheck from '$lib/textarea-input/examples/textarea-input-spellcheck.ts.svelte'
  import TextareaInputWrapped from '$lib/textarea-input/examples/textarea-input-wrapped.ts.svelte'
</script>

{#if false}
<Accordion>
  {#snippet title()}
    <h2>Simple textarea input</h2>
  {/snippet}
  <SimpleTextareaInput />
</Accordion>
{/if}
<Accordion>
  {#snippet title()}
    <h2>Textarea with bound value</h2>
  {/snippet}
  <SimpleTextareaInputBound />
</Accordion>
{#if false}
<Accordion>
  {#snippet title()}
    <h2>Textarea with sanitization</h2>
  {/snippet}
  <SimpleTextareaInputSanitize />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Textarea without auto expand (fixed size)</h2>
  {/snippet}
  <TextareaInputFixedSize />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Textarea input wrapped</h2>
  {/snippet}
  <TextareaInputWrapped />
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
{/if}