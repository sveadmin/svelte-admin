<script lang="ts">
  import {
    loader,
  } from '@sveadmin/common'

  import './colors.css'
  // import './layout.css'

  let { children } = $props()
</script>

<header class:loading={loader.state}>
    <span>
      <!-- {#if $headerNavigation}
        <a href={$headerNavigation} on:click={router.navigateFromLink} id="backLink">
          BACK
        </a>
      {/if} -->
    </span>
</header>
<content>
  {@render children()}
</content>