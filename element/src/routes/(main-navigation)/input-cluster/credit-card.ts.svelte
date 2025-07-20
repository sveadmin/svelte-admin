<script lang="ts">
  import {
    rune,
  } from '@sveadmin/common'

  import type {
    Rune,
  } from '@sveadmin/common'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    monthDividerGenerator,
    monthSelectorTwoDigitGenerator,
    yearGenerator,
  } from '$lib/date-selector/index.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    InputClusterParts,
  } from '$lib/input-cluster/index.js'

  import { creditCardIconGenerator } from './credit-card-icon.config.js'
  import { creditCardQuartetGenerator } from './credit-card-quartet.config.js'
  import { creditCardQuartetDividerGenerator } from './credit-card-quartet-divider.config.js'
  import { cvvGenerator } from './cvv.config.js'
  import { cvvIconGenerator } from './cvv-icon.config.js'
  import { securityIconGeneratorSecurity } from './security-icon.config.js'
  
  import {
    creditCardChecksum,
  } from './helper/credit-card-checksum.js'

  let boundValue: string[] = $state(['', '', '', '', '']),
    boundValueExtraLarge: string[] = $state(['', '', '', '', '']),
    boundValueLarge: string[] = $state(['', '', '', '', '']),
    boundValueSmall: string[] = $state(['', '', '', '', ''])
  let runedValue: Rune<string[]> = rune(boundValue),
    runedValueExtraLarge: Rune<string[]> = rune(boundValueExtraLarge),
    runedValueLarge: Rune<string[]> = rune(boundValueLarge),
    runedValueSmall: Rune<string[]> = rune(boundValueSmall)

  const maskNumber: InputClusterParts[] = [
    creditCardIconGenerator(),
    creditCardQuartetGenerator(runedValue),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(runedValue),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(runedValue),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(runedValue),
  ]

  const maskSecurity: InputClusterParts[] = [
    securityIconGeneratorSecurity(),
    monthSelectorTwoDigitGenerator(),
    monthDividerGenerator(),
    yearGenerator(),
    cvvIconGenerator(),
    cvvGenerator(),
  ]

  const maskNumberSmall: InputClusterParts[] = [
    creditCardIconGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(runedValueSmall, SIZE_SMALL),
    creditCardQuartetDividerGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(runedValueSmall, SIZE_SMALL),
    creditCardQuartetDividerGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(runedValueSmall, SIZE_SMALL),
    creditCardQuartetDividerGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(runedValueSmall, SIZE_SMALL),
  ]

  const maskSecuritySmall: InputClusterParts[] = [
    securityIconGeneratorSecurity(SIZE_SMALL),
    monthSelectorTwoDigitGenerator(SIZE_SMALL),
    monthDividerGenerator(SIZE_SMALL),
    yearGenerator(SIZE_SMALL),
    cvvIconGenerator(SIZE_SMALL),
    cvvGenerator(SIZE_SMALL),
  ]

  const maskNumberLarge: InputClusterParts[] = [
    creditCardIconGenerator(),
    creditCardQuartetGenerator(runedValueLarge),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(runedValueLarge),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(runedValueLarge),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(runedValueLarge),
  ]

  const maskSecurityLarge: InputClusterParts[] = [
    securityIconGeneratorSecurity(),
    monthSelectorTwoDigitGenerator(),
    monthDividerGenerator(),
    yearGenerator(),
    cvvIconGenerator(),
    cvvGenerator(),
  ]

  const maskNumberExtraLarge: InputClusterParts[] = [
    creditCardIconGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(runedValueExtraLarge, SIZE_EXTRA_LARGE),
    creditCardQuartetDividerGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(runedValueExtraLarge, SIZE_EXTRA_LARGE),
    creditCardQuartetDividerGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(runedValueExtraLarge, SIZE_EXTRA_LARGE),
    creditCardQuartetDividerGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(runedValueExtraLarge, SIZE_EXTRA_LARGE),
  ]

  const maskSecurityExtraLarge: InputClusterParts[] = [
    securityIconGeneratorSecurity(SIZE_EXTRA_LARGE),
    monthSelectorTwoDigitGenerator(SIZE_EXTRA_LARGE),
    monthDividerGenerator(SIZE_EXTRA_LARGE),
    yearGenerator(SIZE_EXTRA_LARGE),
    cvvIconGenerator(SIZE_EXTRA_LARGE),
    cvvGenerator(SIZE_EXTRA_LARGE),
  ]

$inspect('bv', boundValue)
$inspect('bvs', boundValueSmall)
$inspect('bvl', boundValueLarge)
$inspect('bvxl', boundValueExtraLarge)
</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-3">Values to copy & paste:</span>
    <span class="grid-span-3">1234567812345678</span>
    <span class="grid-span-3">1234-5678-1234-5678</span>
    <span class="grid-span-3">1234 - 5678 - 1234 - 5678</span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3 grid-start-4">4012888888881881</span>
  </GridLine>
  <form>
    <GridLine>
      <span class="grid-span-3">Credit card:</span>
      <span class="grid-span-9">
          <InputCluster
            mask={maskNumber}
            bind:value={boundValue} />
      </span>
    <GridLine>
    </GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecurity} />
      </span>
    </GridLine>
  </form>
{JSON.stringify(creditCardChecksum(runedValue))}
  <form>
    <GridLine>
      <span class="grid-span-3">Small credit card:</span>
      <span class="grid-span-9">
          <InputCluster
            mask={maskNumberSmall}
            bind:value={boundValueSmall} />
      </span>
    <GridLine>
    </GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecuritySmall} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Large credit card:</span>
      <span class="grid-span-9">
          <InputCluster
            mask={maskNumberLarge}
            size={SIZE_LARGE}
            bind:value={boundValueLarge} />
      </span>
    <GridLine>
    </GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecurityLarge}
            size={SIZE_LARGE} />
      </span>
  </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Extra large credit card (Input cluster size overwritten):</span>
      <span class="grid-span-9">
          <InputCluster
            mask={maskNumberExtraLarge}
            size={SIZE_LARGE}
            bind:value={boundValueExtraLarge} />
      </span>
    <GridLine>
    </GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecurityExtraLarge}
            size={SIZE_LARGE} />
      </span>
    </GridLine>
  </form>
</GridContainer>