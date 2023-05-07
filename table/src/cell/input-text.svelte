<script>
  import InputText from '../../block/input-text.svelte'
  export let value = '', column, columnIndex, data, handlers,
          baseComponent = 'display-text',
          validators

  const inputKeyUp = (event) => {
    if (event.detail.keyCode === 13) {
      value = event.detail.target.value;
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
    if (event.detail.keyCode === 27) {
      handlers.changeComponent(
        baseComponent,
        data,
        columnIndex
      )
    }
  }
</script>
<InputText type="text" value={value} on:keyup={inputKeyUp} setFocus={true} {data} />