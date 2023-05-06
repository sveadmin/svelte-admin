<script>
  import DisplayDate from '../../block/display-date.svelte'

  /**
   * Format documentation at http://blog.stevenlevithan.com/archives/date-time-format
   */
  export let value, format = 'yyyy-mm-dd HH:MM'
</script>
<datacellcontent>
  <DisplayDate {format} {value}/>
</datacellcontent>