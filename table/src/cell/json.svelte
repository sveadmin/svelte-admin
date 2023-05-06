<script>
  import JsonDisplay from '../../block/json.svelte'
  
  export let value = '', format;
</script>
{#if value}
  <JsonDisplay {value} {format} preview={true} />
{/if}