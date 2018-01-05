<template>
  <div id="app">
      <div id="main-wrapper">
          <div class="toolbar navbar-fixed-top">
              <div class="uou-block-1a blog">
                  <div class="container">
                      <div class="search">
                          <ul class="authentication">
                              <li><a href="/">Home</a></li>
                              <li><a href="#">TribeHang ?</a></li>
                          </ul>
                      </div>
                      <ul class="social">
                          <li><a href="#" class="fa fa-facebook"></a></li>
                          <li><a href="#" class="fa fa-twitter"></a></li>
                          <li><a href="#" class="fa fa-google-plus"></a></li>
                      </ul>
                      <ul class="authentication">
                          <li v-if="user === ''"><a href="#">Login</a></li>
                          <li v-if="user !== ''"><a href="/logout">Logout</a></li>
                          <li><a href="#">Register</a></li>
                      </ul>
                  </div>
              </div>
          </div>

      </div>

      <div class="container" style="margin-top: 40px;" v-if="user !== ''">
          <router-view></router-view>
      </div>

      <welcome v-if="user === ''"></welcome>

      <div class="uou-block-4a secondary dark">
          <div class="container">
              <ul class="links">
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms &amp; Conditions</a></li>
              </ul>
              <p>Copyright &copy; 2018 <a href="/">TribeHang</a>. All Rights reserved.</p>
          </div>
      </div>

  </div>
</template>

<script>
  import auth from './services/auth'
  import Welcome from '@/components/Welcome'

  export default {
    components: {
      'welcome': Welcome
    },
    data () {
      return {
        user: ''
      }
    },
    methods: {
    },
    created () {
      auth.getUser(this)
    }
  }
</script>


<style scoped>
    .toolbar .uou-block-1a {
        -webkit-box-shadow: 1px -1px 5px 0px #000000c4;
        -moz-box-shadow: 1px -1px 5px 0px #000000c4;
        box-shadow: 1px -1px 5px 0px #000000c4;
    }
</style>
