<script lang="ts">
  import type {
    InputErrorProps,
  } from './types.js'

  let {
    isValid,
  } : InputErrorProps = $props()
</script>

{#if !isValid.valid}
  <inputerror>{isValid.message}</inputerror>
{/if}