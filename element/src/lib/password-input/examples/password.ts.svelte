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
      <PasswordInput id="password1"
        isLowercaseRequired={true}
        isNumberRequired={true}
        minimumLength=8 />
    </form>
  </span>
</GridLine>
{#if false}
<GridLine>
  <span class="grid-span-4">Small size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput isSpecialCharacterRequired={true}
        isUppercaseRequired={true}
        maximumLength=8
        size={SIZE_SMALL} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Large size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput isLowercaseRequired={true}
        isNumberRequired={true}
        isSpecialCharacterRequired={true}
        isUppercaseRequired={true}
        maximumLength=32
        minimumLength=8
        size={SIZE_LARGE} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Extra large size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput isLowercaseRequired={true}
        isNumberRequired={true}
        isSpecialCharacterRequired={true}
        isUppercaseRequired={true}
        maximumLength=32
        minimumLength=8
        size={SIZE_EXTRA_LARGE} />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Password input with no criteria</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Password input without helper (only error display)</span>
  <span class="grid-span-8">
    <form>
      <PasswordInput isLowercaseRequired={true}
        isNumberRequired={true} 
        isPasswordHelperVisible={false}
        isSpecialCharacterRequired={true}
        isUppercaseRequired={true} 
        minimumLength={8}
        />
    </form>
  </span>
</GridLine>
{/if}