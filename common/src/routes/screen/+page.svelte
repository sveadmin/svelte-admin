<script lang="ts">
  import {
    setupScreens,
  } from '$lib/screen/index.js'

  import LeftComponent from './left.svelte'

// https://github.com/sveltejs/svelte/issues/12668

console.log(typeof LeftComponent, LeftComponent)

  const screens = setupScreens({
    screens: {
      left: {},
      middle: {},
      right: {},
    }
  })

  const LeftScreen = $derived(screens.screens?.left?.components?.[0])
  const middleScreen = $derived(screens.screens?.middle)
  const rightScreen = $derived(screens.screens?.right)

  screens.addComponent('left', {component: LeftComponent})

  $effect(() => {
    console.log(screens.screens.left)
  })

</script>

<screencontainer>
  <p>Left</p>
  <p>Middle</p>
  <p>Right</p>
  <leftcontainer>
    {#if LeftScreen}
      <LeftScreen.component />
    {/if}
  </leftcontainer>
  <middlecontainer>

  </middlecontainer>
  <rightcontainer>

  </rightcontainer>
</screencontainer>