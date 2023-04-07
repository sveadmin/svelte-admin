<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import dateFormat from 'dateformat'

  /**
   * Format documentation at http://blog.stevenlevithan.com/archives/date-time-format
   */
  export let format:string = 'yyyy-mm-dd HH:MM',
    value: null | Date | string

  let date:null | Date

  beforeUpdate(() => {
    if (value === null) {
      date = null
      return
    }
    date = (value instanceof Date)
      ? value
      : new Date(value)
  })
</script>
{#if date !== null
  && date instanceof Date 
  && !isNaN(date.valueOf())
}
  {dateFormat(date, format)}
{/if}