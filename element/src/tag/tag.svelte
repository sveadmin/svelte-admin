<script lang="ts">
  import { SvelteComponent } from 'svelte'
  import { Link } from '../main.js'

  import {

  } from '@sveadmin/table'

  import {
    Tag,
    TAG_TYPE_NEUTRAL,
    DISPLAY_TAG_COMBO,
    DISPLAY_TAG_VALUE,
    TagType,
  } from './types.js'

  export let display: string = DISPLAY_TAG_VALUE,
    getParameters: {({}) : {}} = item => item,
    statusCheck: {({}) : TagType} = item => tagType,
    value: Tag[],
    tagType: TagType = TAG_TYPE_NEUTRAL

  const getValue = (item) => {
    return (display === DISPLAY_TAG_COMBO) ? `${item.id}: ${item.value}` : item.value
  }

</script>
{#if value}
  {#each value as item}
    <sveatag class={statusCheck(item)} >
      {#if item.route}
        <Link namedParameters={getParameters(item)} 
          name={item.route} 
          value={getValue(item)} />
      {:else}
        {getValue(item)}
      {/if}
    </sveatag> 
  {/each}
{/if}

<style global src="./tag.css"></style>