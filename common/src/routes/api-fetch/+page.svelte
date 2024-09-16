<script lang="ts">
  import {
    type ApiFetchConstructor,
    METHOD_GET,
    prepareApiFetch,
  } from '$lib/api-fetch/index.js'

  import {
    loader,
  } from '$lib/loader/index.js'

  import {
    status,
  } from '$lib/status/index.js'

  const apiFetchConstructor : ApiFetchConstructor = {
    loader,
    method: METHOD_GET,
  }

  const apiFetch = prepareApiFetch(apiFetchConstructor)

  const lastWaitTime = $state({value: null})

  async function getData() {
    const waitTime = await apiFetch({
      url: '/api-fetch/api'
    })
    lastWaitTime.value = await waitTime.response.json()
  }

  async function get404() {
    const response = await apiFetch({
      url: '/api-fetch/non-existent'
    })

    if (response.response.status === 404) {
      status.add({
        detail: response.response.status.toString(),
        message: response.response.statusText,
      })
    }
  }
</script>

Loader status: {(loader.state) ? 'ON' : 'off'}

<button onclick={getData}>Load Data</button>
<button onclick={get404}>404 error</button>

{#if lastWaitTime.value}
  Waited for the fetch for {lastWaitTime.value} ms.
{/if}
<div>
{#each status.messages as message}
  <p>{message.id}: {message.message}</p>
{/each}
</div>
