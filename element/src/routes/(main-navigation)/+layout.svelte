<script lang="ts">
  import { page } from '$app/stores'

  import {
    loader,
  } from '@sveadmin/common'

  import './variables.css'
  import './layout.css'

  import {
    tutorialPages,
  } from './tutorial-pages.js'

  let { children } = $props()
</script>

<header class:loading={loader.state}>
   <a href="/" id="home" aria-label="home">SveAdmin</a>
    <span>
      <!-- {#if $headerNavigation}
        <a href={$headerNavigation} on:click={router.navigateFromLink} id="backLink">
          BACK
        </a>
      {/if} -->
    </span>
</header>
<main>
  <nav>
    {#each tutorialPages as tutorialPage}
      <a href="{tutorialPage.route}" class:active={tutorialPage.route === $page.route.id}>{tutorialPage.label}</a>
      
    {/each}
  </nav>
  <content>
    {@render children()}
  </content>
</main>