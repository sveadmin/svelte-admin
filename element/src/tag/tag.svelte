<script lang="ts">
  import { SvelteComponent } from 'svelte'
  import { Link } from '../main.js'

  import {
    TAG_TYPE_NEUTRAL,
    TagType,
  } from './types.js'

  export let component: typeof SvelteComponent = null,
    componentAttributes: {[key: string] : any} = {},
    getTagType: {({}) : TagType} = item => tagType,
    getValue: {({}) : string} = item => item.toString(),
    items: {}[],
    tagType: TagType = TAG_TYPE_NEUTRAL

</script>
{#each items as item}
  <sveatag class={getTagType(item)} >
    {#if component}
      <svelte:component this={component} {...componentAttributes} />
    {:else}
      {getValue(item)}
    {/if}
  </sveatag> 
{/each}

<style global src="./tag.css"></style>