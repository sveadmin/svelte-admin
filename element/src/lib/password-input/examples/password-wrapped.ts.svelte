<script lang="ts">
  import {
    PasswordInputWrapped,
  } from '$lib/password-input/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Input,
  } from '$lib/input/index.js'

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
      <PasswordInputWrapped id="password-wrapped1"
        isLowercaseRequired={true}
        isNumberRequired={true}
        minimumLength=8 />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Small size password input</span>
  <span class="grid-span-8">
    <form>
      <PasswordInputWrapped isSpecialCharacterRequired={true}
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
      <PasswordInputWrapped isLowercaseRequired={true}
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
      <PasswordInputWrapped isLowercaseRequired={true}
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
      <PasswordInputWrapped childrenConfig={{input: {stlye: "flex:1"}}}/>
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Password input without helper (only error display)</span>
  <span class="grid-span-8">
    <form>
      <PasswordInputWrapped isLowercaseRequired={true}
        isNumberRequired={true} 
        isPasswordHelperVisible={false}
        isSpecialCharacterRequired={true}
        isUppercaseRequired={true} 
        minimumLength={8}
        />
    </form>
  </span>
</GridLine>
<GridLine>
  <span class="grid-span-4">Password inside Input</span>
  <span class="grid-span-8">
    <Input areErrorsVisible={false}
      childrenConfig={{
        input: {
          style: 'flex:1'
        },
        label: {
          id: 'password-0'
        }
      }}
      class="grid-span-8"
      component={PasswordInputWrapped}
      id="password"
      isPasswordHelperVisible={false}
      label="Password"
      labelClass="grid-span-4" />
  </span>
</GridLine>