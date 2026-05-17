<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    ariaParser,
    childParser,
    dataParser,
    normalizeArray,
    normalizeIcon,
  } from '$lib/helper/index.js'

  import {
    Button
  } from '$lib/button/index.js'

  import type {
    ButtonInputProps
  } from '$lib/button/index.js'

  import type {
    ImageWrappedDisplayProps
  } from '$lib/image/index.js'

  import type {
    TagProps,
  } from './types.js'

  import { renderTag as defaultRenderTag } from './default-render-tag.svelte'

  import { defaultRenderIcon } from './render-icon.svelte'

  import './tag.css'

  let {
    aria = {},
    action = $bindable([]),
    buttonClass = $bindable([]),
    buttonStyle = $bindable([]),
    children,
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    data = $bindable({}),
    icon = $bindable([]),
    iconClass = $bindable([]),
    iconStyle = $bindable([]),
    iconRenderer = defaultRenderIcon,
    id = $bindable('tag-' + Math.random().toString(36).substring(2, 6)),
    optionStore,
    onClick,
    onMouseDown,
    onMouseUp,
    renderTag = defaultRenderTag,
    size = SIZE_MEDIUM,
    style = $bindable([]),
    value = $bindable(''),
  } : TagProps = $props()


  let actions: ButtonInputProps[] = $derived((Array.isArray(action)) ? action : [action]),
    ariaParsed: {[key: string] : string} = $derived(ariaParser(aria)),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    iconParsed = $derived(normalizeIcon(icon)),
    styles: string[] = $state(normalizeArray(style, ';'))

  const iconPropertyOverwrite = {
    class: iconClass,
    style: iconStyle,
    visibleHeight: '1em',
    visibleWidth: '1em',
  }

  const iconConfig : ImageWrappedDisplayProps = childParser(childrenConfig, 0, iconPropertyOverwrite)

  const buttonPropertyOverwrite = {
    class: buttonClass,
    style: buttonStyle,
  }

  const buttonConfig : ButtonInputProps = childParser(childrenConfig, 1, buttonPropertyOverwrite)

</script>
{#if value || children}
  <sveatag {...ariaParsed}
    class={classes.join(' ')}
    data-size={size}
    {...dataParsed}
    {id}
    {onClick}
    {onMouseDown}
    {onMouseUp}
    style={styles.join(';')} >
    {#if iconParsed}
      {@render iconRenderer(iconParsed, iconConfig)}
    {/if}
    {#if children}
      {@render children()}
    {:else}
      {@render renderTag(value, optionStore)}
    {/if}
    {#each actions as currentAction}
      <Button {...buttonConfig} {...currentAction} />
    {/each}
  </sveatag> 
{/if}
