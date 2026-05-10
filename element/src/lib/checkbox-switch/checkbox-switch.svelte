<script lang="ts">
  import {
    noopTrue,
  } from '@sveadmin/common'

  import {
    BUTTON_LEVEL_OUTLINE,
  } from '$lib/types.js'

  import {
    dataParser,
    normalizeArray,
    propertyMerger,
    wrapOnKeyPress,
  } from '$lib/helper/index.js'

  import {
    allowSwitch,
  } from './action/index.js'

  import type {
    CheckboxSwitchFalseHintProps,
    CheckboxSwitchLabelProps,
    CheckboxSwitchProps,
    CheckboxSwitchTrueHintProps,
  } from './types.js'
 
  import { renderFalseHint as defaultRenderFalseHint } from './render-false-hint.svelte'
  import { renderTrueHint as defaultRenderTrueHint } from './render-true-hint.svelte'

  import './checkbox-switch.css'

  let {
    areBothHintsDisplayed = false,
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    data = {},
    falseHint = 'False',
    hintClass = $bindable([]),
    hintStyle = $bindable([]),
    id = 'switch-' + Math.random().toString(36).substring(2, 6),
    instance = $bindable({ref: undefined}),
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isDisabled = false,
    isFalseHintHidden = false,
    isTrueHintHidden = false,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    onChange = noopTrue,
    onClick = noopTrue,
    onInput = noopTrue,
    onKeyUp = noopTrue,
    renderFalseHint = defaultRenderFalseHint,
    renderLabel,
    renderTrueHint = defaultRenderTrueHint,
    size,
    style = $bindable([]),
    tabIndex = 0,
    trueHint = 'True',
    value = $bindable(true),
  } : CheckboxSwitchProps = $props()

  const falseHintConfig : CheckboxSwitchFalseHintProps = $derived(propertyMerger(
    childrenConfig?.falseHint,
    childrenConfig?.[2],
    {
      class: hintClass,
      style: hintStyle,
    },
    (areBothHintsDisplayed && value)
      ? {
        class: 'inactive'
      }
      : {}
  ))

  const labelConfig : CheckboxSwitchLabelProps = $derived(propertyMerger(
    childrenConfig?.label,
    childrenConfig?.[0],
    {
      class: labelClass,
      style: labelStyle,
    },
  ))

  const trueHintConfig : CheckboxSwitchTrueHintProps = $derived(propertyMerger(
    childrenConfig?.trueHint,
    childrenConfig?.[1],
    {
      class: hintClass,
      style: hintStyle,
    },
    (areBothHintsDisplayed && !value)
      ? {
        class: 'inactive'
      }
      : {}
  ))

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    inputOnKeyUp = wrapOnKeyPress(allowSwitch, onKeyUp),
    localClasses: string[] = $derived.by(() => {
      const classes = []
      if (isAttachedOnLeft) {
        classes.push('attachLeft')
      }
      if (isAttachedOnRight) {
        classes.push('attachRight')
      }
      if (isAttachedOnLeft
        || isAttachedOnRight) {
        classes.push(BUTTON_LEVEL_OUTLINE)
      }
      return classes
    }),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let derivedClasses = $derived(classes.concat(localClasses)),
    falseHintClasses: string[] = $derived(normalizeArray(falseHintConfig?.class, ' ')),
    falseHintStyles: string[] = $derived(normalizeArray(falseHintConfig?.style, ';')),
    labelClasses: string[] = $derived(normalizeArray(labelConfig?.class, ' ')),
    labelStyles: string[] = $derived(normalizeArray(labelConfig?.style, ';')),
    trueHintClasses: string[] = $derived(normalizeArray(trueHintConfig?.class, ' ')),
    trueHintStyles: string[] = $derived(normalizeArray(trueHintConfig?.style, ';'))


  $effect(() => {
    isFalseHintHidden = falseHintConfig?.isFalseHintHidden ?? isFalseHintHidden
  })

  $effect(() => {
    isTrueHintHidden = trueHintConfig?.isTrueHintHidden ?? isTrueHintHidden
  })

</script>

<sveacheckboxswitchcontainer
  class={derivedClasses.join(' ')}
  data-size={size}
  style={styles.join(';')}
  >
  {#if areBothHintsDisplayed && !isFalseHintHidden}
    {@render renderFalseHint(falseHint, falseHintClasses, falseHintStyles)}
  {/if}<!--
--><input {...dataParsed}
    {id}
    aria-checked={value}
    bind:checked={value}
    disabled={isDisabled}
    type='checkbox'
    onchange={onChange}
    onclick={onClick}
    oninput={onInput}
    onkeyup={inputOnKeyUp}
    tabindex={tabIndex}
    bind:this={instance.ref}
    ><label class={labelClasses.join(' ')} for={id} style={labelStyles.join(';')}>
    {#if renderLabel}
      {@render renderLabel(value)}
    {/if}
    </label><!--
-->{#if areBothHintsDisplayed
    || value}
    {#if !isTrueHintHidden}
      {@render renderTrueHint(trueHint, trueHintClasses, trueHintStyles)}
    {/if}
  {:else if !isFalseHintHidden}
    {@render renderFalseHint(falseHint, falseHintClasses, falseHintStyles)}
  {/if}
</sveacheckboxswitchcontainer>