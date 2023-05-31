<script lang="ts">
  import {
    Link,
  } from '@sveadmin/element'

  export let
    attributes: {[key: string] : string} = {},
    name: string,
    value: string

</script>
{#if value}
  <sveadatacellcontent>
    <Link
      {attributes}
      {name}
      {value} />
  </sveadatacellcontent>
{/if}