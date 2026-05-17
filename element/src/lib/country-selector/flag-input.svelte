<script lang="ts">
  import {
    BUTTON_LEVEL_OUTLINE,
  } from '$lib/types.js'

  import {
    mergeProperties,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_BUTTON,
  } from '$lib/button/index.js'

  import type {
    ComponentButton,
  } from '$lib/button/index.js'

  import {
    Cluster,
    ClusterWrapped,
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
    instance = $bindable({ref: undefined}),
    isInputHidden = false,
    onFocus,
    mask,
    maskPartReducer,
    size,
    toggleFocus,
    toggleSelectionInProgress,
    value = $bindable(''),
    ...passthrough
  } : FlagInputProps = $props()

  // const iconConfig = $derived({
  //   display: {
  //     config : mergeProperties(
  //       childrenConfig?.flag,
  //       childrenConfig?.[0],
  //       {
  //         class: ['fi'],
  //         icon: data?.key?.toString().toLowerCase(),
  //         iconPrefix: 'fi-',
  //         isAttachedOnRight: !isInputHidden,
  //         onClick: toggleFocus,
  //         size,
  //         style:"background-size: cover",
  //       }
  //     ),
  //   },
  //   type: COMPONENT_IMAGE_WRAPPED,
  // })

  const flagEvents = (isInputHidden)
    ? {onClick: toggleSelectionInProgress, onFocus}
    : {onClick: toggleFocus}

  const flagConfig : ComponentButton = $derived({
    input: {
      config: {
        childrenConfig : {
          icon: mergeProperties(
            childrenConfig?.flag,
            childrenConfig?.[0],
            {
              class: ['fi'],
              style:"background-size: cover",
            }
          )
        },
        ...flagEvents,
        icon : {
          icon: data?.key?.toString().toLowerCase(),
          iconPrefix: 'fi-',
        },
        instance: (isInputHidden)
          ? instance as {ref: HTMLButtonElement}
          : {ref: undefined},
        isAttachedOnRight: !isInputHidden,
        isStatic: true,
        level: BUTTON_LEVEL_OUTLINE,
        size,
      }
    },
    type: COMPONENT_BUTTON,
  })

  const fieldConfig : ComponentTextInput = $derived({
    input: {
      config: mergeProperties(
        childrenConfig?.field,
        childrenConfig?.[1],
        passthrough,
        {
          instance,
          isAttachedOnLeft: true,
          onFocus,
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
  <ClusterWrapped componentConfig={configParsed}
    {data}
    mask={extendedMask}
    {maskPartReducer}
    bind:value={value} />
{/key}
