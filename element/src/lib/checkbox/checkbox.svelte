<script lang="ts">
  import {
    childParser,
    mergeClasses,
    mergeStyles,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    CheckboxProps,
  } from './types.js'
 
  import {
    CheckboxSwitch,
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
    hintClass = $bindable([]),
    hintStyle = $bindable([]),
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

  const falseHintConfig : CheckboxSwitchFalseHintProps = childParser(childrenConfig, 1),
    labelConfig : CheckboxSwitchLabelProps = childParser(childrenConfig),
    trueHintConfig : CheckboxSwitchTrueHintProps = childParser(childrenConfig, 1)

  falseHintConfig.class = mergeClasses(falseHintConfig.class, hintClass)
  falseHintConfig.isFalseHintHidden = falseHintConfig.isFalseHintHidden ?? isHintHidden
  falseHintConfig.style = mergeStyles(falseHintConfig.style, hintStyle)
  trueHintConfig.class = mergeClasses(trueHintConfig.class, hintClass)
  trueHintConfig.isTrueHintHidden = trueHintConfig.isTrueHintHidden ?? isHintHidden
  trueHintConfig.style = mergeStyles(trueHintConfig.style, hintStyle)

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

  let childrenPassthroughConfig = $derived([
    labelConfig,
    trueHintConfig,
    falseHintConfig,
  ])
</script>

<CheckboxSwitch childrenConfig={childrenPassthroughConfig}
  {instance}
  labelClass={labelClasses}
  {renderLabel}
  bind:value={value}
  {...passthrough} />