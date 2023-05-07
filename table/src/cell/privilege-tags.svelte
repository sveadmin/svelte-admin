<script>
  import { onMount } from 'svelte'
  export let value = {}, values = [], getKey

  let lookupTable = {}

  const setLookTable = () => {
    lookupTable = values.reduce(
      (aggregator, row) => {
        if (!lookupTable[row.id]) {
          lookupTable[row.id] = row.value
        }
        return aggregator;
      },
      lookupTable
    )
  }

  onMount(() => {
    setLookTable()
  });
</script>
{#if value !== null}
  <datacellcontent class="privileges">
  {#each value as privilege}
    <tag class:allowed={privilege.status === 'allowed'}>{lookupTable[privilege.privilegeId]}</tag> 
  {/each}
  </datacellcontent>
{/if}