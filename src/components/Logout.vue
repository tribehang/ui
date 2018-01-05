<template>
  <div>
  </div>
</template>

<script>
  import auth from '../services/auth'
  
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
