<script>
  import Svg from '../../svg.svelte'
  export let data = '', title = ''

</script>
{#if data !== null}
  <datacellcontent><Svg {data} {title} preview={true}/></datacellcontent>
{/if}