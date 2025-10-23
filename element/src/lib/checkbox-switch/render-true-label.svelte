<script module lang="ts">
  export {
    renderTrueLabel
  }
</script>

{#snippet renderTrueLabel(
  label: string,
  classes?: string[],
  styles?: string[]
)}
  <sveatruelabel
    class={classes?.join(' ')}
    style={styles?.join(';')} >
    {label}
  </sveatruelabel>
{/snippet}
