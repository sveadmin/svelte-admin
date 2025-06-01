<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextDisplay from './text-display.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplayLiteralMask from './text-display-literal-mask.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplayBound from './text-display-bound.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplayBoundMask from './text-display-bound-mask.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import SimpleTextDisplayWrapped from './text-display-wrapped.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplayMultiValue from './text-display-multi-value.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Number from './number.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Currency from './currency.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Date from './date.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Text display</h2>
  {/snippet}
  <SimpleTextDisplay />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Text mask</h2>
  {/snippet}
  <TextDisplayLiteralMask />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Value bound</h2>
  {/snippet}
  <TextDisplayBound />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Mask bound</h2>
  {/snippet}
  <TextDisplayBoundMask />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Use a wrapping element</h2>
  {/snippet}
  <SimpleTextDisplayWrapped />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Multi value</h2>
  {/snippet}
  <TextDisplayMultiValue />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Number</h2>
  {/snippet}
  <Number />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Currency</h2>
  {/snippet}
  <Currency />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Date</h2>
  {/snippet}
  <Date />
</Accordion>