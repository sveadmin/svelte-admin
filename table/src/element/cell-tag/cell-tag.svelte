<script lang="ts">
  import { SvelteComponent } from 'svelte'

  import {
    Tag,
    TAG_TYPE_NEUTRAL,
    TagType,
  } from '@sveadmin/element'

  export let component: typeof SvelteComponent = null,
    componentAttributes: {[key: string] : any} = {},
    getTagType: {({}) : TagType} = item => tagType,
    getValue: {({}) : string} = item => item.toString(),
    items: {}[],
    tagType: TagType = TAG_TYPE_NEUTRAL

</script>
{#if items !== null}
  <datacellcontent class="privileges">
    <Tag 
      {component}
      {componentAttributes}
      {getTagType}
      {getValue}
      {items}
      {tagType}
    />
  </datacellcontent>
{/if}