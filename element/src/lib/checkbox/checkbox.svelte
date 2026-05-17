<script lang="ts">
  import {
    normalizeArray,
    mergeProperties,
  } from '$lib/helper/index.js'

  import type {
    CheckboxInputProps,
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
    isHintHidden = false,
    isStateColorHidden = true,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    renderLabel = renderCheckboxLabel,
    value = $bindable(true),
    ...passthrough
  } : CheckboxInputProps = $props()

  const commonHintProperties = {
      class: hintClass,
      style: hintStyle
    }

  const falseHintConfig : CheckboxSwitchFalseHintProps = $derived(mergeProperties(
      childrenConfig?.falseHint,
      childrenConfig?.[3],
      childrenConfig?.hint,
      childrenConfig?.[1],
      commonHintProperties,
      {
        isFalseHintHidden: isHintHidden
      },
    ))
  
  const labelConfig : CheckboxSwitchLabelProps = $derived(mergeProperties(
      childrenConfig?.label,
      childrenConfig?.[0],
      {
        class: labelClass,
        style: labelStyle
      },
      {
        class: 'sliderDisabled'
      },
      (isStateColorHidden)
        ? {
          class: 'stateColorHidden'
        }
        : {}
    ))

  const trueHintConfig : CheckboxSwitchTrueHintProps = $derived(mergeProperties(
      childrenConfig?.trueHint,
      childrenConfig?.[2],
      childrenConfig?.hint,
      childrenConfig?.[1],
      commonHintProperties,
      {
        isTrueHintHidden: isHintHidden
      },
    ))

  let labelClasses: string[] = $derived(normalizeArray(labelConfig?.class, ' '))

  let childrenPassthroughConfig = $derived([
    labelConfig,
    trueHintConfig,
    falseHintConfig,
  ])
</script>

<CheckboxSwitch childrenConfig={childrenPassthroughConfig}
  labelClass={labelClasses}
  {renderLabel}
  bind:value={value}
  {...passthrough} />