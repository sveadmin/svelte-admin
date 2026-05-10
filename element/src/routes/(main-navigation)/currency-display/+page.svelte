<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import CurrencyFormattingOptions from '$lib/currency-display/examples/currency-formatting-options.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Currency from '$lib/currency-display/examples/currency.ts.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import CurrencyWrapped from '$lib/currency-display/examples/currency-wrapped.ts.svelte'

</script>
<Accordion>
  {#snippet title()}
    <h2>Currency formatting options</h2>
  {/snippet}
  <CurrencyFormattingOptions />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Currency display</h2>
  {/snippet}
  <Currency />
</Accordion>

<Accordion>
  {#snippet title()}
    <h2>Currency display wrapped</h2>
  {/snippet}
  <CurrencyWrapped />
</Accordion>