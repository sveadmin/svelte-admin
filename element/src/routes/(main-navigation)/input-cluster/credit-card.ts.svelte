<script lang="ts">
  import {
    createFieldValidator,
    rune,
  } from '@sveadmin/common'

  import type {
    Rune,
  } from '@sveadmin/common'

  import {
    Button,
  } from '$lib/button/index.js'

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

  import { creditCardIconGenerator } from './config/credit-card-icon.js'
  import { creditCardQuartetGenerator } from './config/credit-card-quartet.js'
  import { creditCardQuartetDividerGenerator } from './config/credit-card-quartet-divider.js'
  import { cvvGenerator } from './config/cvv.js'
  import { cvvIconGenerator } from './config/cvv-icon.js'
  import { securityIconGeneratorSecurity } from './security-icon.config.js'
  
  import {
    creditCardValidator,
  } from './validator/credit-card.js'

  let boundValue: string[] = $state(['', '', '', '', '']),
    boundValueExtraLarge: string[] = $state(['', '', '', '', '']),
    boundValueLarge: string[] = $state(['', '', '', '', '']),
    boundValueSmall: string[] = $state(['', '', '', '', '']),
    securityValue: string[] = $state(['', '', '']),
    securitySmallValue: string[] = $state(['', '', '']),
    securityLargeValue: string[] = $state(['', '', '']),
    securityExtraLargeValue: string[] = $state(['', '', ''])
  let runedValue: Rune<string[]> = rune(boundValue),
    runedValueExtraLarge: Rune<string[]> = rune(boundValueExtraLarge),
    runedValueLarge: Rune<string[]> = rune(boundValueLarge),
    runedValueSmall: Rune<string[]> = rune(boundValueSmall),
    runedSecurityValue: Rune<string[]> = rune(securityValue),
    runedSecuritySmallValue: Rune<string[]> = rune(securitySmallValue),
    runedSecurityLargeValue: Rune<string[]> = rune(securityLargeValue),
    runedSecurityExtraLargeValue: Rune<string[]> = rune(securityExtraLargeValue)


  const maskNumber: InputClusterParts[] = [
    creditCardIconGenerator(),
    {...creditCardQuartetGenerator(), data: {testid: 'first-quartet'}},
    creditCardQuartetDividerGenerator(),
    {...creditCardQuartetGenerator(), data: {testid: 'second-quartet'}},
    creditCardQuartetDividerGenerator(),
    {...creditCardQuartetGenerator(), data: {testid: 'third-quartet'}},
    creditCardQuartetDividerGenerator(),
    {...creditCardQuartetGenerator(), data: {testid: 'fourth-quartet'}},
  ]
  const validator = createFieldValidator([creditCardValidator({valueFallback: runedValue})])

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
    creditCardQuartetGenerator(SIZE_SMALL),
    creditCardQuartetDividerGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(SIZE_SMALL),
    creditCardQuartetDividerGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(SIZE_SMALL),
    creditCardQuartetDividerGenerator(SIZE_SMALL),
    creditCardQuartetGenerator(SIZE_SMALL),
  ]
  const validatorSmall = createFieldValidator([creditCardValidator({valueFallback: runedValueSmall})])

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
    creditCardQuartetGenerator(),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(),
    creditCardQuartetDividerGenerator(),
    creditCardQuartetGenerator(),
  ]
  const validatorLarge = createFieldValidator([creditCardValidator({valueFallback: runedValueLarge})])

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
    creditCardQuartetGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetDividerGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetDividerGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetDividerGenerator(SIZE_EXTRA_LARGE),
    creditCardQuartetGenerator(SIZE_EXTRA_LARGE),
  ]
  const validatorExtraLarge = createFieldValidator([creditCardValidator({valueFallback: runedValueExtraLarge})])

  const maskSecurityExtraLarge: InputClusterParts[] = [
    securityIconGeneratorSecurity(),
    monthSelectorTwoDigitGenerator(),
    monthDividerGenerator(),
    yearGenerator(),
    cvvIconGenerator(),
    cvvGenerator(),
  ]

// $inspect('bv', boundValue)
// $inspect('bvs', boundValueSmall)
// $inspect('bvl', boundValueLarge)
// $inspect('bvxl', boundValueExtraLarge)
</script>


<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-3">Values to copy / drag:</span>
    <span class="grid-span-3">1234567812345678<Button data={{testid: 'set-invalid-button'}} onClick={() => boundValue = ['1234', '5678', '1234', '5678']} label="Set"/></span>
    <span class="grid-span-3">1234-5678-1234-5678</span>
    <span class="grid-span-3">1234 - 5678 - 1234 - 5678</span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3 grid-start-4">4012888888881881<Button data={{testid: 'set-valid-button'}} onClick={() => boundValue = ['4012', '8888', '8888', '1881']} label="Set"/></span>
    <span class="grid-span-3"><Button data={{testid: 'clear-button'}} onClick={() => boundValue = ['', '', '', '']} label="Clear"/></span>
  </GridLine>
</GridContainer>
<GridContainer class="demopage-grid">
  <form>
    <GridLine>
      <span class="grid-span-3">Credit card:</span>
      <span class="grid-span-9" data-testid="first-cluster">
          <InputCluster
            mask={maskNumber}
            validators={validator}
            bind:value={boundValue} />
      </span>
    </GridLine>
    <!-- <GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecurity} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Small credit card:</span>
      <span class="grid-span-9">
          <InputCluster
            mask={maskNumberSmall}
            validators={validatorSmall}
            bind:value={boundValueSmall} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecuritySmall} 
            bind:value={securityValue}/>
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
            validators={validatorLarge}
            bind:value={boundValueLarge} />
      </span>
    </GridLine>
    <GridLine>
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
            validators={validatorExtraLarge}
            bind:value={boundValueExtraLarge} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-9 grid-start-4">
          <InputCluster
            mask={maskSecurityExtraLarge}
            size={SIZE_EXTRA_LARGE} />
      </span>
    </GridLine> -->
  </form>
</GridContainer>