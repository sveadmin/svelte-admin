<script>
  import { CompetitionTag } from '../../block'
  export let value = []
</script>
{#if value !== null}
  <datacellcontent class="privileges">
    <CompetitionTag {value} />
  </datacellcontent>
{/if}