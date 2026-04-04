<script lang="ts">
  import {
    createFieldValidator,
  } from '@sveadmin/common'

  import type {
    SveadminComponentMask,
  } from '$lib/types.js'

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
    Cluster,
  } from '$lib/cluster/index.js'

  import type {
    ComponentImageWrapped,
  } from '$lib/image/index.js'

  import {
    COMPONENT_TEXT_DISPLAY_WRAPPED,
    TextDisplayWrapped,
  } from '$lib/text-display/index.js'

  import type {
    ComponentTextDisplayWrapped,
  } from '$lib/text-display/index.js'

  import type {
    ComponentTextInput,
  } from '$lib/text-input/index.js'

  import { creditCardIconGenerator } from './config/credit-card-icon.js'
  import { creditCardQuartetGenerator } from './config/credit-card-quartet.js'
  import { creditCardQuartetDividerGenerator } from './config/credit-card-quartet-divider.js'
  import { cvvGenerator } from './config/cvv.js'
  import { cvvIconGenerator } from './config/cvv-icon.js'
  import { securityIconGeneratorSecurity } from './config/security-icon.config.js'
  
  import {
    creditCardValidator,
  } from './validator/credit-card.js'
    import type { ComponentDropdown } from '$lib/main.js';

  let boundValue: string[] = $state(['', '', '', '', '']),
    boundValueExtraLarge: string[] = $state(['', '', '', '', '']),
    boundValueLarge: string[] = $state(['', '', '', '', '']),
    boundValueSmall: string[] = $state(['', '', '', '', '']),
    securityValue: string[] = $state(['', '', '']),
    securitySmallValue: string[] = $state(['', '', '']),
    securityLargeValue: string[] = $state(['', '', '']),
    securityExtraLargeValue: string[] = $state(['', '', ''])

  const ccConfig : {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped} = {
    cc1: creditCardQuartetGenerator({data: {testid: 'first-quartet'}}),
    cc2: creditCardQuartetGenerator({data: {testid: 'second-quartet'}}),
    cc3: creditCardQuartetGenerator({data: {testid: 'third-quartet'}}),
    cc4: creditCardQuartetGenerator({data: {testid: 'fourth-quartet'}}),
    divider: creditCardQuartetDividerGenerator(),
    icon: creditCardIconGenerator(),
  }

  const ccSmallConfig : {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped} = {
    cc1: creditCardQuartetGenerator({size: SIZE_SMALL}),
    cc2: creditCardQuartetGenerator({size: SIZE_SMALL}),
    cc3: creditCardQuartetGenerator({size: SIZE_SMALL}),
    cc4: creditCardQuartetGenerator({size: SIZE_SMALL}),
    divider: creditCardQuartetDividerGenerator({size: SIZE_SMALL}),
    icon: creditCardIconGenerator({size: SIZE_SMALL}),
  }

  const ccLargeConfig : {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped} = {
    cc1: creditCardQuartetGenerator({size: SIZE_LARGE}),
    cc2: creditCardQuartetGenerator({size: SIZE_LARGE}),
    cc3: creditCardQuartetGenerator({size: SIZE_LARGE}),
    cc4: creditCardQuartetGenerator({size: SIZE_LARGE}),
    divider: creditCardQuartetDividerGenerator({size: SIZE_LARGE}),
    icon: creditCardIconGenerator({size: SIZE_LARGE}),
  }

  const ccExtraLargeConfig : {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped} = {
    cc1: creditCardQuartetGenerator({size: SIZE_EXTRA_LARGE}),
    cc2: creditCardQuartetGenerator({size: SIZE_EXTRA_LARGE}),
    cc3: creditCardQuartetGenerator({size: SIZE_EXTRA_LARGE}),
    cc4: creditCardQuartetGenerator({size: SIZE_EXTRA_LARGE}),
    divider: creditCardQuartetDividerGenerator({size: SIZE_EXTRA_LARGE}),
    icon: creditCardIconGenerator({size: SIZE_EXTRA_LARGE}),
  }

  const ccMask: SveadminComponentMask = '$(icon)$(cc1)$(divider)$(cc2)$(divider)$(cc3)$(divider)$(cc4)'

  const securityConfig: {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped | ComponentDropdown} = {
    lead: {
      display: {
        config: {
          isAttachedOnRight: true,
          value: 'Lead text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
    icon: securityIconGeneratorSecurity({isAttachedOnLeft: true}),
    month: monthSelectorTwoDigitGenerator(),
    monthDivider: monthDividerGenerator(),
    year: yearGenerator(),
    cvvIcon: cvvIconGenerator(),
    cvv: cvvGenerator({isAttachedOnRight: true}),
    end: {
      display: {
        config: {
          isAttachedOnLeft: true,
          value: 'End text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
  }

  const smallSecurityConfig: {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped | ComponentDropdown} = {
    lead: {
      display: {
        config: {
          isAttachedOnRight: true,
          size: SIZE_SMALL,
          value: 'Lead text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
    icon: securityIconGeneratorSecurity({isAttachedOnLeft: true, size: SIZE_SMALL}),
    month: monthSelectorTwoDigitGenerator({size: SIZE_SMALL}),
    monthDivider: monthDividerGenerator({size: SIZE_SMALL}),
    year: yearGenerator({size: SIZE_SMALL}),
    cvvIcon: cvvIconGenerator({size: SIZE_SMALL}),
    cvv: cvvGenerator({isAttachedOnRight: true, size: SIZE_SMALL}),
    end: {
      display: {
        config: {
          isAttachedOnLeft: true,
          size: SIZE_SMALL,
          value: 'End text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
  }

  const largeSecurityConfig: {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped | ComponentDropdown} = {
    lead: {
      display: {
        config: {
          isAttachedOnRight: true,
          size: SIZE_LARGE,
          value: 'Lead text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
    icon: securityIconGeneratorSecurity({isAttachedOnLeft: true, size: SIZE_LARGE}),
    month: monthSelectorTwoDigitGenerator({size: SIZE_LARGE}),
    monthDivider: monthDividerGenerator({size: SIZE_LARGE}),
    year: yearGenerator({size: SIZE_LARGE}),
    cvvIcon: cvvIconGenerator({size: SIZE_LARGE}),
    cvv: cvvGenerator({isAttachedOnRight: true, size: SIZE_LARGE}),
    end: {
      display: {
        config: {
          isAttachedOnLeft: true,
          size: SIZE_LARGE,
          value: 'End text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
  }

  const extraLargeSecurityConfig: {[key: string] : ComponentImageWrapped | ComponentTextInput | ComponentTextDisplayWrapped | ComponentDropdown} = {
    lead: {
      display: {
        config: {
          isAttachedOnRight: true,
          size: SIZE_EXTRA_LARGE,
          value: 'Lead text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
    icon: securityIconGeneratorSecurity({isAttachedOnLeft: true, size: SIZE_EXTRA_LARGE}),
    month: monthSelectorTwoDigitGenerator({size: SIZE_EXTRA_LARGE}),
    monthDivider: monthDividerGenerator({size: SIZE_EXTRA_LARGE}),
    year: yearGenerator({size: SIZE_EXTRA_LARGE}),
    cvvIcon: cvvIconGenerator({size: SIZE_EXTRA_LARGE}),
    cvv: cvvGenerator({isAttachedOnRight: true, size: SIZE_EXTRA_LARGE}),
    end: {
      display: {
        config: {
          isAttachedOnLeft: true,
          size: SIZE_EXTRA_LARGE,
          value: 'End text',
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    },
  }

  const securityMask: SveadminComponentMask = '$(lead)$(icon)$(month)$(monthDivider)$(year)$(cvvIcon)$(cvv)$(end)'

  const validator = createFieldValidator([creditCardValidator({get valueFallback() {return boundValue}})])
  const validatorSmall = createFieldValidator([creditCardValidator({get valueFallback() {return boundValueSmall}})])
  const validatorLarge = createFieldValidator([creditCardValidator({get valueFallback() {return boundValueLarge}})])
  const validatorExtraLarge = createFieldValidator([creditCardValidator({get valueFallback() {return boundValueExtraLarge}})])

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
          <Cluster
            childrenConfig={ccConfig}
            mask={ccMask}
            validators={validator}
            bind:value={boundValue} />
        <TextDisplayWrapped isAttachedOnRight={true}
          style="text-align: right;"
          value="This is the left side -" /><!--
        --><TextDisplayWrapped isFloating={true}
          value="---" /><!--
        --><TextDisplayWrapped isAttachedOnLeft={true}
          value="- and this is the right side" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-9 grid-start-4">
          <Cluster
            childrenConfig={securityConfig}
            mask={securityMask} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Credit card small:</span>
      <span class="grid-span-9" data-testid="first-cluster">
          <Cluster
            childrenConfig={ccSmallConfig}
            mask={ccMask}
            validators={validatorSmall}
            bind:value={boundValueSmall} />
        <TextDisplayWrapped isAttachedOnRight={true}
          size={SIZE_SMALL}
          style="text-align: right;"
          value="This is the left side -" /><!--
        --><TextDisplayWrapped isFloating={true}
          size={SIZE_SMALL}
          value="---" /><!--
        --><TextDisplayWrapped isAttachedOnLeft={true}
          size={SIZE_SMALL}
          value="- and this is the right side" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-9 grid-start-4">
          <Cluster
            childrenConfig={smallSecurityConfig}
            mask={securityMask} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Credit card large:</span>
      <span class="grid-span-9" data-testid="first-cluster">
          <Cluster
            childrenConfig={ccLargeConfig}
            mask={ccMask}
            validators={validatorLarge}
            bind:value={boundValueLarge} />
        <TextDisplayWrapped isAttachedOnRight={true}
          size={SIZE_LARGE}
          style="text-align: right;"
          value="L -" /><!--
        --><TextDisplayWrapped isFloating={true}
          size={SIZE_LARGE}
          value="---" /><!--
        --><TextDisplayWrapped isAttachedOnLeft={true}
          size={SIZE_LARGE}
          value="- R" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-9 grid-start-4">
          <Cluster
            childrenConfig={largeSecurityConfig}
            mask={securityMask} />
      </span>
    </GridLine>
  </form>
  <form>
    <GridLine>
      <span class="grid-span-3">Credit card extra large:</span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12" data-testid="first-cluster">
          <Cluster
            childrenConfig={ccExtraLargeConfig}
            mask={ccMask}
            validators={validatorExtraLarge}
            bind:value={boundValueExtraLarge} />
        <TextDisplayWrapped isAttachedOnRight={true}
          size={SIZE_EXTRA_LARGE}
          style="text-align: right;"
          value="L -" /><!--
        --><TextDisplayWrapped isFloating={true}
          size={SIZE_EXTRA_LARGE}
          value="---" /><!--
        --><TextDisplayWrapped isAttachedOnLeft={true}
          size={SIZE_EXTRA_LARGE}
          value="- R" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-12">
          <Cluster
            childrenConfig={extraLargeSecurityConfig}
            mask={securityMask} />
      </span>
    </GridLine>
  </form>
</GridContainer>