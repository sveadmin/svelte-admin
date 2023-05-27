<script lang="ts">
  import { DateDisplay } from '@sveadmin/element'

  /**
   * Format documentation at http://blog.stevenlevithan.com/archives/date-time-format
   */
  export let 
    value: null | Date | string,
    format: string = 'yyyy-mm-dd HH:MM'
</script>
<datacellcontent>
  <DateDisplay {format} {value}/>
</datacellcontent>