<script lang="ts">
  import { beforeUpdate } from "svelte";
  import { LocaleSelector } from '@sveadmin/element'

  export let value = {}, locales, locale, showLocale = true

  let localeLookup = {}

  beforeUpdate(() => {
    if (!value) {
      return
    }

    localeLookup = Object.values(value).reduce(
      (aggregator, currentTranslation) => {
        aggregator[currentTranslation.locale] = currentTranslation.translation
        return aggregator
      },
      {}
    )
    // if (!locales) {
    //   locales = Object.keys(localeLookup)
    // }

    // if (!locale
    //     && locales.length > 0) {
    //   locale = locales[0]
    // }
  })
</script>
{#if value}
  <datacellcontent>{localeLookup[locale]}</datacellcontent>
  {#if showLocale}
    <LocaleSelector 
      bind:locale={locale}
      {value}
      {locales}
      />
  {/if}
{/if}