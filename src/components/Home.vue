<template>
  <div>
      <div id="main-wrapper">
          <div class="toolbar navbar-fixed-top">
              <div class="uou-block-1a blog">
                  <div class="container">
                      <div class="search">
                          <ul class="authentication">
                              <li><a href="/">{{user.name}}</a></li>
                              <li><a href="#">TribeHang ?</a></li>
                          </ul>
                      </div>
                      <ul class="social">
                          <li><a href="#" class="fa fa-facebook"></a></li>
                          <li><a href="#" class="fa fa-twitter"></a></li>
                          <li><a href="#" class="fa fa-google-plus"></a></li>
                      </ul>
                      <ul class="authentication">
                          <li><a href="/logout">Logout</a></li>
                          <li><a href="#">Register</a></li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      <div class="container">
          Home Page
      </div>

  </div>
</template>

<script>
  import auth from '../services/auth'

  export default {
    components: {
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
