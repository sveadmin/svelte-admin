<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'


  import type {
    TagProps,
  } from './types.js'

  import { renderTag as defaultRenderTag } from './default-render-tag.svelte'

  import './tag.css'

  let {
    class: classList = $bindable([]),
    data = $bindable({}),
    id = $bindable('tag-' + Math.random().toString(36).substring(2, 6)),
    optionStore,
    onClick,
    onMouseDown,
    onMouseUp,
    renderTag = defaultRenderTag,
    size,
    style = $bindable([]),
    value = $bindable(''),
  } : TagProps = $props()


  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    }),
    styles: string[] = $state(normalizeArray(style, ';'))

</script>
{#if value}
  <sveatag class={classes.join(' ')}
    data-size={size}
    {...dataParsed}
    {id}
    {onClick}
    {onMouseDown}
    {onMouseUp}
    style={styles.join(';')} >
    {@render renderTag(value, optionStore)}
  </sveatag> 
{/if}
