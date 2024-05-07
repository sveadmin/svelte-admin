<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  import {
    router,
  } from '@sveadmin/common'

  export let classList: string = $$restProps.class || '',
    getNamedParameters: (() => {[key: string] : string}),
    name: string,
    namedParameters: {[key: string] : string},
    value: string

  onMount(() => {
    if (!namedParameters) {
      namedParameters = (getNamedParameters)
        ? getNamedParameters()
        : {}
    }
  })

</script>
<a  class={classList}
  href={router.getNamedRoute({name, namedParameters})}
  on:click={router.navigateFromLink}
>
  {value}
</a>
