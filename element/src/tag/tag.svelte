<script lang="ts">
  import { SvelteComponent } from 'svelte'
  import { Link } from '../main.js'

  import {
    Tag,
    TAG_TYPE_NEUTRAL,
    TagType,
  } from './types.js'

  export let getParameters: {({}) : {}} = item => item,
    statusCheck: {({}) : TagType} = item => tagType,
    value: Tag[],
    tagType: TagType = TAG_TYPE_NEUTRAL

</script>
{#if value}
  {#each value as item}
    <sveatag class={statusCheck(item)} >
      {#if item.route}
        <Link namedParameters={getParameters(item)} 
          name={item.route} 
          value={item.value} />
      {:else}
        {item.value}
      {/if}
    </sveatag> 
  {/each}
{/if}

<style global src="./tag.css"></style>