<script module lang="ts">
  export {
    renderTrueHint
  }
</script>

{#snippet renderTrueHint(
  text: string,
  classes?: string[],
  styles?: string[]
)}
  <sveatruelabel
    class={classes?.join(' ')}
    style={styles?.join(';')} >
    {text}
  </sveatruelabel>
{/snippet}
