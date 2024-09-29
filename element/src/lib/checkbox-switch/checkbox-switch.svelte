<script lang="ts">
  import {
    noop
  } from '@sveadmin/common'

  import type {
    CheckboxSwitchProps,
  } from './types.js'

  import './checkbox-switch.css'

  let {
    classList = '',
    data = {},
    getValue = () => value,
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

  const getIsDisabled = (typeof isDisabled === 'function')
    ? isDisabled
    : () => isDisabled

  const onClickWraper = (event:Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    onClick(event)
  }

  $effect(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })

</script>

<sveacheckboxswitchcontainer aria-checked={value}
  class={classList}
  {style}
  onclick={onClickWraper}
  onkeyup={onClickWraper}
  role='checkbox'
  tabindex={tabIndex}
  ><!--
--><input {...Object.keys(data).reduce((aggregator: {[key: string] : string}, key: string) => {
        aggregator[`data-${key}`] = data[key]
        return aggregator
      }, {})}
    {id}
    bind:checked={value}
    disabled={getIsDisabled()}
    type='checkbox'
    onchange={onChange} ><!--
--><label for={id}></label>
  {#if value}
    <sveatruelabel>{trueLabel}</sveatruelabel>
  {:else}
    <sveafalselabel>{falseLabel}</sveafalselabel>
  {/if}
</sveacheckboxswitchcontainer>