<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  export let disabled:boolean = false,
    falseLabel: string = 'False',
    getValue: {() : boolean} = null,
    name: string = 'switch',
    trueLabel: string = 'True',
    uniqueKey: string = '',
    value: boolean = true

  const onClick = (event:Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }

    dispatch('click', event.target)
  }

  const onChange = (event:Event) => {
    dispatch('valueChanged', value)
  }

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
  })

</script>

<sveacheckboxswitchcontainer on:click={onClick} on:keyup={onClick}><!--
--><input type="checkbox" id={name + uniqueKey} bind:checked={value} disabled={disabled || null} on:change={onChange}><!--
--><label for={name + uniqueKey}></label>
  {#if value}
    <sveatruelabel>{trueLabel}</sveatruelabel>
  {:else}
    <sveafalselabel>{falseLabel}</sveafalselabel>
  {/if}
</sveacheckboxswitchcontainer>

<style global src="./checkbox-switch.css"></style>