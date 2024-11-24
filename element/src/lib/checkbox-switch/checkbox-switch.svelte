<script lang="ts">
  import {
    noop
  } from '@sveadmin/common'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    CheckboxSwitchProps,
  } from './types.js'

  import './checkbox-switch.css'

  let {
    areBothValuesVisible = false,
    class: classList = $bindable([]),
    data = {},
    isDisabled = false,
    id = 'switch-' + Math.random().toString(36).substring(2, 6),
    labelClass = $bindable([]),
    labels = {},
    labelStyle = $bindable([]),
    onChange = noop,
    onClick = noop,
    style = $bindable([]),
    tabIndex = 0,
    value = $bindable(true),
  } : CheckboxSwitchProps = $props()

  const {
    false: falseLabel = 'False',
    true: trueLabel = 'True',
  } = labels

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';')),
    labelClasses: string[] = $state(normalizeArray(labelClass, ' ')),
    labelStyles: string[] = $state(normalizeArray(labelStyle, ';'))

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
  <sveatruelabel
    class={labelClasses.join(' ')}
    class:inactive={areBothValuesVisible && !value}
    style={labelStyles.join(';')} >
    {trueLabel}
  </sveatruelabel>
{/snippet}

{#snippet falselabel()}
  <sveafalselabel
    class={labelClasses.join(' ')}
    class:inactive={areBothValuesVisible && value}
    style={labelStyles.join(';')} >
    {falseLabel}
  </sveafalselabel>
{/snippet}

<sveacheckboxswitchcontainer
  class={classes.join(' ')}
  style={styles.join(';')}
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
--><label class={labelClasses.join(' ')} for={id} style={labelStyles.join(';')}></label><!--
-->{#if areBothValuesVisible
    || value}
    {@render truelabel()}
  {:else}
    {@render falselabel()}
  {/if}
</sveacheckboxswitchcontainer>