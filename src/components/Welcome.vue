<template>
    <div>
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
                            <li><a href="/">Login</a></li>
                            <li><a href="#">Register</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="home-pro">
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
                                            <form @submit.prevent="validateSignInForm('form-1')" data-vv-scope="form-1">

                                                <div class="column is-12">
                                                    <input name="email" v-model="signInEmailAddress" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email Address">
                                                    <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                                </div>

                                                <div class="column is-12">
                                                    <input name="password" v-model="signInPassword" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password">
                                                    <i v-show="errors.has('password')" class="fa fa-warning"></i>
                                                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                                </div>


                                                <div class="column is-12">
                                                    <p class="control">
                                                        <button class="button is-primary" type="submit" name="button">Sign In</button>
                                                    </p>
                                                </div>
                                                <div class="login-with">
                                                    <span>Or login with:</span>
                                                    <a href="#."><i class="fa fa-facebook"></i></a>
                                                    <a href="#."><i class="fa fa-twitter"></i></a>
                                                    <a href="#."><i class="fa fa-google"></i></a>
                                                </div>

                                                <span class="is-danger"><br>{{signInErrorMessage}}</span>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="login-sec">
                                <div class="uou-tabs">
                                    <div class="content">
                                        <div id="register" class="active">
                                            <form @submit.prevent="validateSignUpForm">
                                                <h4>New to TribeHang ?</h4>
                                                <div class="column is-12">
                                                    <input name="name" v-model="signUpFullName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Full Name">
                                                    <i v-show="errors.has('name')" class="fa fa-warning"></i>
                                                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                                                </div>

                                                <div class="column is-12">
                                                    <input name="email" v-model="signUpEmailAddress" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email Address">
                                                    <i v-show="errors.has('email')" class="fa fa-warning"></i>
                                                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                                </div>

                                                <div class="column is-12">
                                                    <input name="password" v-model="signUpPassword" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password">
                                                    <i v-show="errors.has('password')" class="fa fa-warning"></i>
                                                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                                </div>


                                                <div class="column is-12">
                                                    <p class="control">
                                                        <button class="button is-primary" type="submit" name="button">Sign up</button>
                                                    </p>
                                                </div>
                                                <div class="login-with">
                                                    <span>Or login with:</span>
                                                    <a href="#."><i class="fa fa-facebook"></i></a>
                                                    <a href="#."><i class="fa fa-twitter"></i></a>
                                                    <a href="#."><i class="fa fa-google"></i></a>
                                                </div>

                                                <span class="is-danger"><br>{{signUpErrorMessage}}</span>

                                                <span class="is-danger"><br>{{signUpSuccessMessage}}</span>

                                            </form>
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
</template>

<script>

import auth from '../services/auth'

export default {
  data () {
    return {
      signUpFullName: '',
      signUpEmailAddress: '',
      signUpPassword: '',
      signUpErrorMessage: '',
      signUpSuccessMessage: '',
      signInEmailAddress: '',
      signInPassword: '',
      signInErrorMessage: ''
    }
  },
  methods: {
    validateSignUpForm () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.signUp()
        }
      })
    },
    validateSignInForm (scope) {
      this.$validator.validateAll(scope).then((result) => {
        if (result) {
          this.signIn()
        }
      })
    },
    signUp () {
      auth.signUp(
        this,
        this.signUpFullName,
        this.signUpEmailAddress,
        this.signUpPassword
      )
    },
    signIn () {
      auth.signIn(
        this,
        this.signInEmailAddress,
        this.signInPassword
      )
    }
  }
}
</script>

<style scoped>
    .is-danger {
        color: orange;
        margin-bottom: 25px;
        display: inline-block;
    }

    #register h4{
        margin-top:0px;
        color: #FFFFFF;
    }

    .banr-head .login-sec .uou-tabs form{
        padding:30px;
    }
</style>
