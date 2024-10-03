<script lang="ts">
  import {
    createFieldValidator,
    requiredValidator,
  } from '$lib/validator/index.js'

  const validateRequired = createFieldValidator([requiredValidator()])

</script>

<h2>Required</h2>
<input id="required" onchange={validateRequired.validateElement}>
<span>{validateRequired.result.message}</span>