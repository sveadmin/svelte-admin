<script lang="ts">
  import {
    loader,
  } from '@sveadmin/common'

  import './variables.css'
  import './layout.css'

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
<main>
  <nav>
    <a href="/accordion">Accordion</a>
    <a href="/button">Button</a>
    <a href="/checkbox-switch">Checkbox switch</a>
    <a href="/colors">Colors</a>
    <a href="/dropdown-search">Dropdown Search</a>
    <a href="/grid">Grid</a>
    <a href="/text-input">Text Input</a>
  </nav>
  <content>
    {@render children()}
  </content>
</main>