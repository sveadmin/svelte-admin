<script lang="ts">
  import type {
    InputErrorProps,
  } from './types.js'

  let {
    isValid,
    size,
  } : InputErrorProps = $props()
</script>

{#if !isValid.valid}
  <inputerror data-size={size}>{isValid.message}</inputerror>
{/if}