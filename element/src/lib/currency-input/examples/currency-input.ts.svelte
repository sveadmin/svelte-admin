<script lang="ts">
  import {
    CurrencyInput,
  } from '$lib/currency-input/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
</script>

<GridLine>
  <span class="grid-span-4">Normal size currency input</span>
  <span class="grid-span-8">
    <form>
      <CurrencyInput />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Small size currency input</span>
  <span class="grid-span-8">
    <form>
      <CurrencyInput size={SIZE_SMALL} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Large size currency input</span>
  <span class="grid-span-8">
    <form>
      <CurrencyInput size={SIZE_LARGE} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Extra large size currency input</span>
  <span class="grid-span-8">
    <form>
      <CurrencyInput size={SIZE_EXTRA_LARGE} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Normal size with fraction digits</span>
  <span class="grid-span-8">
    <form>
      <CurrencyInput fractionDigits=3 />
    </form>
  </span>
</GridLine>