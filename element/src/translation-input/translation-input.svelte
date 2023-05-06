<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  import {
    ALLOWED_LOCALES,
    MultiLanguageText,
  } from '@sveadmin/common'

  import {
    TextInput
  } from '../main.js'

  export let getValue: {() : MultiLanguageText} = null,
    id: string = 'translation-input',
    locale: typeof ALLOWED_LOCALES[number],
    setFocus: boolean = false,
    value: MultiLanguageText = {}

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })
</script>
<TextInput
  {id}
  {setFocus}
  value={value[locale] || ''} />