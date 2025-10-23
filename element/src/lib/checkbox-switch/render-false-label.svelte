<script module lang="ts">
  export {
    renderFalseLabel
  }
</script>

{#snippet renderFalseLabel(
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
