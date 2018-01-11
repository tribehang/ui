<template>
  <div>
      <userTopHeader :user="user"></userTopHeader>

      <div class="container">
          Home Page
      </div>

  </div>
</template>

<script>
  import auth from '../services/auth'
  import UserTopHeader from '@/components/UserTopHeader'

  export default {
    components: {
      'userTopHeader': UserTopHeader
    },
    data () {
      return {
        user: ''
      }
    },
    methods: {
    },
    beforeCreate () {
      auth.getUser(this)
    }
  }
</script>

<style scoped>

</style>
