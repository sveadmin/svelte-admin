<script lang="ts">
  import { router } from '../store.svelte.js'

</script>

<sveamain>
  <h1>Page not found :(</h1>
    <h2>404</h2>
  <p><a href="/" onclick={router.navigateFromLink}>Return to main page</a></p>
</sveamain>