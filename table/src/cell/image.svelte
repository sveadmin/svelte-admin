<script>
  import Image from '../../image.svelte'
  export let src = '', alt = ''

</script>
{#if src !== null}
  <datacellcontent><Image {src} {alt} preview={true}/></datacellcontent>
{/if}