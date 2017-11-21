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

              <v-tab title="آدرسهای من">
                  <div class="container" v-if="user.addresses">
                      <div v-for="address in user.addresses.data">
                          <p>
                              <i class="fa fa-address-card-o" aria-hidden="true"></i>
                              {{ address.state }}, {{ address.city }}, {{ address.address }}, <span v-translate>POSTAL_CODE</span> {{ address.postcode }} , (<span v-translate>CONTACT_NUMBER</span> : {{ address.phoneNumber }} )
                          </p>
                      </div>
                  </div>
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
                                          <select v-model="selectedCategory" class="form-control" v-on:change="changeSubCategories">
                                              <option disabled value="">لطفا دسته بندی کالای خود  را انتخاب کنید</option>
                                              <option v-for="category in categories" :value="category">{{ category.name }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">دسته بندی کالا چیست</div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select v-model="selectedSubCategory" class="form-control">
                                              <option disabled value="">لطفا زیرمجموعه کالای  خود را انتخاب کنید</option>
                                              <option v-for="subCategory in subCategories" :value="subCategory">{{ subCategory.name }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">زیرمجموعه کالا چیست</div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select v-model="selectedYearIndex" class="form-control">
                                              <option disabled value="">لطفا سال تولید کالای خود را انتخاب کنید</option>
                                              <option v-for="(creationYear, index) in creationYears" :value="index">{{ creationYear.title }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">سال تولید کالا چیست</div>
                              </div>
                              <div class="row">
                                  <div class="col-md-6">
                                      <div class="form-group">
                                          <select v-model="selectedConditionIndex" class="form-control">
                                              <option disabled value="">لطفا وضعیت کنونی کالای خود را انتخاب کنید</option>
                                              <option v-for="(condition, index) in conditions" :value="index">{{ condition.title }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-md-6">وضعیت کنونی کالا چیست</div>
                              </div>
                              <div class="row">
                                  <button style="float: left;" type="button" class="btn btn-info" v-on:click="showStepTwo">مرحله بعد</button>
                              </div>

                              <div class="row">
                                  <br>
                                  <p class="bg-danger">{{ stepOneError }}</p>
                              </div>
                          </v-tab>

                          <v-tab title="۲. اطلاعات تکمیلی">
                              <h4 class="product-selected-title">کالای انتخابی شما: {{ getProductName() }}</h4>
                              <br>

                              <ul class="category-attributes">
                                  <li v-for="(attribute, index) in attributes" >
                                      <div v-if="attribute.type === 'boolean'">
                                          <div class="form-group">
                                              <label style="line-height: 36px;">{{ attribute.name }} :</label>
                                              <label class="radio-inline control-label radio">
                                                  <input type='radio' :name="attribute.id" value="1" v-model="selectedAttributes[index].value"> بلی
                                              </label>

                                              <label class="radio-inline control-label radio">
                                                  <input type='radio' :name="attribute.id" value="0" v-model="selectedAttributes[index].value">خیر
                                              </label>
                                          </div>
                                      </div>

                                      <div v-if="attribute.type === 'select'">
                                          <div class="form-group">
                                              <select class="form-control" v-model="selectedAttributes[index].value" v-on:change="handleAttributeChange">
                                                  <option disabled selected>{{ attribute.name }}</option>
                                                  <option v-for="option in attribute.options.data" :data-attributeIndex="index" :value="option.value">{{ option.name }}</option>
                                              </select>
                                          </div>
                                      </div>

                                      <div v-if="attribute.type === 'integer'">
                                          <div class="form-group">
                                              {{attribute.name}} <input v-model="selectedAttributes[index].value" type="number" name="quantity" min="0">
                                          </div>
                                      </div>

                                      <div v-if="attribute.type === 'string'">
                                          <div class="form-group">
                                              <input  v-model="selectedAttributes[index].value" type="text" class="form-control" :placeholder="attribute.name">
                                          </div>
                                      </div>

                                      <div v-if="attribute.type === 'text'">
                                          <div class="form-group">
                                              <textarea v-model="selectedAttributes[index].value" class="form-control" rows="3" :placeholder="attribute.name"></textarea>
                                          </div>
                                      </div>
                                  </li>
                              </ul>

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
                                      <button type="button" class="btn btn-info" v-on:click="showStepOne">مرحله قبل</button>
                                      <button type="button" class="btn btn-info" v-on:click="showStepThree">مرحله بعد</button>
                                  </div>
                              </div>

                              <div class="row">
                                  <br>
                                  <p class="bg-danger">{{ stepTwoError }}</p>
                              </div>
                          </v-tab>

                          <v-tab title="۳. ثبت کالا">
                              <h4>اطلاعات اصلی</h4>

                              <div class="row review-box">
                                  <div class="col-md-12">
                                      <div class="col-md-6">
                                           <span>دسته</span> : <i>{{ selectedCategory.name }}</i>
                                      </div>
                                      <div class="col-md-6">
                                          <span>زیرمجموعه</span> : <i>{{ selectedSubCategory.name }}</i>
                                      </div>
                                  </div>

                                  <div class="col-md-12">
                                      <div class="col-md-6" v-if="creationYears[selectedYearIndex]">
                                          <span>سال تولید</span> : <i>{{ creationYears[selectedYearIndex].title}}</i>
                                      </div>
                                      <div class="col-md-6" v-if="conditions[selectedConditionIndex]">
                                          <span>وضعیت کنونی</span> : <i>{{ conditions[selectedConditionIndex].title}}</i>
                                      </div>
                                  </div>

                              </div>

                              <h4>اطلاعات تکمیلی</h4>
                              <div class="row review-box">
                                  <ul class="category-attributes">
                                      <li v-for="(selectedAttribute, index) in selectedAttributes" >
                                          <div class="col-md-12" v-if="selectedAttribute.type === 'select'">
                                              <span>{{ selectedAttribute.name }}</span> : <i>{{ selectedAttribute.label }}</i>
                                          </div>

                                          <div class="col-md-12" v-else>
                                              <span>{{ selectedAttribute.name }}</span> : <i>{{ selectedAttribute.value }}</i>
                                          </div>
                                      </li>
                                  </ul>
                              </div>

                              <h4>عکس های محصول</h4>
                              <div class="row review-box">
                                  <img :src="imageUploadBase64">
                              </div>

                              <div class="row">
                                  <div class="col-md-12" style="text-align: left;">
                                      <button type="button" class="btn btn-info" v-on:click="showStepTwoLast">مرحله قبل</button>
                                      <button type="button" class="btn btn-warning" v-on:click="addSale">تائید</button>
                                  </div>
                              </div>
                          </v-tab>
                      </vue-tabs>
                  </div>
              </v-tab>

              <v-tab title="مشاهده کالای ثبت شده" icon="ti-check">
                  <div class="container">
                      <div v-for="items in user.sales">
                          <div class="panel panel-default" v-for="sale in items" >
                              <div class="panel-heading">
                                  <h4 class="panel-title">
                                      {{ sale.category.data.parentName }} {{ sale.category.data.name }}
                                  </h4>
                              </div>
                              <div class="panel-body my-sales">
                                  <div class="row">
                                      <div class="col-sm-3">
                                          <img :src="getSaleImageLink(sale.id, sale.images.data[0].id)" alt="imageThumbnail" class="img-thumbnail">
                                      </div>
                                      <div class="col-sm-3">
                                          <i class="fa fa-question-circle-o"></i>
                                          <strong  v-translate>STATUS</strong>:
                                          <span :class="sale.saleStatus" style="pointer-events: none" v-translate>SL_{{sale.saleStatus}}</span>
                                      </div>
                                      <div class="col-sm-6">
                                          <i class="fa fa-calendar"></i>
                                          <strong  v-translate>SALE_CREATION_DATETIME</strong>:
                                          <span>{{ sale.createdAt }}</span>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-3">
                                      </div>
                                      <div class="col-sm-3">
                                          <i class="fa fa-clock-o"></i>
                                          <strong  v-translate>SALE_USAGE_IN_MONTHS</strong>:
                                          <span>{{sale.usageInMonths}} <span v-translate>MONTH</span></span>
                                      </div>
                                      <div class="col-sm-6">
                                          <i class="fa fa-file-text-o"></i>
                                          <strong  v-translate>CUSTOMER_NOTE</strong>:
                                          <span> --- </span>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-3">
                                      </div>
                                      <div class="col-sm-3">
                                          <i class="fa fa-gg"></i>
                                          <strong  v-translate>SALE_INITIAL_PRICE</strong>:
                                          <span> --- </span>
                                      </div>
                                      <div class="col-sm-6">
                                          <i class="fa fa-pencil"></i>
                                          <strong  v-translate>SEMSARI_NOTE</strong>:
                                          <span> --- </span>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-3">
                                      </div>
                                      <div class="col-sm-3">
                                          <i class="fa fa-gg-circle"></i>
                                          <strong  v-translate>SALE_FINAL_PRICE</strong>:
                                          <span> --- </span>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-sm-3">
                                          <div v-if="sale.saleStatus === 'created'">
                                              <a :href="getSaleAppointmentLink(sale.id)" v-translate class="btn btn-info" style="float: right;">SET_APPOINTMENT</a>
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </div>
                      </div>
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

  import user from '../auth/user'
  import sale from '../services/sale'

  export default {
    data () {
      return {
        user: '',
        stepOneError: '',
        stepTwoError: '',
        customImageMaxSize: 2,
        imageUploadBase64: '',
        categories: '',
        subCategories: '',
        attributes: '',
        selectedCategory: '',
        selectedSubCategory: '',
        selectedYearIndex: '',
        selectedConditionIndex: '',
        selectedAttributes: '',
        creationYears: sale.data().availableCreationYears,
        conditions: sale.data().availableConditions
      }
    },
    components: {
      VueTabs,
      VTab,
      VueBase64FileUpload
    },
    methods: {
      getSaleAppointmentLink (saleId) {
        return 'sale/' + saleId + '/appointment'
      },
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
      getCategories () {
        sale.getCategories(this)
      },
      changeSubCategories () {
        sale.getSubCategories(this, this.selectedCategory.id)
      },
      getProductName () {
        var year = this.creationYears[this.selectedYearIndex] ? this.creationYears[this.selectedYearIndex].title : ''
        var condition = this.conditions[this.selectedConditionIndex] ? this.conditions[this.selectedConditionIndex].title : ''
        return this.selectedCategory.name + ' ' + this.selectedSubCategory.name + ' ' + year + ' ' + condition
      },
      showStepOne () {
        $('#sell-steps .nav-pills li:nth-child(1)').click()
      },
      showStepTwo () {
        if (this.isStepOneFinished()) {
          this.stepOneError = ''
          $('#sell-steps .nav-pills li:nth-child(2)').click()
          sale.getCategoryAttributes(this, this.selectedCategory.id)
        } else {
          this.stepOneError = 'لطفا مرحله انتخاب نوع  کالا را کامل کنید'
        }
      },
      showStepTwoLast () {
        $('#sell-steps .nav-pills li:nth-child(2)').click()
      },
      showStepThree () {
        if (this.isStepTwoFinished()) {
          this.stepTwoError = ''
          $('#sell-steps .nav-pills li:nth-child(3)').click()
        } else {
          this.stepTwoError = 'لطفا اطلاعات تکمیلی را وارد کنید'
        }
      },
      isStepOneFinished () {
        return (this.selectedCategory !== '' && this.selectedSubCategory !== '' && this.selectedYearIndex !== '' && this.selectedConditionIndex !== '')
      },
      isStepTwoFinished () {
        var isFinished = true
        $.each(this.selectedAttributes, function (index, attribute) {
          if (attribute.value.length === 0) {
            isFinished = false
          }
        })

        if (this.imageUploadBase64 === '') {
          isFinished = false
        }

        return isFinished
      },
      addSale () {
        sale.addItem(this)
      },
      getSaleImageLink ($saleId, $saleImageId) {
        return sale.getSaleImageLink($saleId, $saleImageId)
      },
      clickOneMySales () {
        $('.left-vertical-tabs ul li:nth-child(3)').click()
      },
      handleAttributeChange (e) {
        var label = e.target[e.target.options.selectedIndex].label
        var attributeIndex = e.target.options[e.target.options.selectedIndex].dataset.attributeindex
        this.selectedAttributes[attributeIndex].label = label
      }
    },
    beforeMount () {
      this.getUser()
      this.getCategories()
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

   #sell-steps .vue-tabs .nav-pills > li {
       pointer-events: none;
       cursor: default;
   }

   #sell-steps .vue-tabs .nav-pills > li > a{
       display: none;
   }
    
    #sell-steps .vue-tabs .nav-pills > li > span{
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

    .category-attributes{
        list-style: none;
        padding: 0;
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
        -webkit-column-gap: 60px;
        -moz-column-gap: 60px;
        column-gap: 60px;
        -webkit-column-rule: 1px solid #CCCBCB;
        -moz-column-rule: 1px solid #CCCBCB;
        column-rule: 1px solid #CCCBCB;
    }

   .category-attributes .form-group{
        margin-bottom: 50px;
    }

   .vue-tabs a {
       color: #FFF
   }
</style>
