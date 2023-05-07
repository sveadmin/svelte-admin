<script>
  import InputText from '../../block/input-text.svelte'
  export let value = '', columnIndex, data, handlers,
          baseComponent = 'translated-text', locale,
          validators

  const selectedTranslation = value.find(currentTranslation => currentTranslation.locale === locale)

  const inputKeyUp = (event) => {
    if (event.detail.keyCode === 13) {
      const newTranslation = event.detail.target.value;
      if (selectedTranslation.translation !== newTranslation) {
        selectedTranslation.translation = newTranslation
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
<InputText type="text" value={selectedTranslation.translation} on:keyup={inputKeyUp} setFocus={true} />