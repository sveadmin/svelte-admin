<script>
  import Number from '../../block/number.svelte'

  export let value = '', digits = 7, decimals = 0;
</script>
{#if value}
  <datacellcontent>
    <Number {value} {digits} {decimals} />
  </datacellcontent>
{/if}