<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  let isDisabled = $state(true)
  
  const changeIsDisabled = () => {
    isDisabled = !isDisabled
  }
</script>
<Button callback={changeIsDisabled} label={(isDisabled) ? 'Enable' : 'Disable'}/> 
<CheckboxSwitch {isDisabled}/>
<CheckboxSwitch {isDisabled} value={false}/>