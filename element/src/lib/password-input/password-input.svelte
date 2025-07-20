<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    normalizeArray,
    focusPrevious,
  } from '$lib/helper/index.js'

  import {
    type ButtonInputProps,
  } from '$lib/button/index.js';

  import {
    type TextInputPartText,
  } from '$lib/text-input/index.js'

  import type {
    PasswordInputProps,
  } from './types.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js';

  let {
    class: classList = $bindable([]),
    isRevealed = $bindable(false),
    value = $bindable(''),
    size = SIZE_MEDIUM,
    ...passthrough
  } : PasswordInputProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    derivedClasses: string[] = $state([]),
    localClasses: string[] = $state([])

  $effect(() => {
    derivedClasses = classes.concat(localClasses)
  })

  let revealIcon = $derived.by(() => {
    return (isRevealed)
      ? 'eye-closed'
      : 'eye'
  })

  const reveal = (e: Event) => {
    const target = e.target as HTMLInputElement
    isRevealed = !isRevealed
    focusPrevious(target)
  }

  let buttonConfig : ButtonInputProps = $derived({
      childrenStyle: ((!size || size === SIZE_MEDIUM) ? 'font-size:1.125em' : 'font-size:1.15em'),
      class: ['inputBorder'],
      isAttachedOnLeft: true,
      leftIcon: revealIcon,
      onClick: reveal,
      size,
      type: 'button',
    }
  )

  let hiddenConfig : TextInputPartText = $derived({
      editor: {
        class: derivedClasses,
        size,
        ...passthrough,
      },
      type: 'password',
    }
  )

  let reveleadConfig : TextInputPartText = $derived({
      editor: {
        class: derivedClasses,
        size,
        ...passthrough,
      },
      type: 'text',
    }
  )

  let mask = $derived.by(() => {
    const mask = []
    mask.push((isRevealed)
      ? reveleadConfig
      : hiddenConfig)
    mask.push(buttonConfig)
    return mask
  })

  localClasses.push('attachRight')

</script>

<InputCluster {mask} bind:value={value}/>