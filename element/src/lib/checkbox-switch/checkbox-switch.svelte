<script lang="ts">
  import {
    noopTrue,
    rune,
  } from '@sveadmin/common'

  import type {
    Rune,
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
    onChange = noopTrue,
    onClick = noopTrue,
    onInput = noopTrue,
    size,
    style = $bindable([]),
    tabIndex = 0,
    value = $bindable(true),
  } : CheckboxSwitchProps = $props()

  const {
    false: falseLabel = 'False',
    true: trueLabel = 'True',
  } = labels

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    }),
    labelClasses: string[] = $derived(normalizeArray(labelClass, ' ')),
    labelStyles: string[] = $derived(normalizeArray(labelStyle, ';')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  const onClickWraper = (event:Event) => {
    event.stopPropagation()
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    onClick(event)
  }
</script>

{#snippet truelabel(value: boolean)}
  <sveatruelabel
    class={labelClasses.join(' ')}
    class:inactive={areBothValuesVisible && !value}
    style={labelStyles.join(';')} >
    {trueLabel}
  </sveatruelabel>
{/snippet}

{#snippet falselabel(valule: boolean)}
  <sveafalselabel
    class={labelClasses.join(' ')}
    class:inactive={areBothValuesVisible && value}
    style={labelStyles.join(';')} >
    {falseLabel}
  </sveafalselabel>
{/snippet}

<sveacheckboxswitchcontainer
  class={classes.join(' ')}
  data-size={size}
  style={styles.join(';')}
  >
  {#if areBothValuesVisible}
    {@render falselabel(value)}
  {/if}<!--
--><input {...dataParsed}
    {id}
    aria-checked={value}
    bind:checked={value}
    disabled={isDisabled}
    type='checkbox'
    onchange={onChange}
    onclick={onClickWraper}
    oninput={onInput}
    onkeyup={onClickWraper}
    tabindex={tabIndex} ><!--
--><label class={labelClasses.join(' ')} for={id} style={labelStyles.join(';')}></label><!--
-->{#if areBothValuesVisible
    || value}
    {@render truelabel(value)}
  {:else}
    {@render falselabel(value)}
  {/if}
</sveacheckboxswitchcontainer>