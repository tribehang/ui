<template>
  <div class="container">
      <div class="row">
          <h4>
              <i class="fa fa-bar-chart" aria-hidden="true"> کنترل پنل</i>
          </h4>

          <div class="tab">
              <button id="my-profile-tab-btn" v-translate class="tablinks active" v-on:click="openCity('tab-update-profile', $event)">UPDATE_PROFILE_INFORMATION</button>
              <button id="sell-new-item-tab-btn" v-translate class="tablinks" v-on:click="openCity('tab-sell-new-item', $event)">SELL_NEW_ITEM</button>
              <button id="my-addresses-tab-btn" v-translate class="tablinks" v-on:click="openCity('tab-my-addresses', $event)">MY_ADDRESSES</button>
              <button id="items-tab-btn" v-translate class="tablinks" v-on:click="openCity('tab-view-sold-items', $event)">VIEW_SOLD_ITEMS</button>
          </div>

          <div id="tab-update-profile" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading">ویرایش اطلاعات پروفایل</div>
                  <div class="panel-body">
                      <div class="form-group">
                          <div class="row">
                              <div class="col-sm-2 bold" v-translate>NAME</div>
                              <div class="col-sm-6">{{ user.firstName }}</div>
                          </div>

                          <div class="row">
                              <div class="col-sm-2 bold" v-translate>FAMILY_NAME</div>
                              <div class="col-sm-6">{{ user.lastName }}</div>
                          </div>

                          <div class="row">
                              <div class="col-sm-2 bold" v-translate>EMAIL_ADDRESS</div>
                              <div class="col-sm-6">{{ user.email }}</div>
                          </div>

                          <div class="row">
                              <div class="col-sm-2 bold" v-translate>DATE_OF_BIRTH</div>
                              <div class="col-sm-6">{{ user.dateOfBirth }}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div id="tab-sell-new-item" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading">فروش کالای جدید</div>
                  <div class="panel-body">
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
                  </div>
              </div>
          </div>

          <div id="tab-my-addresses" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading">آدرسهای من</div>
                  <div class="panel-body">
                      <div v-if="user.addresses">
                          <div v-for="address in user.addresses.data">
                              <p>
                                  <i class="fa fa-address-card-o" aria-hidden="true"></i>
                                  {{ address.state }}, {{ address.city }}, {{ address.address }}, <span v-translate>POSTAL_CODE</span> {{ address.postcode }} , (<span v-translate>CONTACT_NUMBER</span> : {{ address.phoneNumber }} )
                              </p>
                          </div>
                      </div>

                      <br>

                      <button v-if="toShowAddAddressForm === false" type="button" class="btn btn-info" v-on:click="showAddAddressForm">
                          <span class="glyphicon glyphicon-plus"></span>
                          <span v-translate>ADD_NEW_ADDRESS</span>
                      </button>

                      <div class="container" v-if="toShowAddAddressForm === true">
                          <hr>
                          <h4 v-translate>NEW_ADDRESS_INFORMATION</h4>
                          <form class="form-horizontal" action="/action_page.php">
                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="state" v-translate>STATE</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <select class="form-control">
                                              <option value="تهران">تهران</option>
                                          </select>
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="city" v-translate>CITY</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <select class="form-control">
                                              <option value="تهران">تهران</option>
                                          </select>
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="contact_number" v-translate>CONTACT_NUMBER</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input type="text" class="form-control" id="contact_number" name="contact_number">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="postal_code" v-translate>POSTAL_CODE</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input type="text" class="form-control" id="postal_code" name="postal_code">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="full_address" v-translate>FULL_ADDRESS</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-12">
                                          <input type="text" class="form-control" id="full_address" name="full_address">
                                      </label>
                                  </div>
                              </div>

                              <br>

                              <button type="button" class="btn btn-success" >
                                  <span v-translate>REGISTER_NEW_ADDRESS</span>
                              </button>

                              <button type="button" class="btn btn-warning" v-on:click="cancelAddNewAddressForm">
                                  <span v-translate>CANCEL</span>
                              </button>

                          </form>
                      </div>
                  </div>
              </div>
          </div>

          <div id="tab-view-sold-items" class="tabcontent">
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

                                      <div v-if="sale.saleStatus === 'PRICE_ESTIMATED'">
                                          <a :href="getSaleAppointmentLink(sale.id)" v-translate class="btn btn-success" style="float: right;">APPOINTMENT_DETAILS</a>
                                      </div>
                                  </div>
                              </div>

                              <div class="suggestedPriceContainer" v-if="sale.saleStatus === 'PRICE_ESTIMATED'">
                                  <h4 v-translate>ESTIMATED_PRICE</h4>

                                  <div class="container">
                                      <span class="bold" v-translate>MINIMUM_PRICE</span> : <span> {{sale.minimumSuggestedPrice}}</span>
                                  </div>

                                  <div class="container">
                                      <span class="bold" v-translate>MAXIMUM_PRICE</span> : <span> {{sale.maximumSuggestedPrice}}</span>
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
        conditions: sale.data().availableConditions,
        toShowAddAddressForm: false
      }
    },
    components: {
      VueTabs,
      VTab,
      VueBase64FileUpload
    },
    methods: {
      cancelAddNewAddressForm () {
        this.toShowAddAddressForm = false
      },
      showAddAddressForm () {
        this.toShowAddAddressForm = true
      },
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
      },
      checkUrlHash () {
        jQuery('#' + this.$route.hash.substr(1) + '-tab-btn').trigger('click')
      },
      checkMainTabs () {
        jQuery('.tabcontent').hide()
        jQuery('.tabcontent')[0].style.display = 'block'
      },
      openCity (cityName, event) {
        var i, tabcontent

        tabcontent = jQuery('.tabcontent')
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = 'none'
        }

        jQuery('.tablinks').removeClass('active')
        document.getElementById(cityName).style.display = 'block'
        event.currentTarget.className += ' active'
      }
    },
    beforeMount () {
      this.getUser()
      this.getCategories()
    },
    mounted () {
      this.checkMainTabs()
      this.checkUrlHash()
    }
  }
