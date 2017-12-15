<template>
  <div>
    <section id="header">
      <div class="container">
        <div class="row head-One">
          <div class="col-xs-2"> <div class="logo"><img src="../assets/images/logo.png" height="44" width="160"/></div></div>
          <div class="col-xs-10">
            <div class="main-menu">
              <nav class="navbar navbar-default">
                <div class="container-fluid">
                  <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span class="sr-only">Toggle navigation</span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>

                  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                      <li><a href="/" v-translate>HOME</a></li>
                      <li><a href="#" v-translate>BUY</a></li>
                      <li><a href="/profile#sell-new-item" v-translate>SELL</a></li>
                      <li><a href="#" v-translate>ABOUT_US</a></li>
                      <li><a href="#" v-translate>CONTACT_US</a></li>
                      <li v-html="userActionPanel"></li>
                    </ul>
                    <form class="navbar-form navbar-left">
                      <div class="form-group">
                        <input autocomplete="off" type="text" class="form-control" placeholder="جستجو ...">
                      </div>
                      <button type="submit" class="btn btn-default search-btn"></button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>




        <div class="row head-two">
          <div class="col-xs-12">
            <h1 v-translate>COMPANY_SLOGAN</h1>
          </div>
        </div>
        <div class="row head-three">
          <div class="wrapper">
            <div class="container">
              <div class="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
                <ul class="nav nav-tabs nav-tabs-responsive myTab" role="tablist">
                  <li role="presentation" class="active">
                    <a href="#sale" id="sale-tab" role="tab" data-toggle="tab" aria-controls="sale" aria-expanded="true" v-on:click="toggleShow()">
                      <span class="text" v-translate>HOME_I_WANT_TO_SELL</span>
                    </a>
                  </li>
                  <li role="presentation" class="next">
                    <a href="#buy" role="tab" id="buy-tab" data-toggle="tab" aria-controls="buy" v-on:click="toggleShow(true)">
                      <span class="text" v-translate>HOME_I_WANT_TO_BUY</span>
                    </a>
                  </li>
                  <li role="presentation" class="fl">
                    <a href="#login" role="tab" id="register-tab" data-toggle="tab" aria-controls="register" v-on:click="toggleShow()">
                      <span class="text" v-translate>REGISTER</span>
                    </a>
                  </li>
                  <li role="presentation" class="fl">
                    <a href="#register" role="tab" id="login-tab" data-toggle="tab" aria-controls="login" v-on:click="toggleShow()">
                      <span class="text" v-translate>LOGIN</span>
                    </a>
                  </li>
                </ul>
                <div class="tab-content myTabContent">
                  <div role="tabpanel" class="tab-pane fade in active" id="sale" aria-labelledby="sale-tab">
                    <div class="col-xs-10">

                      <img src="../assets/images/sale-steps.png"/></div>
                    <div class="col-xs-2">
                      <div class="f-width tab-txt">
                        <p v-translate>HOME_BANNER_MESSAGE</p>
                      </div>
                      <div class="f-width button buttonorng">
                        <a href="/profile#sell-new-item" v-translate>SELL_ITEM</a>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" id="buy" class="fade" aria-labelledby="buy-tab" v-if="show">

                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <select v-model="selectedCategory" class="form-control" v-on:change="changeSubCategories">
                            <option value="" selected v-translate>دسته بندی</option>
                            <option v-for="category in categories" :value="category">{{ category.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <vue-slider width="150%" ref="slider" v-model="value" :formatter="formatter" :max="max" :bgStyle="bgStyle" :interval="100000"></vue-slider>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <select v-model="selectedSubCategory" class="form-control">
                            <option disabled value="" v-translate>PLEASE_CHOOSE_SUB_CATEGORY</option>
                            <option v-for="subCategory in subCategories" :value="subCategory">{{ subCategory.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <vue-slider width="150%" tooltip="hover" :piecewiseStyle="piecewiseStyle" :style="style" ref="slider2" :piecewise="piecewise" :piecewiseLabel="piecewiseLabel" :data="creationYears" v-model="firstYear" :bgStyle="bgStyle"></vue-slider>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <select v-model="selectedConditionIndex" class="form-control">
                            <option disabled value="" v-translate="">PLEASE_CHOOSE_CONDITION</option>
                            <option v-for="(condition, index) in conditions" :value="index">{{ condition.title }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <button v-on:click="getIndex()" type="button" class="btn btn-success" v-translate style="float: right;">CONFIRM</button>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div role="tabpanel" class="tab-pane fade" id="register" aria-labelledby="register-tab">
                    <form autocomplete="off" class="login">
                      <div class="group">
                        <input autocomplete="off" v-model="credentials.username" type="email">
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>
                          <i class="fa fa-user-circle" aria-hidden="true"></i>
                          <span v-translate>INSERT_EMAIL_OR_USERNAME</span>
                        </label>
                      </div>
                      <div class="group">
                        <input autocomplete="off" v-model="credentials.password" type="password">
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label>
                          <i class="fa fa-unlock-alt" aria-hidden="true"></i><span v-translate>PASSWORD</span>
                        </label>
                      </div>
                      <button type="button" class="button buttonorng" @click="login()"><span v-translate>LOGIN</span>
                        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                      </button>
                      <a href="#" class="f-width forget-pass" v-translate>FORGOT_PASSWORD_MESSAGE</a>
                      <p class="bg-danger fa fa-exclamation-triangle" v-if="loginError !== ''">{{ loginError }}</p>
                    </form>
                  </div>
                  <div role="tabpanel" class="tab-pane fade" id="login" aria-labelledby="login-tab">
                    <form class="login">
                      <div class="group">
                        <input autocomplete="off" type="email" v-model="registerCredentials.email"><span class="highlight"></span><span class="bar"></span>

                        <label>
                          <i class="fa fa-envelope" aria-hidden="true"></i>
                          <span v-translate>EMAIL_ADDRESS</span>
                        </label>
                      </div>
                      <div class="group">
                        <input autocomplete="off" type="password" v-model="registerCredentials.password"><span class="highlight"></span><span class="bar"></span>

                        <label><i class="fa fa-unlock-alt" aria-hidden="true"></i><span v-translate>PASSWORD</span></label>
                      </div>
                      <div class="group">
                        <input autocomplete="off" type="password" v-model="registerCredentials.password_confirm"><span class="highlight"></span><span class="bar"></span>

                        <label><i class="fa fa-unlock-alt" aria-hidden="true"></i><span v-translate>PASSWORD_REPEAT</span></label>
                      </div>
                      <button type="button" class="button buttonorng" @click="register()">
                        <span v-translate>REGISTER</span>
                        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
                      </button>
                      <p class="bg-danger fa fa-exclamation-triangle" v-if="registerError !== ''">{{ registerError }}</p>
                      <p class="bg-success fa fa-check-circle-o" v-if="registerSuccess !== ''">{{ registerSuccess }}</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="content">
      <div class="container">
        <div class="row">
          <div class="col-xs-7">
            <div class="f-width adv">
              <img src="../assets/images/adv-laptop.jpg" height="231" width="668"/></div>
          </div>
          <div class="col-xs-5">
            <div class="f-width adv">
              <img src="../assets/images/adv-mobile.jpg" height="231" width="451"/></div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <ul class="nav nav-tabs">
              <li class="latest-items-tablinks active" id="latest-items" v-on:click="openTab('latest-items', 'tab-latest-items', $event)" v-translate>LATEST_PRODUCTS</li>
            </ul>
            <div id="tab-latest-items" class="latest-items-tabcontent">
              <div class="tab-content myTabContent">

                <section class="center slider">
                  <swiper :options="swiperOption">
                    <swiper-slide class="f-width pro-cart" v-for="item in latestArticles" :key="item.id">
                      <div class="f-width pro-pic">
                        <img src="../assets/images/product.png" height="100" width="75"/>
                      </div>
                      <div class="f-width pro-ttl">
                        <a :href="getArticleLink(item.id)">{{item.category.data.name}}</a>
                      </div>
                      <div class="f-width pro-time">
                        <i class="fa fa-clock-o"></i>
                        <span class="bold black">سال : </span>
                        <span>{{item.createYear}}</span>
                      </div>
                      <div class="f-width pro-price">
                        <i class="fa fa-money"></i>
                        <span class="bold black">قیمت :</span>
                        <span>{{item.price}}</span> <span>تومان</span>
                      </div>
                      <div class="f-width pro-buy-more">
                        <a :href="getArticleLink(item.id)" class="pro-more" v-translate>MORE_INFORMATION</a>
                        <a :href="getArticleLink(item.id)" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                      </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                  </swiper>
                </section>
              </div>
            </div>
          </div>
        </div>

        <br>

        <div class="row">
          <div class="col-xs-12">
            <ul class="nav nav-tabs">
              <li class="categories-tablinks active" id="iphone7" v-on:click="openTab('categories', 'tab-iphone', $event)">iphone 7</li>
              <li class="categories-tablinks hidden" id="iphone5s" v-on:click="openTab('categories', 'tab-iphone5s', $event)">iphone5s</li>
            </ul>
            <div id="tab-iphone7" class="categories-tabcontent">
              <div class="tab-content myTabContent">
                <section class="center slider">
                  <swiper :options="swiperOption">
                    <swiper-slide class="f-width pro-cart" v-for="item in latestArticlesByCategory" :key="item.id">
                      <div class="f-width pro-pic">
                        <img src="../assets/images/product.png" height="100" width="75"/>
                      </div>
                      <div class="f-width pro-ttl">
                        <a :href="getArticleLink(item.id)">{{item.category.data.name}}</a>
                      </div>
                      <div class="f-width pro-time">
                        <i class="fa fa-clock-o"></i>
                        <span class="bold black">سال : </span>
                        <span>{{item.createYear}}</span>
                      </div>
                      <div class="f-width pro-price">
                        <i class="fa fa-money"></i>
                        <span class="bold black">قیمت :</span>
                        <span>{{item.price}}</span> <span>تومان</span>
                      </div>
                      <div class="f-width pro-buy-more">
                        <a :href="getArticleLink(item.id)" class="pro-more" v-translate>MORE_INFORMATION</a>
                        <a :href="getArticleLink(item.id)" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                      </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                  </swiper>
                </section>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sale from '../services/sale'
  import user from '../auth/user'
  import auth from '../auth'
  import article from '../services/article'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import vueSlider from 'vue-slider-component'

  export default {
    components: {
      swiper,
      swiperSlide,
      vueSlider
    },
    data () {
      return {
        piecewise: true,
        piecewiseLabel: true,
        firstYear: [2013, 2015],
        creationYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        style: {
          'marginLeft': '10%'
        },
        piecewiseStyle: {
          'backgroundColor': '#ccc',
          'visibility': 'visible',
          'width': '12px',
          'height': '12px'
        },
        value: [1000000, 3000000],
        max: 5000000,
        show: false,
        formatter: '{value} تومان',
        bgStyle: {
          'backgroundColor': '#fff',
          'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
        },
        userFirstName: 'کاربر',
        userActionName: 'ورود',
        userActionLink: '/login',
        userActionPanel: '',
        credentials: {
          username: '',
          password: ''
        },
        registerCredentials: {
          email: '',
          password: '',
          password_confirm: ''
        },
        registerError: '',
        registerSuccess: '',
        loginError: '',
        latestArticles: [],
        latestArticlesByCategory: [],
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        categories: [],
        subCategories: [],
        selectedCategory: '',
        selectedSubCategory: '',
        selectedConditionIndex: '',
        conditions: sale.data().availableConditions
      }
    },
    methods: {
      getIndex () {
        console.log(this.$refs.slider.getIndex())
      },
      toggleShow (value = false) {
        if (value === true) {
          this.show = true
        } else {
          this.show = false
        }
      },
      getArticleLink (itemId) {
        return '/article/' + itemId
      },
      getUser () {
        user.getHomeUserData(this)
      },
      login () {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        auth.login(this, credentials)
      },
      register () {
        var credential = {
          email: this.registerCredentials.email,
          password: this.registerCredentials.password,
          password_confirm: this.registerCredentials.password_confirm
        }
        auth.register(this, credential)
      },
      openTab (section, targetDiv, event) {
        var i, tabcontent

        tabcontent = jQuery('.' + section + '-tabcontent')
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = 'none'
        }

        jQuery('.' + section + '-tablinks').removeClass('active')
        document.getElementById(targetDiv).style.display = 'block'
        event.currentTarget.className += ' active'
      },
      checkMainTabs () {
        jQuery('.categories-tabcontent').hide()
        jQuery('.categories-tabcontent')[0].style.display = 'block'
      },
      changeSubCategories () {
        sale.getSubCategories(this, this.selectedCategory.id)
      }
    },
    beforeMount () {
      this.getUser()
      article.getLatestArticles(this, 10)
      article.getLatestArticlesByCategory(this, 'iphone7', 10)
      sale.getCategories(this)
    },
    mounted () {
      this.checkMainTabs()
    }
  }
</script>

<style scoped>
  .navbar-default .navbar-nav > li > a{color:#fff !important;}

  .fa-exclamation-triangle:before, .fa-check-circle-o:before{
    margin-left:5px;
  }

  .tab-content{
    width: 100%;
  }

  .bg-danger, .bg-success{
    padding: 10px
  }

  li.latest-items-tablinks, li.categories-tablinks {
    background-color: #CCC;
    padding: 12px 20px;
    right: 3px;
    cursor: pointer;
    border-radius: 4px 4px 0 0;
  }

  li.latest-items-tablinks:hover, li.categories-tablinks:hover{
    background-color: #FFF;
  }

  li.latest-items-tablinks.active, li.categories-tablinks.active{
    background: #fff;
    color: #ed8323;
    border-top: 2px solid #ed8323 !important;
  }

  .myTabContent{
    padding:15px 30px;
  }

  .swiper-button-prev {
    background-size: 70%;
    right: 0px;
  }

  .swiper-button-next{
    background-size: 70%;
    left: 0px;
  }

  #buy .row{
    margin-bottom: 20px;
    margin-top: 25px;
  }

  #buy .row .col-md-3{
    margin-right: 30px;
  }
</style>
