<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  let isDisabled = $state(true)
  
  const changeIsDisabled = () => {
    isDisabled = !isDisabled
  }
</script>

<GridLine>
  <span class="grid-span-6">Disabled</span>
  <span class="grid-span-2">
    <CheckboxSwitch {isDisabled}/>
  </span>
  <span class="grid-span-2">
    <CheckboxSwitch {isDisabled} value={false}/>

  </span>
  <span class="grid-span-2">
    <Button onClick={changeIsDisabled} label={(isDisabled) ? 'Enable' : 'Disable'}/> 
  </span>
</GridLine>