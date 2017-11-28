<template>
  <div id="app">
      <div class="head-One fix-row">
        <div class="container">
          <div class="col-xs-2">
            <h4>آسان بفروش، مطمئن بخر.</h4>
          </div>
          <div class="col-xs-10">
            <div class="main-menu">
              <nav class="navbar navbar-default">
                <div class="container-fluid">
                  <div class="collapse navbar-collapse">
                    <form class="navbar-form navbar-left">
                      <div class="form-group">
                        <input type="text" class="form-control" placeholder="جستجو ...">
                      </div>
                      <button type="submit" class="btn btn-default search-btn"></button>
                    </form>
                    <ul class="nav navbar-nav navbar-left">
                      <li><a href="#"> {{ userFirstName }}  عزیز, خوش آمدید</a></li>
                      <li><a :href="userActionLink" class="fa fa-sign-out" aria-hidden="true"> {{ userActionName }}</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="head-Two fix-row">
        <div class="container">
          <div class="col-xs-2"> <div class="logo"><img src="./assets/images/logo.png" height="44" width="160"/></div></div>
          <div class="col-xs-10">
            <div class="main-menu">
              <nav class="navbar navbar-default">
                <div class="container-fluid">
                  <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                      <li><a href="/">خانه</a></li>
                      <li><a href="#">خرید</a></li>
                      <li><a href="#">فروش</a></li>
                      <li><a href="#">درباره ما</a></li>
                      <li><a href="#">تماس با ما</a></li>
                      <li v-html="userActionPanel"></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="head-Three fix-row">
        <div class="container">
          <div class="col-xs-10">
            <div class="main-menu">
              <nav class="navbar navbar-default">
                <div class="container-fluid">
                  <div class="navbar-header breadcrumbs" v-if="this.$route.meta.breadcrumbs">
                    <breadcrumbs :path="this.$route.path" :title="this.$route.meta.breadcrumbs"></breadcrumbs>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    <router-view></router-view>
    <section id="footer">
      <div class="container">
        <div class="column column-center">
          <ul>
            <li>
              <h3>
                خبرنامه
              </h3>
            </li>
            <li>
              <span>
                آدرس ایمیل خود را وارد کنید
              </span>
              <form>
                <div class="group">
                  <input autocomplete="off" type="email" />
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    <span>   نام کاربری یا ایمیل</span>
                  </label>
                </div>

                <button type="button" class="button buttonorng">ارسال
                  <div class="ripples buttonRipples">
                    <span class="ripplesCircle"></span>
                  </div>
              </button>
              </form>
            </li>
          </ul>
        </div>
        <div class="column column-left">
          <ul>
            <li>
              <h3>
                چطور میتونیم کمکتون کنیم ؟
              </h3>
            </li>
            <li>
              <h3 class="orange">
                 ۸۸۸۸۸۸۸۸ (۰۲۱) <br> info[at]semsari.net
              </h3>
            </li>
            <li>
              <span>
                پشتیبانی ۲۴ ساعته
              </span>
            </li>
          </ul>
        </div>
        <div class="column column-right">
          <ul>
            <li>
              <div class="logo"><img src="./assets/images/logo.png" height="44" width="160"/></div>
            </li>
            <li>
              <span>
                                رسالت و هدف سمساری و توضیحات در مورد وب سایت
              </span>
            </li>
            <li>
              <a href="#" class="fa fa-facebook social-btn"></a>
              <a href="#" class="fa fa-twitter social-btn"></a>
              <a href="#" class="fa fa-google social-btn"></a>
              <a href="#" class="fa fa-instagram social-btn"></a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import user from './auth/user.js'
  import Breadcrumbs from '@/components/Breadcrumbs'

  export default {
    components: {
      'breadcrumbs': Breadcrumbs
    },
    data () {
      return {
        userFirstName: 'کاربر',
        userActionName: 'ورود',
        userActionLink: '/login',
        userActionPanel: ''
      }
    },
    methods: {
      getUser () {
        user.getHomeUserData(this)
      }
    },
    beforeMount () {
      this.getUser()
    }
  }
</script>


<style scoped>
  .head-One{
    background-color: #ed8323;
    height:50px;
  }

  .head-Three .container{
    padding-bottom: 0px
  }

  .head-Three .navbar-default{
    margin-bottom: 0px;
  }

  h4 {
    font-size: 16px;
    color: #fff;
  }

  .head-Two .navbar-nav{
    float: left;
  }

  .head-Two .navbar-nav li a{
    color: #000;
  }

  .head-Two .container{
    padding-bottom:0px;
  }

  .breadcrumbs i{
      color: #ed8323;
  }
</style>