</script>

<style>
   .dl-horizontal dt{
       text-align: right;
       margin-bottom: 10px;
   }

   .vue-tabs .nav-pills > li > a{
       color: #de6a01;
       padding: 5px 20px;
       float: right;
       margin-bottom:5px;
   }

   .vue-tabs .nav-pills > li.active > a{
       color: #de6a01;
       background-color: #a7a7a7 !important;
   }

   .vue-tabs .nav-pills > li > a:hover{
       color: #de6a01;
       background-color: #CCC !important;
   }

    .nav-tabs-wrapper{
        background-color: #cecccc8a;
        padding: 8px;
        border-radius: 5px;
        color: #555;
    }

    .tab-content{
        border-radius: 2px;
        color: #555;
        margin-right: 20px;
        width: 80%;
    }

    .panel{
        margin-bottom:0;
    }

    #sell-steps .nav-tabs-wrapper{
        background-color: #FFF
    }

    #sell-steps .vue-tabs .nav-pills > li.active > a{
        color: #de6a01;
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

   .suggestedPriceContainer {
       background-color: #ffffff;
       margin-bottom: 20px;
       margin-top:10px;
       padding: 30px;
       box-shadow: 2px 2px 6px #CCC;
       padding-top: 10px;
   }

   div.tab {
       float: right;
       width: 20%;
       padding: 8px;
       border-radius: 5px;
       color: #555;
   }

   div.tab button {
       display: block;
       background-color: inherit;
       padding: 10px 16px;
       width: 100%;
       border: none;
       outline: none;
       text-align: right;
       cursor: pointer;
       transition: 0.3s;
       color: #de6a01;
   }

   div.tab button:hover {
       background-color: #F1F1F1;
   }

   div.tab button.active {
       color: #FFF;
       background-color: #a7a7a7;
       border-radius: 3px;
   }

   .tabcontent {
       float: left;
       width: 78%;
       border-left: none;
   }
</style>
