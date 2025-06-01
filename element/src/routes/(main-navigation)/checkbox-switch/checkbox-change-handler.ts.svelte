<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'
  let booleanStore = $state(false)

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    booleanStore = target.checked
  }
</script>
<h3>local variable value is {booleanStore ? 'ON' : 'off'}</h3>
<CheckboxSwitch {onChange} value={booleanStore}/>