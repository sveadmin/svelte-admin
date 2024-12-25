<script lang="ts">
  import SimpleTextDisplay from './text-display.ts.svelte'
  import TextDisplayLiteralMask from './text-display-literal-mask.ts.svelte'
  import TextDisplayBound from './text-display-bound.ts.svelte'
  import TextDisplayBoundMask from './text-display-bound-mask.ts.svelte'
  import SimpleTextDisplayWrapped from './text-display-wrapped.ts.svelte'
  import TextDisplayMultiValue from './text-display-multi-value.ts.svelte'
  import Currency from './currency.ts.svelte'
  import Date from './date.ts.svelte'
</script>

<h2>Text display</h2>
<SimpleTextDisplay />

<h2>Text mask</h2>
<TextDisplayLiteralMask />

<h2>Value bound</h2>
<TextDisplayBound />

<h2>Mask bound</h2>
<TextDisplayBoundMask />

<h2>Use a wrapping element</h2>
<SimpleTextDisplayWrapped />

<h2>Multi value</h2>
<TextDisplayMultiValue />

<h2>Currency</h2>
<Currency />

<h2>Date</h2>
<Date />