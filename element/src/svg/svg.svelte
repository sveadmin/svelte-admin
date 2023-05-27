<script lang="ts">
  // TODO: make SVG display work....
  export let preview: boolean = false,
    value: string = '',
    title: string = ''

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
<imagecontainer>
  <object
    data='data:image/svg+xml,{value}'
    type="image/svg+xml"
    title="{title}"
    class:preview="{preview}"
    on:click={showPreview}
    on:keyup={showPreview}
    ></object>
  {#if preview}
    <imagepreview class:visible="{previewVisible}" on:click={showPreview} on:keyup={showPreview}>
      <object
        data="data:image/svg+xml,{value}"
        type="image/svg+xml"
        title="{title}"
        ></object>
    </imagepreview>
  {/if}
</imagecontainer>
