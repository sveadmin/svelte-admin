<script lang="ts">
  import {
    NumberInput,
  } from '$lib/number-input/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-4">Normal size number input</span>
    <span class="grid-span-8">
      <form>
        <NumberInput value=123.45/>
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Small size number input</span>
    <span class="grid-span-8">
      <form>
        <NumberInput size={SIZE_SMALL} value=123456.78 />
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Large size number input</span>
    <span class="grid-span-8">
      <form>
        <NumberInput size={SIZE_LARGE} value=123.45 />
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Extra large size number input</span>
    <span class="grid-span-8">
      <form>
        <NumberInput size={SIZE_EXTRA_LARGE} value=123.45 />
      </form>
    </span>
  </GridLine>
    <GridLine>
      <span class="grid-span-3">Values to copy & paste:</span>
      <span class="grid-span-2">1000.345</span>
      <span class="grid-span-2">1000,345</span>
      <span class="grid-span-2">0.0090012345</span>
      <span class="grid-span-2">-123.456789</span>
    </GridLine>
  <GridLine>
    <span class="grid-span-4">Normal size with fraction digits</span>
    <span class="grid-span-8">
      <form>
        <NumberInput fractionDigits=3 isClearButtonEnabled={true} value=123.45 />
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Small size with fraction digits</span>
    <span class="grid-span-8">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
           size={SIZE_SMALL}
           value=123.45 />
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Large size with fraction digits</span>
    <span class="grid-span-8">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
           size={SIZE_LARGE}
           value=123.45 />
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Extra large size with fraction digits</span>
    <span class="grid-span-8">
      <form>
        <NumberInput fractionDigits=3
          isClearButtonEnabled={true}
           size={SIZE_EXTRA_LARGE}
           value=123.45 />
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Very small number</span>
    <span class="grid-span-8">
      <form>
        <NumberInput fractionDigits=8 isClearButtonEnabled={true} value=0.0090012345 />
      </form>
    </span>
  </GridLine>
</GridContainer>