<script lang="ts">
  import type {
    InputErrorProps,
  } from './types.js'

  import './input-error.css'

  let {
    isValid,
    size,
  } : InputErrorProps = $props()
</script>

{#if !isValid.valid}
  <inputerror data-size={size} data-error={isValid?.error}>{isValid.message}</inputerror>
{/if}