<script lang="ts">
  import {
    DateDisplay,
  } from '$lib/date-display/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import ButtonSizes from '$lib/button/examples/button.ts.svelte'
  import ButtonIcons from '$lib/button/examples/button-icons.ts.svelte'
  import ButtonDisabled from '$lib/button/examples/button-disabled.ts.svelte'
  import ButtonClusters from '$lib/button/examples/button-clusters.ts.svelte'

  let clicks : Array<{name: string, time?: Date}> = $state([{name: 'NONE'},{name: 'NONE'},{name: 'NONE'},{name: 'NONE'},{name: 'NONE'}])

  const onClick : (event?: Event) => boolean = (event?: Event) => {
    if (!event) {
      return true
    }
    const currentTarget = event?.currentTarget as HTMLButtonElement
    if (currentTarget.tagName !== 'BUTTON') {
      return true
    }
    clicks.unshift({name: currentTarget.name, time: new Date()})
    clicks = clicks.slice(0, 5)
    return true
  }

</script>

<GridLine>
  <span class="grid-span-4">Last buttons clicked</span>
  <span class="grid-span-8">
    {#each clicks as click}
      <p>
        {click.name} @ <DateDisplay format="III" refreshInterval={1000}
            value={click.time} />
      </p>
    {/each}    
  </span>
</GridLine>
<ButtonSizes {onClick} />
<ButtonIcons {onClick} />
<ButtonDisabled {onClick} />
<ButtonClusters {onClick} />