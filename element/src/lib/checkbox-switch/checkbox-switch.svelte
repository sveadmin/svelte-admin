<script lang="ts">
  import {
    noop
  } from '@sveadmin/common'

  import type {
    CheckboxSwitchProps,
  } from './types.js'

  import './checkbox-switch.css'

  let {
    areBothValuesVisible = false,
    classList = '',
    data = {},
    isDisabled = false,
    id = 'switch-' + Math.random().toString(36).substring(2, 6),
    labels = {},
    onChange = noop,
    onClick = noop,
    style = '',
    tabIndex = 0,
    value = $bindable(true),
  } : CheckboxSwitchProps = $props()

  const {
    false: falseLabel = 'False',
    true: trueLabel = 'True',
  } = labels

  const onClickWraper = (event:Event) => {
    event.stopPropagation()
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    onClick(event)
  }
</script>

{#snippet truelabel()}
  <sveatruelabel class:inactive={areBothValuesVisible && !value}>{trueLabel}</sveatruelabel>
{/snippet}

{#snippet falselabel()}
  <sveafalselabel class:inactive={areBothValuesVisible && value}>{falseLabel}</sveafalselabel>
{/snippet}

<sveacheckboxswitchcontainer
  class={classList}
  {style}
  >
  {#if areBothValuesVisible}
    {@render falselabel()}
  {/if}<!--
--><input {...Object.keys(data).reduce((aggregator: {[key: string] : string}, key: string) => {
        aggregator[`data-${key}`] = data[key]
        return aggregator
      }, {})}
    {id}
    aria-checked={value}
    bind:checked={value}
    disabled={isDisabled}
    type='checkbox'
    onchange={onChange}
    onclick={onClickWraper}
    onkeyup={onClickWraper}
    tabindex={tabIndex} ><!--
--><label for={id}></label><!--
-->{#if areBothValuesVisible
    || value}
    {@render truelabel()}
  {:else}
    {@render falselabel()}
  {/if}
</sveacheckboxswitchcontainer>