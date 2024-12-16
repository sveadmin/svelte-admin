<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  let booleanStore = $state(false)
</script>
<h3>local variable value is {booleanStore ? 'ON' : 'off'}</h3>
<CheckboxSwitch bind:value={booleanStore}/>