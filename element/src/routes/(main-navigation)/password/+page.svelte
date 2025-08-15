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
<GridLine>
  <span class="grid-span-4">Small size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput size={SIZE_SMALL} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Large size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput size={SIZE_LARGE} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Extra large size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput size={SIZE_EXTRA_LARGE} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Password input with no criteria</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput isLowercaseRequired={false}
        isNumberRequired={false} 
        isUppercaseRequired={false} 
        isSpecialCharacterRequired={false}
        minimumLength={null} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Password input without helper</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput isPasswordHelperVisible={false}/>
    </form>
  </span>
</GridLine>