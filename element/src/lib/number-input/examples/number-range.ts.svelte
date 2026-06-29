<script lang="ts">
  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    Button,
  } from '$lib/button/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import {
    COMPONENT_NUMBER_INPUT,
    NumberInput,
  } from '$lib/number-input/index.js'

  import type {
    ComponentNumberInput,
  } from '$lib/number-input/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  let value : number[] = $state([123.45, 987.65])

  const rangeLowConfig : ComponentNumberInput = {
    input: {
      config: {
        isAttachedOnRight: true,
      }
    },
    type: COMPONENT_NUMBER_INPUT
  }

  const rangeHighConfig : ComponentNumberInput = {
    input: {
      config: {
        isAttachedOnLeft: true,
      }
    },
    type: COMPONENT_NUMBER_INPUT
  }

  const rangeLowConfigCluster : ComponentNumberInput = {
    input: {
      config: {
        isAttachedOnRight: true,
        isCopyButtonEnabled: false,
        fractionDigits: 4,
        visibleWidth: '3em',
      }
    },
    type: COMPONENT_NUMBER_INPUT
  }

  const rangeHighConfigCluster : ComponentNumberInput = {
    input: {
      config: {
        isAttachedOnLeft: true,
        isCopyButtonEnabled: false,
        fractionDigits: 4,
        visibleWidth: '3em',
      }
    },
    type: COMPONENT_NUMBER_INPUT
  }

  let configParsed = $derived({
      high: rangeHighConfig,
      low: rangeLowConfig,
    }),
    configParsedCluster = $derived({
      high: rangeHighConfigCluster,
      low: rangeLowConfigCluster,
    }),
    extendedMask = $derived('$(low)$(high)')

</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-4">Number range input</span>
    <span class="grid-span-8">
      <form>
        <Cluster componentConfig={configParsed}
          mask={extendedMask}
          bind:value={value}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {JSON.stringify(value)}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Number range input</span>
    <span class="grid-span-8">
      <form>
        <Cluster componentConfig={configParsed}
          mask={extendedMask}
          size={SIZE_SMALL}
          bind:value={value}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {JSON.stringify(value)}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Number range input</span>
    <span class="grid-span-8">
      <form>
        <Cluster componentConfig={configParsed}
          mask={extendedMask}
          size={SIZE_LARGE}
          bind:value={value}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {JSON.stringify(value)}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">Number range input</span>
    <span class="grid-span-8">
      <form>
        <Cluster componentConfig={configParsedCluster}
          mask={extendedMask}
          size={SIZE_EXTRA_LARGE}
          bind:value={value}/>
      </form>
    </span>
    <span class="grid-span-2">
      Value: {JSON.stringify(value)}
    </span>
  </GridLine>
</GridContainer>