<script lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  let booleanValue = false
  let booleanStore = $state(false)
  let booleanChangeByClick = $state(false)
  let booleanChangeByChange = $state(false)

  let isDisabled = $state(true)

  const onClick = (e: Event) => {
    const target = e.target as HTMLInputElement
    booleanChangeByClick = target.checked
  }

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    booleanChangeByChange = target.checked
  }

  const changeIsDisabled = () => {
    isDisabled = !isDisabled
  }
</script>
<h2>No default value or binding</h2>
<CheckboxSwitch />

<h2>No default value or binding with custom labels</h2>
<CheckboxSwitch labels={{true: 'Right', false: 'Left'}}/>

<h2>Default value without binding</h2>
<h3>local variable value is {booleanValue ? 'ON' : 'off'}</h3>
<CheckboxSwitch value={booleanValue}/>
Binding the value on this element triggers warning
`booleanValue` is updated, but is not declared with `$state(...)`. Changing its value will not correctly trigger updates

<h2>With binding via store</h2>
<h3>local variable value is {booleanStore ? 'ON' : 'off'}</h3>
<CheckboxSwitch bind:value={booleanStore}/>

<h2>On click handler</h2>
<h3>local variable value is {booleanChangeByClick ? 'ON' : 'off'}</h3>
<CheckboxSwitch {onClick} value={booleanChangeByClick}/>

<h2>On change handler</h2>
<h3>local variable value is {booleanChangeByChange ? 'ON' : 'off'}</h3>
<CheckboxSwitch {onChange} value={booleanChangeByChange}/>

<h2>Disabled</h2>
<Button callback={changeIsDisabled} label={(isDisabled) ? 'Enable' : 'Disable'}/> 
<CheckboxSwitch {isDisabled}/>
<CheckboxSwitch {isDisabled} value={false}/>

<h2>Both values are visible</h2>
<CheckboxSwitch labels={{true: 'Right', false: 'Left'}} areBothValuesVisible={true}/>