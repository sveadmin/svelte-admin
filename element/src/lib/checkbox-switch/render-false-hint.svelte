<script module lang="ts">
  export {
    renderFalseHint
  }
</script>

{#snippet renderFalseHint(
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
