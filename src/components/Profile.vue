<template>
  <div class="container">
      <div class="row">
          <div class="col-xs-6 col-md-3">
              <div class="profile-dashboard">
                    <h4>
                        <i class="fa fa-bar-chart" aria-hidden="true"> کنترل پنل</i>
                    </h4>

                  <ul>
                      <li>
                          <a>ویرایش اطلاعات پروفایل</a>
                      </li>
                      <li>
                          <a>فروش کالای جدید</a>
                      </li>
                      <li>
                          <a>مشاهده کالای ثبت شده</a>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="col-xs-12 col-md-9">
              <div class="profile-wrapper">
                   <div id="profile-data">
                       <dl class="dl-horizontal">
                           <dt>نام</dt>
                           <dd>{{ user.firstName }}</dd>

                           <dt>نام خانوادگی</dt>
                           <dd>{{ user.lastName }}</dd>

                           <dt>آدرس ایمیل</dt>
                           <dd>{{ user.email }}</dd>

                           <dt>تاریخ تولد</dt>
                           <dd>{{ user.dateOfBirth }}</dd>
                       </dl>

                       <!--<form class="login">-->
                           <!--<div class="group">-->
                               <!--<input autocomplete="off" type="email"><span class="highlight"></span><span class="bar"></span>-->

                               <!--<label>-->
                                   <!--<i class="fa fa-envelope" aria-hidden="true"></i>-->
                                   <!--<span>ایمیل</span>-->
                               <!--</label>-->
                           <!--</div>-->
                           <!--<div class="group">-->
                               <!--<input autocomplete="off" type="password"><span class="highlight"></span><span class="bar"></span>-->

                               <!--<label><i class="fa fa-unlock-alt" aria-hidden="true"></i><span>رمز عبور</span></label>-->
                           <!--</div>-->
                           <!--<div class="group">-->
                               <!--<input autocomplete="off" type="password"><span class="highlight"></span><span class="bar"></span>-->

                               <!--<label><i class="fa fa-unlock-alt" aria-hidden="true"></i><span>تکرار رمز عبور</span></label>-->
                           <!--</div>-->
                           <!--<button type="button" class="button buttonorng">ثبت نام-->
                               <!--<div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>-->
                           <!--</button>-->
                       <!--</form>-->
                   </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import user from '../auth/user.js'

  export default {
    data () {
      return {
        user: '',
        error: ''
      }
    },
    methods: {
      getUser () {
        user.setProfileDate(this)
      }
    },
    beforeMount () {
      this.getUser()
    }
  }
</script>

<style scoped>
   .profile-dashboard{
       background-color: #CCC;
       padding: 8px;
       border-radius: 5px;
       color: #555;
   } 
    
    .profile-dashboard h4{
        border-bottom: 2px solid #999;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }

   .profile-dashboard ul{
   }

   .profile-dashboard ul li{
       color: #ed8323;
       margin-bottom: 7px;
   }

   .profile-dashboard ul li a{
       color: #555;
       cursor: pointer;;
   }

    .profile-wrapper{
        background-color: #FFF;
        padding: 15px;
        border-radius: 2px;
        color: #555;
    }

   .dl-horizontal dt{
       text-align: right;
       margin-bottom: 10px;
   }
</style>
