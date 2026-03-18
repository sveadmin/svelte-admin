<script lang="ts">
  import SimpleLiteral from '$lib/literal/examples/literal.ts.svelte'
  import LiteralMask from '$lib/literal/examples/literal-mask.ts.svelte'
  import LiteralBound from '$lib/literal/examples/literal-bound.ts.svelte'
  import LiteralBoundMask from '$lib/literal/examples/literal-bound-mask.ts.svelte'
  import LiteralNumberFormat from '$lib/literal/examples/number.ts.svelte'
  import LiteralCurrencyFormat from '$lib/literal/examples/currency.ts.svelte'
  import LiteralDateFormat from '$lib/literal/examples/date.ts.svelte'
</script>

<h2>Simple literal</h2>
<SimpleLiteral />
<h2>Mask usage with literal</h2>
<LiteralMask />
<h2>Literal with bound values</h2>
<LiteralBound />
<h2>Literal with bound mask values</h2>
<LiteralBoundMask />
<h2>Literal showing number formatting</h2>
<LiteralNumberFormat />
<h2>Literal showing currency formatting</h2>
<LiteralCurrencyFormat />
<h2>Literal showing date formatting</h2>
<LiteralDateFormat />