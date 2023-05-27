<script lang="ts">
  import { Image }  from '@sveadmin/element'
  export let alt: string = '',
    src: string = ''

</script>
{#if src !== null}
  <datacellcontent><Image {src} {alt} preview={true}/></datacellcontent>
{/if}