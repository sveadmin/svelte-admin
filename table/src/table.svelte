<script lang="ts">
  import { CheckboxSwitch, DropDownSearch, IntervalDisplay } from '@sveadmin/element'
  import { createFieldValidator, emailValidator } from '@sveadmin/common'

  // const values = [
  //   {id: 1, value: 'Test'},
  //   {id: 5, value: 'Test123123'},
  // ]

  // const getSelection = () => {return {
  //   5: 'asdasdasd'
  // }}
  const testValidator = createFieldValidator([
    // emailValidator(),
  ])

</script>


<h1>This is Svelte?</h1>
<!-- <DropDownMultiSelect {getSelection} {values}/> -->
<IntervalDisplay value="123"/>
<CheckboxSwitch />
<DropDownSearch
  validators={testValidator}
  value={1}
  values={[
    {
      id: 0,
      value: 'Zero',
    },
    {
      id: 1,
      value: 'One',
    },
  ]}

/>
!{!$testValidator.valid && $testValidator.message || ''}!
<h4>VErSION 12</h4>

<style>
  :global(h1) {
    color: red;
  }
</style>