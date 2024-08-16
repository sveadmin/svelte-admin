<script lang="ts">
  import {
    getContext,
  } from 'svelte'

  import {
    derived,
  } from 'svelte/store'

  import {
    Button,
    CheckboxSwitch,
  } from '@sveadmin/element'

  import {
    TableContext,
    TableContextKey,
  } from './types.js'

  export let contextKey: TableContextKey,
    hideModal,
    setHidingIntent

  const {
    massEditor
  } = getContext(contextKey)

  const columnsToExport = derived(massEditor, (currentValue) => currentValue && currentValue.columnsToExport || {})

  let textareaInstance

  const close = () => {
    setHidingIntent()
    hideModal()
  }

  function changeColumn(target) {
    if (target.detail.dataset
      && target.detail.dataset.id) {
      const column = target.detail.dataset.id
      if (target.detail.checked) {
        massEditor.setColumnToExport(column)
      } else {
        massEditor.setColumnToNotExport(column)
      }
    }
  }

  function copy() {
    if (textareaInstance.selectionStart === textareaInstance.selectionEnd) {
      textareaInstance.select()
    }

  console.log(navigator, navigator.clipboard)
    navigator.clipboard.writeText(
      textareaInstance.value.substring(
        textareaInstance.selectionStart,
        textareaInstance.selectionEnd,
      )
    )
  }

</script>

<masseditorcontainer>
  <masseditorheader>
    {#each Object.keys($columnsToExport) as column}
      <CheckboxSwitch class="small"
        data={{id: column}}
        id={`massEditor-${column}`}
        labels={{false: column, true: column}}
        value={$columnsToExport[column]}
        on:click={changeColumn} />
    {/each}
  </masseditorheader>
  <masseditorbody>
    <textarea value={$massEditor.value} class="sveatextarea" bind:this={textareaInstance}></textarea>
  </masseditorbody>
</masseditorcontainer>
<Button icon="copy" label="Copy" callback={copy}/>
<Button icon="paste-clipboard" label="Paste" callback={close}/>
<Button icon="floppy-disk-arrow-in" label="Update" callback={close}/>
<Button icon="xmark" label="Close" callback={close}/>

<style global src="./mass-editor.css"></style>