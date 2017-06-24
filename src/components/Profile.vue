<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <button class="btn btn-primary" @click="getUser()">Get User information on console</button>
    <div>{{ profile }}</div>
  </div>
</template>

<script>
  import user from '../auth/user.js'
  
  export default {
    data () {
      return {
        profile: '',
        error: ''
      }
    },
    methods: {
      getUser () {
        this.profile = user.getUserProfile(this)
      }
    }

  }
</script>
