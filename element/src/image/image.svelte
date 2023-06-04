<script lang="ts">
  import {
    AllowedImageDisplayModes,
    DISPLAY_IMAGE_ICON,
    DISPLAY_IMAGE_NORMAL,
    DISPLAY_IMAGE_PREVIEW,
  } from './types.js'


  export let alt: string = '',
    displayMode: AllowedImageDisplayModes = DISPLAY_IMAGE_NORMAL,
    src: string = ''

  const showPreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    displayMode = (displayMode === DISPLAY_IMAGE_ICON)
      ? DISPLAY_IMAGE_PREVIEW
      : DISPLAY_IMAGE_ICON
  }
</script>
<sveaimagecontainer>
  <img
    {alt}
    class:icon="{displayMode !== DISPLAY_IMAGE_NORMAL}"
    {src}
    on:click={showPreview}
    on:keyup={showPreview}/>
  {#if displayMode === DISPLAY_IMAGE_PREVIEW}
    <sveaimagepreview class="visible" on:click={showPreview} on:keyup={showPreview}>
      <img {src} {alt} />
    </sveaimagepreview>
  {/if}
</sveaimagecontainer>

<style global src="./image.css"></style>
