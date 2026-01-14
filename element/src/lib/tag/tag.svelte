<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    childParser,
    normalizeArray,
    normalizeIcon,
  } from '$lib/helper/index.js'

  import {
    Button
  } from '$lib/button/index.js'

  import type {
    ButtonProps
  } from '$lib/button/index.js'

  import type {
    ImageWrappedProps
  } from '$lib/image/index.js'

  import type {
    TagProps,
  } from './types.js'

  import { renderTag as defaultRenderTag } from './default-render-tag.svelte'

  import { defaultRenderIcon } from './render-icon.svelte'

  import './tag.css'

  let {
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


  let actions: ButtonProps[] = $derived((Array.isArray(action)) ? action : [action]),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    }),
    iconParsed = $derived(normalizeIcon(icon)),
    styles: string[] = $state(normalizeArray(style, ';'))

  const iconPropertyOverwrite = {
    class: iconClass,
    style: iconStyle,
  }

  const iconConfig : ImageWrappedProps = childParser(childrenConfig, 0, iconPropertyOverwrite)

  const buttonPropertyOverwrite = {
    class: buttonClass,
    style: buttonStyle,
  }

  const buttonConfig : ButtonProps = childParser(childrenConfig, 1, buttonPropertyOverwrite)

</script>
{#if value || children}
  <sveatag class={classes.join(' ')}
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
