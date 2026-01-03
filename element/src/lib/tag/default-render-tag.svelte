<script lang="ts">
  import type {
    Option,
    OptionStore,
  } from '$lib/types.js'

  export { renderTag }
</script>
  
{#snippet renderTag(value: Option | string, options?: OptionStore)}
  {#if options}
    {options.getDisplayValue((typeof value === 'string') ? options.getKeyByValue(value) : options.getKeyByValue(value.value))}
  {:else}
    {(typeof value === 'string') ? value : value.value}
  {/if}
{/snippet}