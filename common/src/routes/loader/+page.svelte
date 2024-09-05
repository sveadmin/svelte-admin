<script lang="ts">
  import {
    loader,
  } from '$lib/loader/index.js'

  const keys: string[] = $state([])

  function registerTask() {
    const newKey = loader.registerTask()
    keys.push(newKey)
  }

  function unregisterTask(event: Event) {
    const target = event.target as HTMLElement
    const id: string = target.dataset.id
    loader.unregisterTask(id)
    const index = keys.indexOf(id)
    keys.splice(index, 1)
  }

</script>

Loader status: {(loader.state) ? 'ON' : 'off'}

<button onclick={registerTask}>Register new task</button>

{#each keys as key}
  Task ID: {key} <button onclick={unregisterTask} data-id={key}>Unregister task</button>
{/each}
