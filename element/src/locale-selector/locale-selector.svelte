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
      && event.key !== 'Enter') {
      return
    }
    showLocales = true
  }

  const hideLocaleSelector = (event?: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    showLocales = false
  }

  const setLocale = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
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

<svealocale on:click={showLocaleSelector} on:keyup={showLocaleSelector}>
  {locale}
</svealocale>
{#if showLocales}
  <svealocales>
    {#each getLocales() as selectableLocale}
      <sveaselectablelocale
        class:selected="{locale === selectableLocale}"
        data-locale="{selectableLocale}"
        on:click={setLocale}
        on:keyup={setLocale} >
        {selectableLocale}
      </sveaselectablelocale>
    {/each}
  </svealocales>
{/if}

<style global src="./locale-selector.css"></style>