<template>
  <div id="app">

      <vue-headful :title="this.$route.meta.title" />

      <div  class="wrapper" style="margin-top: 40px;">
          <router-view></router-view>
      </div>

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
  import vueHeadful from 'vue-headful'

  export default {
    components: {
      'vue-headful': vueHeadful
    },
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    }
  }
</script>


<style scoped>

</style>
