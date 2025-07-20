<script lang="ts">
  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  let booleanStore = $state(false)

  const onClick = (e: Event) => {
    const target = e.target as HTMLInputElement
    booleanStore = target.checked
  }
</script>

<GridLine>
  <span class="grid-span-6">On click handler</span>
  <span class="grid-span-3">
    <CheckboxSwitch {onClick} value={booleanStore} />
  </span>
  <span class="grid-span-3">
    local variable value is {booleanStore ? 'ON' : 'off'}
  </span>
</GridLine>