<template>
  <div>
    some data
  </div>
</template>

<script>
  import auth from '../auth'
  
  export default {
    data () {
      return {
      }
    },
    beforeMount () {
      auth.logout()
    }
  }
</script>
