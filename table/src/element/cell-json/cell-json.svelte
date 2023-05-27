<script lang="ts">
  import {
    Json
  } from '@sveadmin/element'
  
  export let
    preview: boolean = true, 
    previewFields: string[] = [],
    value = ''
</script>
{#if value}
  <Json
    {preview}
    {previewFields}
    {value} />
{/if}