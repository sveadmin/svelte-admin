<script lang="ts">
  import {
    router,
  } from '@sveadmin/common'
  
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Link from './link.svelte'

  import type {
    LinkProps,
  } from './types.js'

  import {
    sveadminRouteGenerator
  } from './helper/index.js'

  let {
    onClick: onClickImported,
    ...passthrough
  } : LinkProps = $props()

  let onClick: (event: MouseEvent) => void = (!onClickImported) 
    ? router.navigateFromLink
    : (event: MouseEvent) => {
      onClickImported(event)
      router.navigateFromLink(event)
    }

</script>

<Link {...passthrough} routeGenerator={sveadminRouteGenerator} onclick={onClick} />
