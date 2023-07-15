<script lang="ts">
  import {
    router,
    RouterData,
  } from '@sveadmin/common'

  import {
    backNavigation,
  } from './helper/index.js'

  const searchObject = {}

  router.navigate(window.location.pathname + window.location.search, searchObject)

  let routerData: RouterData

  router.subscribe((currentValue: RouterData) => routerData = currentValue)

</script>

<svelte:window on:popstate={ backNavigation } />
<svelte:component this={ router.get(routerData.current) }/>

<style global src="./colors.css"></style>
