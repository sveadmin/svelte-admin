<script lang="ts">
  import { beforeUpdate, createEventDispatcher } from 'svelte';
  import {
    Locale,
    MultiLanguageText,
  } from '@sveadmin/common'

  export let getLocales: {() : Locale[]} = () => {
      if (locales) {
        return locales
      }
      if (translations) {
        return Object.keys(translations)
      }
      return []
    },
    locales: Locale[],
    locale: Locale,
    translations: MultiLanguageText

  let showLocales = false

  const dispatch = createEventDispatcher();

  const showLocaleSelector = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    showLocales = true
  }

  const hideLocaleSelector = (event?: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    showLocales = false
  }

  const setLocale = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    const target = event.target as HTMLElement
    locale = target.dataset.locale
    hideLocaleSelector()
    dispatch('valueChanged', locale)
  }

  beforeUpdate(() => {
    if (!locale
        && locales.length > 0) {
      locale = locales[0]
    }
  })
</script>

<locale on:click={showLocaleSelector} on:keyup={showLocaleSelector}>
  {locale}
</locale>
{#if showLocales}
  <locales>
    {#each getLocales() as selectableLocale}
      <selectablelocale
        class:selected="{locale === selectableLocale}"
        data-locale="{selectableLocale}"
        on:click={setLocale}
        on:keyup={setLocale} >
        {selectableLocale}
      </selectablelocale>
    {/each}
  </locales>
{/if}

<style global src="./locale-selector.css"></style>