<script lang="ts">
  import { SvelteComponent } from 'svelte'
  import { CheckboxSwitch, DateSelector, DropdownSearch, IntervalDisplay, Link, NumberInput } from '@sveadmin/element'
  import { createFieldValidator, emailValidator, router } from '@sveadmin/common'

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

  router.add({
    route: '/admin/sets/{id:[0-9]+}',
    component: new SvelteComponent({target: document}),
    name: 'test'
  })

</script>

<h1>This is Svelte?</h1>
<!-- <DropdownMultiSelect {getSelection} {values}/> -->
<Link name="test" value="test link" attributes={{id: 1234}}/>
<IntervalDisplay value="123"/>
<NumberInput value="1234456.34" />
<CheckboxSwitch />
<DateSelector value={new Date()}/>
<DropdownSearch
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
  on:error={event => console.log('caught', event)}

/>
!{!$testValidator.valid && $testValidator.message || ''}!
<h4>VErSION 12</h4>

<style>
  :global(h1) {
    color: red;
  }
</style>