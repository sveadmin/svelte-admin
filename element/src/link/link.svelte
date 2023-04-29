<script lang="ts">
  import {
    router,
  } from '@sveadmin/common'

  export let attributes: {[key: string] : string} = {},
    name: string,
    value: string

</script>
<a href={router.getNamedRoute({name, namedParameters: attributes})} on:click={router.navigateFromLink}>{value}</a>
