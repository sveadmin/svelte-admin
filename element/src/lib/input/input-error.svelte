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
  <inputerror data-size={size}>{isValid.message}</inputerror>
{/if}