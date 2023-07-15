<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    Link,
  } from '@sveadmin/element'

  import {
    SETTING_GET_PARAMETERS,
    SETTING_GET_VALUE,
    SETTING_PARAMETERS,
    SETTING_ROUTE,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  export let column: string,
    contextKey: TableContextKey,
    value: string

  const {
    settings,
  } = getContext(contextKey) as TableContext

  let {
    [SETTING_GET_PARAMETERS]: getNamedParameters,
    [SETTING_GET_VALUE]: getValue,
    [SETTING_PARAMETERS]: namedParameters,
    [SETTING_ROUTE]: name
  } = settings.getColumn(column)

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
    if (!namedParameters
      && getNamedParameters) {
      namedParameters = getNamedParameters()
    }
  })

</script>
{#if value}
  <sveadatacellcontent>
    <Link
      {name}
      {namedParameters}
      {value} />
  </sveadatacellcontent>
{/if}