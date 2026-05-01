<script lang="ts">
  import {
    propertyMerger,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_BUTTON,
  } from '$lib/button/index.js'

  import type {
    ComponentButton,
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
    ComponentTextInput,
  } from '$lib/text-input/index.js'

  import type {
    FlagInputProps,
  } from './types.js'

  let {
    childrenConfig = $bindable({}),
    data,
    instance,
    isInputHidden = false,
    mask,
    maskPartReducer,
    size,
    toggleFocus,
    value = $bindable(''),
    ...passthrough
  } : FlagInputProps = $props()


  const iconConfig = $derived({
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

  const flagConfig : ComponentButton = $derived({
    input: {
      config: {
        childrenConfig : {
          icon: propertyMerger(
            childrenConfig?.flag,
            childrenConfig?.[0],
            {
              class: ['fi'],
              style:"background-size: cover",
            }
          )
        },
        icon : {
          icon: data?.key?.toString().toLowerCase(),
          iconPrefix: 'fi-',
        },
        instance: (!isInputHidden)
          ? instance as {ref: HTMLButtonElement}
          : {ref: undefined},
        isAttachedOnRight: !isInputHidden,
        isStatic: true,
        onClick: toggleFocus,
        size,
      }
    },
    type: COMPONENT_BUTTON,
  })

  const fieldConfig : ComponentTextInput = $derived({
    input: {
      config: propertyMerger(
        childrenConfig?.field,
        childrenConfig?.[1],
        passthrough,
        {
          instance,
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
      field: fieldConfig,
    })
</script>

{#key data?.key?.toString().toLowerCase()}
  <Cluster childrenConfig={configParsed}
    {data}
    mask={extendedMask}
    {maskPartReducer}
    bind:value={value} />
{/key}
