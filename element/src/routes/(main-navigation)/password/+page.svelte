<script lang="ts">
  import {
    PasswordInput,
  } from '$lib/password-input/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'


</script>

<GridLine>
  <span class="grid-span-4">Normal size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput />
    </form>
  </span>
</GridLine>