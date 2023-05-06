<script>
  import InputNumber from '../../block/input-number.svelte'

  export let value = '', digits = 7, decimals = 0,
    column, columnIndex, data, handlers,
    baseComponent = 'number'

  const editorClosed = (event) => {
  console.log(event)
    const value = event.detail.target.value
    if (data[column] !== value) {
      data[column] = value;
      handlers.updateMeta(data, 'dirty', true);
    }
    handlers.changeComponent(
      baseComponent,
      data,
      columnIndex
    )
  }
</script>
<InputNumber {value} {digits} {decimals} {data} on:blur={editorClosed} editor={true}/>