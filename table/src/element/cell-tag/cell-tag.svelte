<script lang="ts">
  import { getContext } from 'svelte'

  import {
    Tag,
    TAG_TYPE_NEUTRAL,
    TagType,
  } from '@sveadmin/element'

  import {
    SETTING_STATUS_CHECK,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  export let contextKey: TableContextKey,
    column: string,
    statusCheck: {({}) : TagType},
    tagType: TagType = TAG_TYPE_NEUTRAL,
    value

  const context = getContext(contextKey) as TableContext

  const {
    settings,
  } = context

  let {
    [SETTING_STATUS_CHECK]: settingsStatusCheck = item => tagType,
  } = settings.getColumn(column)

</script>

<sveadatacellcontent class="tag">
  <Tag 
    statusCheck={statusCheck ?? settingsStatusCheck}
    {value}
    {tagType}
  />
</sveadatacellcontent>