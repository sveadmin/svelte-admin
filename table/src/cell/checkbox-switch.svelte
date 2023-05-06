<script>
  import { beforeUpdate } from 'svelte'
  import { noop } from 'svelte/internal'
  import CheckboxSwitch from '../../block/checkbox-switch.svelte'
  export let value, data, handlers, onChange = noop,
          name = 'switch', falseLabel = '', trueLabel = '', getKey, disabled = false

  let saveNeeded = false, uniqueKey = ''

  const onClick = (customEvent) => {
    if (customEvent.detail.tagName === 'LABEL') {
      saveNeeded = true
    }
  }

  beforeUpdate(() => {
    if (saveNeeded) {
      // console.log('before udpate', value)
      handlers.updateMeta(data, 'dirty', true);
      saveNeeded = false
    }
    uniqueKey = '-' + getKey(data)
  })

  // console.log(value)
</script>
{#if typeof value !== 'undefined'}
  <CheckboxSwitch
    bind:value={value}
    {name}
    {falseLabel}
    {trueLabel}
    {uniqueKey}
    {disabled}
    on:click={onClick}
    on:valueChanged={onChange} />
{/if}
