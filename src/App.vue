<template>
  <div id="app">
      <div v-if="this.$route.name !== 'Home'">
        <!--Test-->
      </div>

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
                          <li><a href="#">Login</a></li>
                          <li><a href="#">Register</a></li>
                      </ul>
                  </div>
              </div>
          </div>

          <div class="home-pro" style="margin-top: 40px;" v-if="this.$route.name === 'Home'">
              <div class="banr-head">
                  <div class="container">
                      <div class="row">
                          <div class="col-sm-7">
                              <div class="text-area">
                                  <div class="position-center-center col-md-10">
                                      <h3> Connect with your friends — and other fascinating people. Get in-the-moment updates on the events that interest you. And watch them unfold, in real time, from every angle.</h3>
                                  </div>
                              </div>
                          </div>

                          <div class="col-sm-5">
                              <div class="login-sec">
                                  <div class="uou-tabs">
                                      <div class="content">
                                          <div id="log-in" class="active">
                                              <form>
                                                  <input type="email" placeholder="Email Address">
                                                  <input type="password" placeholder="Password">
                                                  <button type="submit">Login</button>
                                                  <div class="login-with">
                                                      <span>Or login with:</span>
                                                      <a href="#."><i class="fa fa-facebook"></i></a>
                                                      <a href="#."><i class="fa fa-twitter"></i></a>
                                                      <a href="#."><i class="fa fa-google"></i></a>
                                                  </div>
                                                  <div class="forget">Forgot your password? <a href="#.">Click Here</a></div>
                                              </form>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              <div class="login-sec">
                                  <div class="uou-tabs">
                                      <div class="content">
                                          <div id="register" class="active">
                                              <form>
                                                  <h4>New to TribeHang ?</h4>
                                                  <input type="text" placeholder="Full Name">
                                                  <input type="email" placeholder="Email Address">
                                                  <input type="text" placeholder="Phone">
                                                  <input type="password" placeholder="Password">
                                                  <button type="submit">Register</button>
                                                  <div class="login-with">
                                                      <span>Or login with:</span>
                                                      <a href="#."><i class="fa fa-facebook"></i></a>
                                                      <a href="#."><i class="fa fa-twitter"></i></a>
                                                      <a href="#."><i class="fa fa-google"></i></a>
                                                  </div>                                              </form>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <div class="container" style="margin-top: 40px;">
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
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    beforeMount () {
    }
  }
</script>


<style scoped>
    #register h4{
        margin-top:0px;
        color: #FFFFFF;
    }

    .toolbar .uou-block-1a {
        -webkit-box-shadow: 1px -1px 5px 0px #000000c4;
        -moz-box-shadow: 1px -1px 5px 0px #000000c4;
        box-shadow: 1px -1px 5px 0px #000000c4;
    } 
    
    .banr-head .login-sec .uou-tabs form{
        padding:30px;
    }
</style>
