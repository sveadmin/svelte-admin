<script lang="ts">
  import { getContext } from 'svelte'

  import {
    Tag,
    TAG_TYPE_NEUTRAL,
    DISPLAY_TAG_VALUE,
    TagType,
  } from '@sveadmin/element'

  import {
    SETTING_DISPLAY_MODE,
    SETTING_STATUS_CHECK,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  export let contextKey: TableContextKey,
    column: string,
    display: string,
    statusCheck: {({}) : TagType},
    tagType: TagType = TAG_TYPE_NEUTRAL,
    value

  const context = getContext(contextKey) as TableContext

  const {
    settings,
  } = context

  let {
    [SETTING_STATUS_CHECK]: settingsStatusCheck = item => tagType,
    [SETTING_DISPLAY_MODE]: settingsDisplayMode = DISPLAY_TAG_VALUE,
  } = settings.getColumn(column)

</script>

<sveadatacellcontent class="tag">
  <Tag 
    display={display ?? settingsDisplayMode}
    statusCheck={statusCheck ?? settingsStatusCheck}
    {value}
    {tagType}
  />
</sveadatacellcontent>