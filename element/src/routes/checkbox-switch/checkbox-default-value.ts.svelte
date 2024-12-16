<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  let booleanValue = false

</script>
<h3>local variable value is {booleanValue ? 'ON' : 'off'}</h3>
<CheckboxSwitch value={booleanValue}/>
<p>Binding the value on this element triggers warning
`booleanValue` is updated, but is not declared with `$state(...)`. Changing its value will not correctly trigger updates
</p>