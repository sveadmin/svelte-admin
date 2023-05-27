<script lang="ts">
  import {
    Svg
  } from '@sveadmin/element'

  export let title = '',
    value = ''

</script>
{#if value !== null}
  <datacellcontent>
    <Svg
      preview={true}
      {title}
      {value} />
  </datacellcontent>
{/if}