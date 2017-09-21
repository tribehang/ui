<template>
  <div class="container">
      <div class="row">
          <h4>
              <i class="fa fa-bar-chart" aria-hidden="true"> کنترل پنل</i>
          </h4>
          <vue-tabs active-tab-color="#e74c3c"
                    active-text-color="white"
                    type="pills"
                    :start-index="1"
                    direction="vertical"
          >

              <v-tab title="ویرایش اطلاعات پروفایل" icon="ti-user">
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
              </v-tab>

              <v-tab title="فروش کالای جدید" icon="ti-settings">
                  <div id="sell-steps">
                      <vue-tabs active-tab-color="#e74c3c"
                                active-text-color="white"
                                type="pills"
                                text-position="bottom"
                                centered
                      >
                          <v-tab title="۱.  انتخاب نوع کالا">
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select v-model="selected" class="form-control">
                                              <option disabled value="">لطفا دسته بندی کالای خود  را انتخاب کنید</option>
                                              <option v-for="test in tests" :value="test">{{ test.text }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">دسته بندی کالا چیست</div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select class="form-control">
                                              <option selected>لطفا زیرمجموعه کالای  خود را انتخاب کنید</option>
                                              <option value="two">زیرمجموعه یک</option>
                                              <option value="three">زیرمجموعه دو</option>
                                              <option value="four">زیرمجموعه سه</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">زیرمجموعه کالا چیست</div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select class="form-control">
                                              <option selected>لطفا سال تولید کالای خود را انتخاب کنید</option>
                                              <option value="two">سال یک</option>
                                              <option value="three">سال دو</option>
                                              <option value="four">سال سه</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">سال تولید کالا چیست</div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select class="form-control">
                                              <option selected>لطفا وضعیت کنونی کالای خود را انتخاب کنید</option>
                                              <option value="two">وضعیت یک</option>
                                              <option value="three">وضعیت دو</option>
                                              <option value="four">وضعیت سه</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">وضعیت کنونی کالا چیست</div>
                              </div>
                              <div class="row">
                                  <button style="float: left;" type="button" class="btn btn-info" v-on:click="showLevelTwo">مرحله بعد</button>
                              </div>
                          </v-tab>

                          <v-tab title="۲. اطلاعات تکمیلی">
                              <h4 class="product-selected-title">کالای انتخابی شما: {{selectedProduct}}</h4>

                              <br>

                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select class="form-control">
                                              <option selected>لطفا میزان حافظه کالای خود را انتخاب کنید</option>
                                              <option value="two">یک</option>
                                              <option value="three">دو</option>
                                              <option value="four">سه</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select class="form-control">
                                              <option selected>لطفا رنگ بدنه کالای خود را انتخاب کنید</option>
                                              <option value="two">یک</option>
                                              <option value="three">دو</option>
                                              <option value="four">سه</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>

                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select class="form-control">
                                              <option selected>لطفا مشکلات کالای  خود را انتخاب کنید</option>
                                              <option value="two">یک</option>
                                              <option value="three">دو</option>
                                              <option value="four">سه</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <textarea class="form-control" rows="3" placeholder="توضیحات بیشتر در مورد مشکلات کالا"></textarea>
                                      </div>
                                  </div>
                              </div>

                              <div class="row">
                                  <div class="col-md-6">
                                      <label class="col-sm-3 control-label" style="line-height: 36px;">شارژ:</label>
                                      <div class="radio col-sm-9">
                                          <label class="radio-inline control-label">
                                              <input type='radio' name="rating" value="1"> دارد
                                          </label>

                                          <label class="radio-inline control-label">
                                              <input type='radio' name="rating" value="2">ندارد
                                          </label>
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                      <label class="col-sm-3 control-label" style="line-height: 36px;">جعبه:</label>
                                      <div class="radio col-sm-9">
                                          <label class="radio-inline control-label">
                                              <input type='radio' name="rating" value="1"> دارد
                                          </label>

                                          <label class="radio-inline control-label">
                                              <input type='radio' name="rating" value="2">ندارد
                                          </label>
                                      </div>
                                  </div>
                              </div>

                              <div class="row">
                                  <div class="col-md-6">
                                      <br>
                                      <div class="form-group">
                                          <h4>تصویر کالا:</h4>
                                          <vue-base64-file-upload
                                                  class="image-upload-thumbnail"
                                                  accept="image/png,image/jpeg"
                                                  image-class="v1-image"
                                                  placeholder="برای ارسال عکس اینجا را کلیک کنید"
                                                  input-class="v1-image"
                                                  :max-size="customImageMaxSize"
                                                  @size-exceeded="onSizeExceeded"
                                                  @file="onFile"
                                                  @load="onLoad" />
                                      </div>
                                  </div>
                                  <div class="col-md-6">
                                  </div>
                              </div>

                              <div class="row">
                                  <div class="col-md-12" style="text-align: left;">
                                      <button type="button" class="btn btn-info" v-on:click="showLevelOne">مرحله قبل</button>
                                      <button type="button" class="btn btn-info" v-on:click="showLevelThree">مرحله بعد</button>
                                  </div>
                              </div>
                          </v-tab>

                          <v-tab title="۳. ثبت کالا">
                              <h4>اطلاعات اصلی</h4>

                              <div class="row review-box">
                                  <div class="col-md-12">
                                      <div class="col-md-6">
                                          <span>دسته بندی</span> : <i>دسته</i>
                                      </div>
                                      <div class="col-md-6">
                                          <span>زیرمجموعه</span> : <i>یک</i>
                                      </div>
                                  </div>

                                  <div class="col-md-12">
                                      <div class="col-md-6">
                                          <span>سال تولید</span> : <i>دسته</i>
                                      </div>
                                      <div class="col-md-6">
                                          <span>وضعیت کنونی</span> : <i>یک</i>
                                      </div>
                                  </div>

                              </div>

                              <h4>اطلاعات تکمیلی</h4>
                              <div class="row review-box">
                                  <div class="col-md-12">
                                      <div class="col-md-6">
                                          <span>دسته بندی</span> : <i>دسته</i>
                                      </div>
                                      <div class="col-md-6">
                                          <span>زیرمجموعه</span> : <i>یک</i>
                                      </div>
                                  </div>

                                  <div class="col-md-12">
                                      <div class="col-md-6">
                                          <span>سال تولید</span> : <i>دسته</i>
                                      </div>
                                      <div class="col-md-6">
                                          <span>وضعیت کنونی</span> : <i>یک</i>
                                      </div>
                                  </div>
                              </div>

                              <h4>عکس های محصول</h4>
                              <div class="row review-box">
                                  <img :src="imageUploadBase64">
                              </div>

                              <div class="row">
                                  <div class="col-md-12" style="text-align: left;">
                                      <button type="button" class="btn btn-info" v-on:click="showLevelTwo">مرحله قبل</button>
                                      <button type="button" class="btn btn-warning" v-on:click="">تائید</button>
                                  </div>
                              </div>
                          </v-tab>
                      </vue-tabs>

                  </div>
              </v-tab>

              <v-tab title="مشاهده کالای ثبت شده" icon="ti-check">
                  <div class="container">
                           ddd
                  </div>
              </v-tab>
          </vue-tabs>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueBase64FileUpload from 'vue-base64-file-upload'
  import {VueTabs, VTab} from 'vue-nav-tabs'

  Vue.use(VueTabs)

  import user from '../auth/user.js'

  export default {
    data () {
      return {
        user: '',
        error: '',
        selectedProduct: 'موبايل اپل مدل iPhone 6s',
        customImageMaxSize: 1,
        imageUploadBase64: '',
        selected: '',
        tests: [
          { value: 1, text: 'دسته یک' },
          { value: 2, text: 'دسته دو' },
          { value: 3, text: 'دسته سه' }
        ]
      }
    },
    components: {
      VueTabs,
      VTab,
      VueBase64FileUpload
    },
    methods: {
      onFile (file) {
      },
      onLoad (dataUri) {
        this.imageUploadBase64 = dataUri
      },
      onSizeExceeded (size) {
        alert(`Image ${size}Mb size exceeds limits of ${this.customImageMaxSize}Mb!`)
      },
      getUser () {
        user.setProfileDate(this)
      },
      showLevelOne () {
        $('#sell-steps .nav-pills li:nth-child(1)').click()
      },
      showLevelTwo () {
        $('#sell-steps .nav-pills li:nth-child(2)').click()
      },
      showLevelThree () {
        $('#sell-steps .nav-pills li:nth-child(3)').click()
      }
    },
    beforeMount () {
      this.getUser()
    }
  }
</script>

<style>
   .dl-horizontal dt{
       text-align: right;
       margin-bottom: 10px;
   }

   .vue-tabs .nav-pills > li > a{
       color: #ed8323;
       padding: 5px 20px;
       float: right;
   }

   .vue-tabs .nav-pills > li.active > a{
       color: #ed8323;
       background-color: #CCC !important;
   }

   .vue-tabs .nav-pills > li > a:hover{
       color: #ed8323;
       background-color: #CCC !important;
   }

    .nav-tabs-wrapper{
        background-color: #CCC;
        padding: 8px;
        border-radius: 5px;
        color: #555;
    }

    .tab-content{
        background-color: #FFF;
        padding: 15px;
        border-radius: 2px;
        color: #555;
        margin-right: 20px;
        width: 80%;
    }

    #sell-steps .nav-tabs-wrapper{
        background-color: #FFF
    }

    #sell-steps .vue-tabs .nav-pills > li.active > a{
        color: #ed8323;
        background-color: #FFF !important;
        display: none;
    }

   #sell-steps .vue-tabs .nav-pills > li > a{
       display: none;
   }
    
    #sell-steps .vue-tabs .nav-pills > li > span{
        cursor: pointer;
        background-color: #ed8323;
        padding:7px;
        color: #000;
    }

   #sell-steps .vue-tabs .nav-pills > li.active > span{
       color: #FFF !important;
   }

   #sell-steps .vue-tabs .nav-pills > li > span:after{
       content: '';
       display: block;
       position: absolute;
       top: 5px;
       left: -16px;
       z-index: 99999;
       width: 30px;
       height: 30px;
       border-left: 2px solid #FFF;
       border-top: 2px solid #FFF;
       background-color: #ed8323;
       -moz-transform:rotate(-45deg);
       -webkit-transform:rotate(-45deg);
   }

    .product-selected-title{
        font-size: 15px;
        background: #CCC;
        padding: 15px;
        border: 1px solid #afadad;
        border-radius: 2px;
    }

   .radio input[type=radio]{
       margin-right: -33px;
   }

    .row label{
        color:#000;;
    }

   .btn-file {
       position: relative;
       overflow: hidden;
   }
   .btn-file input[type=file] {
       position: absolute;
       top: 0;
       right: 0;
       min-width: 100%;
       min-height: 100%;
       filter: alpha(opacity=0);
       opacity: 0;
       outline: none;
       background: white;
       cursor: inherit;
       display: block;
   }

    .image-upload-thumbnail img, .review-box img{
        width: 40%;
        height: 40%;
    }

   .image-upload-thumbnail input[type="text"]{
       background-color: #337ab7;
       color: #FFF
   }

   .image-upload-thumbnail ::-webkit-input-placeholder {
       color: #FFF;
   }

   .image-upload-thumbnail ::-moz-placeholder {
       color: #FFF;
   }

   .image-upload-thumbnail :-ms-input-placeholder {
       color: #FFF;
   }

   .image-upload-thumbnail :-moz-placeholder {
       color: #FFF;
   }

    .review-box{
        background-color: #EEE;
        border-radius: 2px;
        border: 1px solid #CCC;
        margin-bottom: 50px;
    }
</style>
