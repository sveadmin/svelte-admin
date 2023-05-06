<script>
  import Link from '../../block/link.svelte'

  export let value, name, attributes
</script>
{#if value}
  <datacellcontent><Link {value} {name} {attributes}/></datacellcontent>
{/if}