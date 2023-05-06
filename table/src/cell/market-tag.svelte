<script>
  import { LinkedTag } from '../../block'

  export let name = 'market', //This needs to be equal to the name of route in admin
    value = [], values = []
</script>
{#if value !== null}
  <datacellcontent class="privileges">
    <LinkedTag
      {name}
      {value}
      {values} />
  </datacellcontent>
{/if}