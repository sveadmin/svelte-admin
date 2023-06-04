<script lang="ts">
  import {
    AllowedImageDisplayModes,
    DISPLAY_IMAGE_ICON,
    DISPLAY_IMAGE_NORMAL,
    DISPLAY_IMAGE_PREVIEW,
  } from '../image/types.js'


  export let displayMode: AllowedImageDisplayModes = DISPLAY_IMAGE_NORMAL,
    title: string = '',
    value: string = ''

  const showPreview = (event: Event) => {
  console.log(event, event.target, displayMode)
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    displayMode = (displayMode === DISPLAY_IMAGE_ICON)
      ? DISPLAY_IMAGE_PREVIEW
      : DISPLAY_IMAGE_ICON
  }
</script>
<sveaimagecontainer on:click={showPreview} on:keyup={showPreview}>
  <object
    data='data:image/svg+xml,{value}'
    type="image/svg+xml"
    title="{title}"
    class:icon="{displayMode !== DISPLAY_IMAGE_NORMAL}"
    ></object>
  {#if displayMode === DISPLAY_IMAGE_PREVIEW}
    <sveaimagepreview class="visible" on:click|stopPropagation={showPreview} on:keyup|stopPropagation={showPreview} >
      <object
        data="data:image/svg+xml,{value}"
        type="image/svg+xml"
        title="{title}"
        ></object>
    </sveaimagepreview>
  {/if}
</sveaimagecontainer>

<style global src="./svg.css"></style>
