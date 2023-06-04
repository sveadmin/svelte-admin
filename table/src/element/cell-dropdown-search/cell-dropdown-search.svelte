<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    DISPLAY_DROPDOWN_COMBO,
    DropdownSearch,
  } from '@sveadmin/element'

  import {
    COMPONENT_TEXT_LOOKUP,
    DataData,
    OriginalDataData,
    ROW_META_DIRTY,
    SETTING_ARE_HELPERS_VISIBLE,
    SETTING_CLEAR_VALUE_ON_INIT,
    SETTING_DISPLAY_MODE,
    SETTING_FLIP_HELPERS,
    SETTING_FOCUSED,
    SETTING_GET_VALUE,
    SETTING_GET_VALUES,
    SETTING_IS_EMPTY_ALLOWED,
    SETTING_IS_NEW_VALUE_ALLOWED,
    SETTING_LENGTH,
    SETTING_TYPE,
    SETTING_VALUES,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  import {
    prepareUpdateMeta,
  } from '../../handler/index.js'

  export let 
    column: string,
    contextKey: TableContextKey,
    rowIndex: number,
    value: string | number = null

  let data: DataData,
    originalData: OriginalDataData

  const updateMeta = prepareUpdateMeta(contextKey)
  const context = getContext(contextKey) as TableContext

  const {
    components,
    getKey,
    settings,
  } = context

  const id: string = ['dropdown-search', column, rowIndex].join('-'),
    validators: ValidatorStore = settings.getValidator(column)

  let {
    [SETTING_ARE_HELPERS_VISIBLE]: areHelpersVisible = true,
    [SETTING_CLEAR_VALUE_ON_INIT]: clearValueOnInit = false,
    [SETTING_DISPLAY_MODE]: displayMode = DISPLAY_DROPDOWN_COMBO,
    [SETTING_FLIP_HELPERS]: flipHelpers = false,
    [SETTING_FOCUSED]: focused = true,
    [SETTING_GET_VALUE]: getValue,
    [SETTING_GET_VALUES]: getValues,
    [SETTING_IS_EMPTY_ALLOWED]: isEmptyAllowed = true,
    [SETTING_IS_NEW_VALUE_ALLOWED]: isNewValueAllowed = false,
    [SETTING_LENGTH]: suggestionsLength = 10,
    [SETTING_TYPE]: baseComponent = COMPONENT_TEXT_LOOKUP,
    [SETTING_VALUES]: values,
  } = settings.getColumn(column)


  context.data.subscribe(currentValue => data = currentValue)
  context.originalData.subscribe(currentValue => originalData = currentValue)

  const valueChanged = (event: CustomEvent<string | null>) => {
    const columnIndex = settings.getColumnPosition(column)
    const rowKey = getKey(data[rowIndex].attributes)
    if (data[rowIndex].attributes[column] != event.detail) {
      data[rowIndex].attributes[column] = event.detail
      updateMeta(data[rowIndex].attributes, ROW_META_DIRTY, true)
    }
    components.setByIndex(
      columnIndex,
      rowKey,
      baseComponent
    )
  }

  const inputKeyUp = (event: CustomEvent<KeyboardEvent>) => {
    if (event.detail.key === 'Escape') {
      const columnIndex = settings.getColumnPosition(column)
      const rowKey = getKey(data[rowIndex].attributes)
      components.setByIndex(
        columnIndex,
        rowKey,
        baseComponent
      )
    }
  }

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
    if (!values
      && getValues) {
      values = getValues()
    }
  })
</script>
<DropdownSearch
  {areHelpersVisible}
  {clearValueOnInit}
  {displayMode}
  {flipHelpers}
  {focused}
  {id}
  {isEmptyAllowed}
  {isNewValueAllowed}
  originalValue={originalData[getKey(data[rowIndex].attributes)].column}
  setFocus={true}
  {suggestionsLength}
  {validators}
  {value}
  {values}
  on:keyup={inputKeyUp}
  on:valueChanged={valueChanged}
/>