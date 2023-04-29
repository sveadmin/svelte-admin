<script lang="ts">
  import {
    ALLOWED_LOCALES,
    MultiLanguageText,
  } from '@sveadmin/common'

  import {
    TextInput
  } from '../main'

  export let id: string = 'translation-input',
    locale: typeof ALLOWED_LOCALES[number],
    setFocus: boolean = false,
    value: MultiLanguageText = {}

</script>
<TextInput
  {id}
  {setFocus}
  value={value[locale] || ''} />