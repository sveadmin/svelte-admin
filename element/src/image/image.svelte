<script lang="ts">

  export let alt: string = '',
    preview: boolean = false,
    src: string = ''

  let previewVisible: boolean = false

  const showPreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    if (preview) {
      previewVisible = !previewVisible
    }
  }

</script>
<sveaimagecontainer>
  <img {src} {alt} class:preview="{preview}" on:click={showPreview} on:keyup={showPreview}/>
  {#if preview}
    <sveaimagepreview class:visible="{previewVisible}" on:click={showPreview} on:keyup={showPreview}>
      <img {src} {alt} />
    </sveaimagepreview>
  {/if}
</sveaimagecontainer>

<style global src="./image.css"></style>
