<script lang="ts">
  import {
    normalizeArray,
    focusPrevious,
  } from '$lib/helper/index.js'

  import {
    Button,
    type ButtonInputProps,
    type ButtonProps,
  } from '$lib/button/index.js';

  import {
    TextInput,
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
      ? 'xmark'
      : 'check'
  })

  const reveal = (e: Event) => {
    const target = e.target as HTMLInputElement
    isRevealed = !isRevealed
    focusPrevious(target)
  }

  let buttonConfig : ButtonInputProps = $derived({
      callback: reveal,
      class: ['inputBorder', 'attachLeft'],
      leftIcon: revealIcon,
      type: 'button',
    }
  )

  let hiddenConfig : TextInputPartText = $derived({
      editor: {
        class: derivedClasses,  
        ...passthrough,
      },
      type: 'password',
    }
  )

  let reveleadConfig : TextInputPartText = $derived({
      editor: {
        class: derivedClasses,
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
{#snippet revealButton()}
  <Button callback={reveal} class="inputBorder attachLeft" leftIcon={revealIcon}/>
{/snippet}

{#if isRevealed}
  <TextInput bind:value={value} bind:class={derivedClasses} {...passthrough} />{@render revealButton()}
{:else}
  <TextInput bind:value={value} bind:class={derivedClasses} {...passthrough} type="password" />{@render revealButton()}
{/if}


<InputCluster {mask} bind:value={value}/>