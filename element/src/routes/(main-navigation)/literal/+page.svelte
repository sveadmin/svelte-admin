<script lang="ts">
  import {
    Accordion,
  } from '$lib/accordion/index.js'

  import SimpleLiteral from '$lib/literal/examples/literal.ts.svelte'
  import LiteralMask from '$lib/literal/examples/literal-mask.ts.svelte'
  import LiteralBound from '$lib/literal/examples/literal-bound.ts.svelte'
  import LiteralBoundMask from '$lib/literal/examples/literal-bound-mask.ts.svelte'
  import LiteralNumberFormat from '$lib/literal/examples/number.ts.svelte'
  import LiteralCurrencyFormat from '$lib/literal/examples/currency.ts.svelte'
  import LiteralDateFormat from '$lib/literal/examples/date.ts.svelte'
  import LiteralHtml from '$lib/literal/examples/literal-html.ts.svelte'
</script>

<Accordion>
  {#snippet title()}
    <h2>Simple Literal</h2>
  {/snippet}
  <SimpleLiteral />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Mask usage with literal</h2>
  {/snippet}
  <LiteralMask />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Literal with bound values</h2>
  {/snippet}
  <LiteralBound />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Literal with bound mask values</h2>
  {/snippet}
  <LiteralBoundMask />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Literal showing number formatting</h2>
  {/snippet}
  <LiteralNumberFormat />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Literal showing currency formatting</h2>
  {/snippet}
  <LiteralCurrencyFormat />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Literal showing date formatting</h2>
  {/snippet}
  <LiteralDateFormat />
</Accordion>
<Accordion>
  {#snippet title()}
    <h2>Literal with HTML</h2>
  {/snippet}
  <LiteralHtml />
</Accordion>