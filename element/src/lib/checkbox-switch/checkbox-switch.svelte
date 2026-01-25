<script lang="ts">
  import {
    noopTrue,
  } from '@sveadmin/common'

  import {
    childParser,
    dataParser,
    mergeClasses,
    mergeStyles,
    normalizeArray,
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

  const falseHintConfig : CheckboxSwitchFalseHintProps = childParser(childrenConfig, 2),
    labelConfig : CheckboxSwitchLabelProps = childParser(childrenConfig),
    trueHintConfig : CheckboxSwitchTrueHintProps = childParser(childrenConfig, 1)

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    inputOnKeyUp = wrapOnKeyPress(allowSwitch, onKeyUp),
    localClasses: string[] = $state([]),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let derivedClasses = $derived(classes.concat(localClasses)),
    falseHintClasses: string[] = $derived.by(() => {
      const classes = mergeClasses(hintClass, falseHintConfig?.class)
      const inactiveClassIndex = classes.indexOf('inactive')
      if (areBothHintsDisplayed && value) {
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
    falseHintStyles: string[] = $derived.by(() => {
      return mergeStyles(labelStyle, falseHintConfig?.style)
    }),
    labelClasses: string[] = $derived.by(() => {
      return mergeClasses(labelClass, labelConfig?.class)
    }),
    labelStyles: string[] = $derived.by(() => {
      return mergeStyles(labelStyle, labelConfig?.style)
    }),
    trueHintClasses: string[] = $derived.by(() => {
      const classes = mergeClasses(hintClass, trueHintConfig?.class)
      const inactiveClassIndex = classes.indexOf('inactive')
      if (areBothHintsDisplayed && !value) {
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
    trueHintStyles: string[] = $derived.by(() => {
      return mergeStyles(labelStyle, trueHintConfig?.style)
    })

  if (isAttachedOnLeft) {
    localClasses.push('attachLeft')
  }
  if (isAttachedOnRight) {
    localClasses.push('attachRight')
  }
  if (isAttachedOnLeft
    || isAttachedOnRight) {
    localClasses.push('inputBorder')
  }

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
    bind:this={instance.ref}><!--
--><label class={labelClasses.join(' ')} for={id} style={labelStyles.join(';')}>
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