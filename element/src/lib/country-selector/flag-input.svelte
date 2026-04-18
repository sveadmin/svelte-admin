<script lang="ts">
  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js';

  import {
    mergeStyles,
    propertyMerger,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_BUTTON,
  } from '$lib/button/index.js'

  import {
    COMPONENT_IMAGE_WRAPPED,
  } from '$lib/image/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import {
    COMPONENT_TEXT_INPUT,
  } from '$lib/text-input/index.js'

  import type {
    FlagInputProps,
  } from './types.js'

  let {
    callbacks = {},
    childrenConfig = $bindable({}),
    data,
    isInputHidden = false,
    mask,
    maskPartReducer,
    size,
    value = $bindable(''),
    ...passthrough
  } : FlagInputProps = $props()

  const {
    toggleFocus,
  } = callbacks

  const flagConfig = $derived({
    display: {
      config : propertyMerger(
        childrenConfig?.flag,
        childrenConfig?.[0],
        {
          class: ['fi'],
          icon: data?.key?.toString().toLowerCase(),
          iconPrefix: 'fi-',
          isAttachedOnRight: !isInputHidden,
          onClick: toggleFocus,
          size,
          style:"background-size: cover",
        }
      ),
    },
    type: COMPONENT_IMAGE_WRAPPED,
  })
  // const flagConfig = $derived({
  //   input: {
  //     config: {
  //       icon : propertyMerger(
  //         childrenConfig?.flag,
  //         childrenConfig?.[0],
  //         {
  //           class: ['fi'],
  //           icon: data?.key?.toString().toLowerCase(),
  //           iconPrefix: 'fi-',
  //           style:"background-size: cover",
  //         }
  //       ),
  //       // instance: (!isInputHidden) ? instance : {ref: undefined},
  //       isAttachedOnRight: !isInputHidden,
  //       onClick: toggleFocus,
  //       size,
  //       value: 'Flag' // THIS IS NOT A VLAID PROPERTY, BUT THIS IS HOWE VLUSTER KNOWS NOT TO USE IT AS DYNAMIC VALUE!!!!!
  //     }
  //   },
  //   type: COMPONENT_BUTTON,
  // })
  const fieldConfig = $derived({
    input: {
      config: propertyMerger(
        childrenConfig?.field,
        childrenConfig?.[1],
        passthrough,
        {
          isAttachedOnLeft: true,
          size,
          style: 'width: calc(100% - 5.25em)'
        }
      ),
    },
    type: COMPONENT_TEXT_INPUT,
  })

  let extendedMask = $derived(mask ?? '$(flag)' + ((isInputHidden) ? '' : '$(field)')),
    configParsed = $derived({
      flag: flagConfig,
      field: fieldConfig
    })
</script>

{#key data?.key?.toString().toLowerCase()}
  <Cluster childrenConfig={configParsed}
    {data}
    mask={extendedMask}
    {maskPartReducer}
    bind:value={value} />
{/key}
<!-- 
{#if isInputHidden}
  <Cluster {data} childrenConfig={configParsed} mask={[{...flagMask}]} bind:value={value} />
{:else}
  <Cluster {data} mask={[{...flagMask}, {...inputMask}]} bind:value={value} />
{/if} -->

