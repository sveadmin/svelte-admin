<script lang="ts">
  import {
    Svg
  } from '@sveadmin/element'

  export let title = '',
    value = ''

</script>
{#if value !== null}
  <sveadatacellcontent>
    <Svg
      preview={true}
      {title}
      {value} />
  </sveadatacellcontent>
{/if}