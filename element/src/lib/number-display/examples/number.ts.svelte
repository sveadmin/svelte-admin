<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    NUMBER_ROUNDING_MODE_CEIL,
    NUMBER_ROUNDING_MODE_EXPAND,
    NUMBER_ROUNDING_MODE_TRUNC,
    NUMBER_SIGN_DISPLAY_ALWAYS,
    ordinalEn,
  } from '$lib/number/index.js'

  import {
    NumberDisplay,
  } from '$lib/number-display/index.js'

  let number1: number = $state(14312)
  let dynamicSuffix1 = $derived.by(() => ordinalEn(number1))
  let number2: number = $state(143122)
  let dynamicSuffix2 = $derived.by(() => ordinalEn(number2))
</script>

<GridContainer>
  <GridLine>
    <span class="grid-span-6">
      Unformatted number display:
    </span>
    <NumberDisplay class="grid-span-6" value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Small number display:
    </span>
    <NumberDisplay class="grid-span-6" size={SIZE_SMALL} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Large number display:
    </span>
    <NumberDisplay class="grid-span-6" size={SIZE_LARGE} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Extra large number display:
    </span>
    <NumberDisplay class="grid-span-6" size={SIZE_EXTRA_LARGE} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      German format:
    </span>
    <NumberDisplay class="grid-span-6" locale="de-DE" value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      French format:
    </span>
    <NumberDisplay class="grid-span-6" locale="fr-FR" value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      More decimals:
    </span>
    <NumberDisplay class="grid-span-6" fractionDigits={6} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      No thousand grouping:
    </span>
    <NumberDisplay class="grid-span-6" useGrouping={false} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Zero padded:
    </span>
    <NumberDisplay class="grid-span-6"
      fractionDigits={4}
      value="123456789.987654" 
      zeroPadded={12}/>
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Using mask:
    </span>
    <NumberDisplay class="grid-span-6" mask={'--->$(number)<---'} value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Use dynamic ordinal suffix (English):
    </span>
    <NumberDisplay class="grid-span-6"
      mask={['$(number)', dynamicSuffix1, ', $(number)', dynamicSuffix2]}
      value={[number1, number2]} />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Fix number of fraction digits (zero padded):
    </span>
    <NumberDisplay class="grid-span-6"
      fractionDigits={[10, 10]}
      value="123456789.987654" />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Multiple numbers with same format:
    </span>
    <NumberDisplay class="grid-span-6"
      fractionDigits="2"
      locale="fr-FR"
      mask=" $(number) - $(number)"
      value={[123456789.987654, 5555555.4444]} />
  </GridLine>
  <GridLine>
    <span class="grid-span-6">
      Always show sign:
    </span>
    <NumberDisplay class="grid-span-6"
      mask="$(number),  $(number),  $(number)"
      signDisplay={NUMBER_SIGN_DISPLAY_ALWAYS}
      value={[123.45, 0, -987.65]} />
  </GridLine>
  <GridLine>
    <span class="grid-span-4">
      Rounding modes. Numbers used:
    </span> 
    <NumberDisplay class="grid-span-2" value="1.65" />
    <NumberDisplay class="grid-span-2" value="-1.65" />
    <NumberDisplay class="grid-span-2" value="1.23" />
    <NumberDisplay class="grid-span-2" value="-1.23" />
    <span class="grid-span-4">
      Default:
    </span> 
    <NumberDisplay class="grid-span-2" fractionDigits={0} value="1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} value="-1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} value="1.23" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} value="-1.23" />
    <span class="grid-span-4">
      Ceiling:
    </span> 
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_CEIL} value="1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_CEIL} value="-1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_CEIL} value="1.23" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_CEIL} value="-1.23" />
    <span class="grid-span-4">
      Truncate (towards zero):
    </span> 
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_TRUNC} value="1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_TRUNC} value="-1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_TRUNC} value="1.23" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_TRUNC} value="-1.23" />
    <span class="grid-span-4">
      Expand (away from zero):
    </span> 
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_EXPAND} value="1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_EXPAND} value="-1.65" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_EXPAND} value="1.23" />
    <NumberDisplay class="grid-span-2" fractionDigits={0} roundingMode={NUMBER_ROUNDING_MODE_EXPAND} value="-1.23" />
  </GridLine>
</GridContainer>