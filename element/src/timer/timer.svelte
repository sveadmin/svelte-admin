<script lang="ts">
  export let callback: {() : void} = async () => {},
    interval: number = 60, //in seconds
    start: boolean = true

  let checkInterval: number = 0,
    checkPeriod: number = 1000,
    complete: number = 0,
    currentInterval: number = 0,
    inactive: boolean = false,
    running: boolean = false,
    startTime: number = 0

  const executeAction = async () => {
    inactive = true
    running = false
    await callback()
    inactive = false
    startInterval()
  }

  const startInterval = () => {
    const timeout = interval * 1000
    currentInterval = window.setTimeout(executeAction, timeout)
    checkInterval = window.setInterval(updateDiff, checkPeriod)
    startTime = new Date().getTime()
    running = true
  }

  const stopInterval = () => {
    window.clearTimeout(currentInterval)
    window.clearInterval(checkInterval)
    complete = 0
    running = false
  }

  const updateDiff = () => {
    if (startTime) {
      const timePassed = Math.floor((Date.now() - startTime) / 1000)
      if (timePassed > interval
        || timePassed < 0) {
        complete = 0
        return
      }
      complete = Math.floor(timePassed / interval * 100)
    }
  }

  const changeStatus = () => {
    if (running) {
      stopInterval()
    } else {
      startInterval()
    }
  }

  if (start) {
    startInterval()
  }
</script>
<timerconatainer>
  <input
    type="button"
    class="timer"
    class:running="{running}"
    class:inactive="{inactive}" 
    on:click={changeStatus}
    value="{(running) ? '■' : '▶'}"/>
  {#if running}
    <timerprogress style="width:{complete}%" />
  {/if}
</timerconatainer>

<style global src="./timer.css"></style>