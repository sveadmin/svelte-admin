<script lang="ts">
  import {
    tick,
  } from 'svelte'

  import {
    noopTrue,
    rune,
  } from '@sveadmin/common'

  import type {
    Rune,
  } from '@sveadmin/common'

  import {
    childParser,
    mergeClasses,
    mergeStyles,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    CheckboxSwitchFalseLabelProps,
    CheckboxSwitchInputProps,
    CheckboxSwitchProps,
    CheckboxSwitchTrueLabelProps,
  } from './types.js'
 
  import { renderFalseLabel as defaultRenderFalselabel } from './render-false-label.svelte'
  import { renderTrueLabel as defaultRenderTruelabel } from './render-true-label.svelte'

  import './checkbox-switch.css'

  let {
    areBothValuesVisible = false,
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    data = {},
    falseLabel = 'False',
    id = 'switch-' + Math.random().toString(36).substring(2, 6),
    inputClass = $bindable([]),
    inputStyle = $bindable([]),
    instance = $bindable(),
    isDisabled = false,
    isFalseLabelHidden = false,
    isTrueLabelHidden = false,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    onChange = noopTrue,
    onClick = noopTrue,
    onInput = noopTrue,
    renderFalseLabel = defaultRenderFalselabel,
    renderLabel,
    renderTrueLabel = defaultRenderTruelabel,
    size,
    style = $bindable([]),
    tabIndex = 0,
    trueLabel = 'True',
    value = $bindable(true),
  } : CheckboxSwitchProps = $props()

  const falseLabelConfig : CheckboxSwitchFalseLabelProps = childParser(childrenConfig, 2),
    InputConfig : CheckboxSwitchInputProps = childParser(childrenConfig, 1),
    trueLabelConfig : CheckboxSwitchTrueLabelProps = childParser(childrenConfig)

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    }),
    falseLabelClasses: string[] = $derived.by(() => {
      const classes = mergeClasses(labelClass, falseLabelConfig?.class)
      const inactiveClassIndex = classes.indexOf('inactive')
      if (areBothValuesVisible && value) {
        if (inactiveClassIndex === -1) {
          classes.push('inactive')
        }
      } else {
        if (inactiveClassIndex !== -1) {
          classes.splice(inactiveClassIndex, 1)
        }
      }
      return classes
    }),
    falseLabelStyles: string[] = $derived.by(() => {
      return mergeStyles(labelStyle, falseLabelConfig?.style)
    }),
    inputClasses: string[] = $derived(normalizeArray(inputClass, ' ')),
    inputStyles: string[] = $derived(normalizeArray(inputStyle, ';')),
    styles: string[] = $derived(normalizeArray(style, ';')),
    trueLabelClasses: string[] = $derived.by(() => {
      const classes = mergeClasses(labelClass, falseLabelConfig?.class)
      const inactiveClassIndex = classes.indexOf('inactive')
      if (areBothValuesVisible && !value) {
        if (inactiveClassIndex === -1) {
          classes.push('inactive')
        }
      } else {
        if (inactiveClassIndex !== -1) {
          classes.splice(inactiveClassIndex, 1)
        }
      }
      return classes
    }),
    trueLabelStyles: string[] = $derived.by(() => {
      return mergeStyles(labelStyle, trueLabelConfig?.style)
    })

  const onClickWraper = (event:Event) => {
    event.stopPropagation()
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    onClick(event)
  }

  const onInputWrapper = (event?: (Event & { currentTarget: EventTarget & HTMLInputElement; })) : boolean => {
    const result = onInput(event)
    tick()

    console.log('????', instance?.checked, value)

    return result
  }

  $effect(() => {
    isFalseLabelHidden = falseLabelConfig?.isFalseLabelHidden ?? isFalseLabelHidden
  })

  $effect(() => {
    isTrueLabelHidden = trueLabelConfig?.isTrueLabelHidden ?? isTrueLabelHidden
  })

</script>

<!-- {#snippet truelabel(value: boolean)}
  <sveatruelabel
    class={labelClasses.join(' ')}
    class:inactive={areBothValuesVisible && !value}
    style={labelStyles.join(';')} >
    {trueLabel}
  </sveatruelabel>
{/snippet}

{#snippet falselabel(value: boolean)}
  <sveafalselabel
    class={labelClasses.join(' ')}
    class:inactive={areBothValuesVisible && value}
    style={labelStyles.join(';')} >
    {falseLabel}
  </sveafalselabel>
{/snippet} -->

<sveacheckboxswitchcontainer
  class={classes.join(' ')}
  data-size={size}
  style={styles.join(';')}
  >
  {#if areBothValuesVisible && !isFalseLabelHidden}
    {@render renderFalseLabel(falseLabel, falseLabelClasses, falseLabelStyles)}
  {/if}<!--
--><input {...dataParsed}
    {id}
    aria-checked={value}
    bind:checked={value}
    disabled={isDisabled}
    type='checkbox'
    onchange={onChange}
    onclick={onClickWraper}
    oninput={onInputWrapper}
    onkeyup={onClickWraper}
    tabindex={tabIndex}
    bind:this={instance}><!--
--><label class={inputClasses.join(' ')} for={id} style={inputStyles.join(';')}>
    {#if renderLabel}
      {@render renderLabel(value)}
    {/if}
    </label><!--
-->{#if areBothValuesVisible
    || value}
    {#if !isTrueLabelHidden}
      {@render renderTrueLabel(trueLabel, trueLabelClasses, trueLabelStyles)}
    {/if}
  {:else if !isFalseLabelHidden}
    {@render renderFalseLabel(falseLabel, falseLabelClasses, falseLabelStyles)}
  {/if}
</sveacheckboxswitchcontainer>