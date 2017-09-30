<template>
  <div class="container">
        <div role="tabpanel" class="tab-pane" id="register" aria-labelledby="register-tab">
            <form class="login">
                <h4 class="fa fa-address-card-o fa-lg" v-translate>ENTER_TO_PROFILE</h4>
                <div class="group">
                    <input autocomplete="off" v-model="credentials.username" type="email">
                    <span class="highlight"></span>
                    <span class="bar"></span>

                    <label>
                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                        <span>   نام کاربری یا ایمیل</span>
                    </label>
                </div>
                <div class="group">
                    <input autocomplete="off" v-model="credentials.password" type="password">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>
                        <i class="fa fa-unlock-alt" aria-hidden="true"></i><span>رمز عبور</span>
                    </label>
                </div>
                <button type="button" class="button buttonorng" @click="submit()">ورود
                    <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                </button>
                <a href="#" class="f-width forget-pass">رمز عبور خود را فراموش کرده ام.</a>
                <p class="bg-danger fa fa-exclamation-triangle" v-if="loginError !== ''">{{ loginError }}</p>
            </form>
        </div>
  </div>

</template>

<script>
  import auth from '../auth'
  
  export default {
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        loginError: ''
      }
    },
    methods: {
      submit () {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        auth.login(this, credentials)
      }
    }

  }
</script>

<style scoped>
    .login{
        width:600px;
    }

    .login h4{
        border-bottom: 2px solid #ed8324;
        padding-bottom: 10px;
        margin-bottom: 25px;
        display: block;
        font-size: 18px;
    }

    .fa-address-card-o:before{
        margin-left: 10px;
    }

    .fa-exclamation-triangle:before{
        margin-left:5px;
    }

    .bg-danger{
        padding: 10px
    }
</style>
