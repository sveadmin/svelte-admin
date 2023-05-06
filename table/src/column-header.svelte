<script>
  import { getContext, beforeUpdate, createEventDispatcher } from 'svelte'
  import { noop } from 'svelte/internal'

  import {
    getColumnAction,
  } from './action'


  import {
    getChangeComponent,
    getResetOriginalData,
    prepareUpdateMeta,
    prepareGetData,
  } from './handler'

  export let contextKey = {}, column

  let metaValues = {}, metaProperties = []

/**
 * action = {
 *  callback: () => {},
 *  label: 'used for display icone',
 *  metaField: 'property' // retrieved from $meta[columnId + '-' + property]
 * }
 */
  const {
    actions,
    base = 4,
    displayName,
    grow = 0,
    id,
    max = 50,
    readOnly = false,
    shrink = 0,
    titleAction,
  } = column

  if (actions) {
    metaProperties = actions.reduce(
      (aggregator, action) => {
        if (action.metaField) {
          aggregator.push(action.metaField)
        }
        if (action.activeMetaField) {
          aggregator.push(action.activeMetaField)
        }
        return aggregator
      },
      []
    )
  }


/**
 * Default  values are needed as usually the new component runs without the context being setup
 */
  let {
    editors,
    meta,
    sort,
  } = getContext(contextKey)

  meta.subscribe(currentValue => {
    metaProperties.map(property => {
      metaValues[property] = currentValue[property]
    })
  })

  const dispatch = createEventDispatcher();

  export const get = prepareGetData(contextKey)
  export const updateMeta = prepareUpdateMeta(contextKey)
  export const resetOriginalData = getResetOriginalData(contextKey)
  export const changeComponent = getChangeComponent(dispatch, contextKey)

  const columnAction = getColumnAction()
  const runTitleAction = event => columnAction(titleAction.callback, event)

</script>

<columnheader
  style="flex:{grow} {shrink} {base}rem;max-width:{max}rem;"
  class:editable={!readOnly || editors.has(id)}>
  <columntitle
    data-sort="{$sort[id] && $sort[id].direction}"
    on:click={titleAction ? runTitleAction : noop}
    class:actionable={titleAction}
  >
    {displayName}
  </columntitle>
  {#if actions}
    {#each actions as action}
      <columnaction
        on:click={() => columnAction(action.callback)}
        class={action.label}
        class:active={action.activeMetaField && metaValues[action.activeMetaField]}
        data-meta={action.metaField && metaValues[action.metaField]}>
      </columnaction>
    {/each}
  {/if}
</columnheader>