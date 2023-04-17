<script lang="ts">
  import { CheckboxSwitch, IntervalDisplay } from '@sveadmin/element'

  // const values = [
  //   {id: 1, value: 'Test'},
  //   {id: 5, value: 'Test123123'},
  // ]

  // const getSelection = () => {return {
  //   5: 'asdasdasd'
  // }}
</script>


<h1>This is Svelte 3</h1>
<!-- <DropDownMultiSelect {getSelection} {values}/> -->
<IntervalDisplay value="2023-04-13 19:50"/>
<CheckboxSwitch />

<style>
  :global(h1) {
    color: red;
  }
</style>