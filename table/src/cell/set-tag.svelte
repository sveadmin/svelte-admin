<script>
  export let value = []
</script>
{#if value !== null}
  <datacellcontent class="privileges">
  {#each value as set}
    <tag
      class:upcoming={set.status === 'upcoming'}
      class:started={set.status === 'started'}
      class:finished={set.status === 'finished'}>
      {set.id} | {set.homeOrganization && set.homeOrganization.tag} vs {set.awayOrganization && set.awayOrganization.tag}
    </tag> 
  {/each}
  </datacellcontent>
{/if}