<script lang="ts">
  import {
    childParser,
    mergeClasses,
    mergeStyles,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    CheckboxHintProps,
    CheckboxLabelProps,
    CheckboxProps,
  } from './types.js'
 
  import {
    CheckboxSwitch,
    renderFalseHint,
    renderTrueHint,
  } from '$lib/checkbox-switch/index.js'
 
  import type {
    CheckboxSwitchFalseHintProps,
    CheckboxSwitchLabelProps,
    CheckboxSwitchTrueHintProps,
  } from '$lib/checkbox-switch/index.js'

  import {
    renderCheckboxLabel,
  } from './render-checkbox-label.svelte'

  import './checkbox.css'

  let {
    childrenConfig = $bindable({}),
    hint = '',
    id = 'checkbox-' + Math.random().toString(36).substring(2, 6),
    instance = $bindable(),
    isHintHidden = false,
    isStateColorHidden = true,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    renderLabel = renderCheckboxLabel,
    value = $bindable(true),
    ...passthrough
  } : CheckboxProps = $props()

  const hintConfig = childParser(childrenConfig, 1, )

  const falseHintConfig : CheckboxSwitchFalseHintProps = childParser(childrenConfig, 1),
    labelConfig : CheckboxSwitchLabelProps = childParser(childrenConfig),
    trueHintConfig : CheckboxSwitchTrueHintProps = childParser(childrenConfig, 1)

  let labelClasses: string[] = $derived.by(() => {
    let classes = normalizeArray([...labelClass], ' ')

    if (classes.indexOf('sliderDisabled') === -1) {
      classes.push('sliderDisabled')
    }

    const classIndex = classes.indexOf('stateColorHidden')
    if (isStateColorHidden) {
      if (classIndex === -1) {
        classes.push('stateColorHidden')
      }
    } else {
      if (classIndex !== -1) {
        classes.slice(classIndex, 1)
      }
    }

    return classes
  })
</script>

<CheckboxSwitch childrenConfig={[labelConfig, trueHintConfig, falseHintConfig]}
  {instance}
  isFalseHintHidden={isHintHidden}
  isTrueHintHidden={isHintHidden}
  labelClass={labelClasses}
  {renderLabel}
  bind:value={value}
  {...passthrough} />