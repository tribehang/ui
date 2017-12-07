<template>
  <div class="container">
      <div class="row">
          <h4>
              <i class="fa fa-bar-chart" aria-hidden="true" v-translate>CONTROL_PANEL</i>
          </h4>

          <div class="tab">
              <button id="my-profile-tab-btn" v-translate class="tablinks active" v-on:click="openTab('my-profile', 'tab-update-profile', $event)">UPDATE_PROFILE_INFORMATION</button>
              <button id="sell-new-item-tab-btn" v-translate class="tablinks" v-on:click="openTab('sell-new-item', 'tab-sell-new-item', $event)">SELL_NEW_ITEM</button>
              <button id="my-addresses-tab-btn" v-translate class="tablinks" v-on:click="openTab('my-addresses', 'tab-my-addresses', $event)">MY_ADDRESSES</button>
              <button id="my-bank-account-tab-btn" v-translate class="tablinks" v-on:click="openTab('my-bank-account', 'tab-my-bank-account', $event)">MY_BANK_ACCOUNT</button>
              <button id="items-tab-btn" v-translate class="tablinks" v-on:click="openTab('items', 'tab-view-sold-items', $event)">VIEW_SOLD_ITEMS</button>
          </div>

          <div id="tab-update-profile" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading" v-translate>UPDATE_PROFILE</div>
                  <div class="panel-body">
                      <form>
                          <div class="row">
                              <div class="col-sm-6">
                                  <div class="form-group">
                                      <label for="name" v-translate>NAME</label>
                                      <input v-model="userFirstName" type="text" class="form-control" id="name">
                                  </div>
                              </div>

                              <div class="col-sm-6">
                                  <div class="form-group">
                                      <label for="family_name" v-translate>FAMILY_NAME</label>
                                      <input v-model="userLastName" type="text" class="form-control" id="family_name">
                                  </div>
                              </div>
                          </div>

                          <div class="row">
                              <div class="col-sm-6">
                                  <div class="form-group">
                                      <label for="email_address" v-translate>EMAIL_ADDRESS</label>
                                      <input v-model="userEmail" type="text" class="form-control" id="email_address">
                                  </div>
                              </div>

                              <div class="col-sm-6">
                                  <div class="form-group">
                                      <label v-translate>DATE_OF_BIRTH</label>
                                      <pdatepicker
                                        id="date_of_birth"
                                        class="form-control"
                                        headerBackgroundColor="orange"
                                        :showTodayButton="false"
                                        :showAllMonthsNavigation="true"
                                        :minimumYear="1320"
                                        :showDaysName="false"
                                        :placeholder="transformGregorianDate(userDateOfBirth)">
                                      </pdatepicker>
                                  </div>
                              </div>
                          </div>

                          <button v-on:click="updateUser" type="button" class="btn btn-success" v-translate>CONFIRM</button>
                      </form>
                  </div>
              </div>
          </div>

          <div id="tab-sell-new-item" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading" v-translate>SELL_NEW_ITEM</div>
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
                                                  <option disabled value="" v-translate>PLEASE_CHOOSE_CATEGORY</option>
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
                                                  <option disabled value="" v-translate>PLEASE_CHOOSE_SUB_CATEGORY</option>
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
                                                  <option disabled value="" v-translate>PLEASE_CHOOSE_CREATE_YEAR</option>
                                                  <option v-for="(creationYear, index) in creationYears" :value="index">{{ creationYear.title }}</option>
                                              </select>
                                          </div>
                                      </div>
                                      <div class="col-md-6">سال تولید کالا چیست</div>
                                  </div>

                                  <div class="row">
                                      <div class="col-md-3">
                                          <div class="form-group">
                                              <select v-model="selectedUsageYear" class="form-control">
                                                  <option value="" disabled selected v-translate>YEAR</option>
                                                  <option value="0">۰ <span v-translate>YEAR</span></option>
                                                  <option value="1">۱ <span v-translate>YEAR</span></option>
                                                  <option value="2">۲ <span v-translate>YEAR</span></option>
                                                  <option value="3">۳ <span v-translate>YEAR</span></option>
                                                  <option value="4">۴ <span v-translate>YEAR</span></option>
                                                  <option value="5">۵ <span v-translate>YEAR</span></option>
                                                  <option value="6">۶ <span v-translate>YEAR</span></option>
                                                  <option value="7">۷ <span v-translate>YEAR</span></option>
                                                  <option value="8">۸ <span v-translate>YEAR</span></option>
                                                  <option value="9">۹ <span v-translate>YEAR</span></option>
                                                  <option value="10">۱۰ <span v-translate>YEAR</span></option>
                                              </select>
                                          </div>
                                      </div>
                                      <div class="col-md-3">
                                          <div class="form-group">
                                              <select v-model="selectedUsageMonth" class="form-control">
                                                  <option value="" disabled selected v-translate>MONTH</option>
                                                  <option value="0">۰ <span v-translate>MONTH</span></option>
                                                  <option value="1">۱ <span v-translate>MONTH</span></option>
                                                  <option value="2">۲ <span v-translate>MONTH</span></option>
                                                  <option value="3">۳ <span v-translate>MONTH</span></option>
                                                  <option value="4">۴ <span v-translate>MONTH</span></option>
                                                  <option value="5">۵ <span v-translate>MONTH</span></option>
                                                  <option value="6">۶ <span v-translate>MONTH</span></option>
                                                  <option value="7">۷ <span v-translate>MONTH</span></option>
                                                  <option value="8">۸ <span v-translate>MONTH</span></option>
                                                  <option value="9">۹ <span v-translate>MONTH</span></option>
                                                  <option value="10">۱۰ <span v-translate>MONTH</span></option>
                                                  <option value="11">۱۱ <span v-translate>MONTH</span></option>
                                                  <option value="12">۱۲ <span v-translate>MONTH</span></option>
                                              </select>
                                          </div>
                                      </div>
                                      <div class="col-md-6" v-translate>PLEASE_CHOOSE_USAGE</div>
                                  </div>

                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <select v-model="selectedConditionIndex" class="form-control">
                                                  <option disabled value="" v-translate="">PLEASE_CHOOSE_CONDITION</option>
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
                                      <p v-if="stepOneError !== ''" class="alert alert-danger">{{ stepOneError }}</p>
                                  </div>
                              </v-tab>

                              <v-tab title="۲. اطلاعات تکمیلی">
                                  <h4 class="product-selected-title">کالای انتخابی شما: {{ getProductName() }}</h4>
                                  <br>

                                  <ul class="category-attributes">
                                      <li v-for="(attribute, index) in attributes" v-bind:class="[attribute.problematic ? 'alert alert-warning' : 'well']">
                                          <div v-if="attribute.type === 'boolean'">
                                              <div class="form-group">
                                                  <label>{{ attribute.name }} :</label>
                                                  <label class="radio-inline control-label radio">
                                                      <input type='radio' :name="attribute.id" value="1" v-model="selectedAttributes[index].value"> بلی
                                                  </label>

                                                  <label class="radio-inline control-label radio">
                                                      <input type='radio' :name="attribute.id" value="0" v-model="selectedAttributes[index].value">خیر
                                                  </label>
                                              </div>
                                          </div>

                                          <div v-if="attribute.type === 'select'">
                                              <label>{{ attribute.name }} :</label>
                                              <div class="form-group">
                                                  <select class="form-control" v-model="selectedAttributes[index].value" v-on:change="handleAttributeChange">
                                                      <option v-for="option in attribute.options.data" :data-attributeIndex="index" :value="option.value">{{ option.name }}</option>
                                                  </select>
                                              </div>
                                          </div>

                                          <div v-if="attribute.type === 'integer'">
                                              <div class="form-group">
                                                  <label>{{ attribute.name }} :</label>
                                                  <label class="control-label">
                                                      <input v-model="selectedAttributes[index].value" type="number" name="quantity" min="0">
                                                  </label>
                                              </div>
                                          </div>

                                          <div v-if="attribute.type === 'string'">
                                              <div class="form-group">
                                                  <label>{{ attribute.name }} :</label>
                                                  <input  v-model="selectedAttributes[index].value" type="text" class="form-control">
                                              </div>
                                          </div>

                                          <div v-if="attribute.type === 'text'">
                                              <label>{{ attribute.name }} :</label>
                                              <div class="form-group">
                                                  <textarea v-model="selectedAttributes[index].value" class="form-control" rows="3"></textarea>
                                              </div>
                                          </div>
                                      </li>
                                  </ul>


                                  <div class="row" v-if="saleUploads !== ''">
                                      <h4 v-translate>PRODUCT_IMAGES</h4>
                                      <div v-for="saleUpload in saleUploads" class="col-md-6">
                                          <br>
                                          <div class="form-group">

                                              <vue-base64-file-upload
                                                      class="image-upload-thumbnail"
                                                      accept="image/jpg,image/jpeg"
                                                      image-class="v1-image"
                                                      :placeholder="saleUpload.name"
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
                                          <button type="button" class="btn btn-info" v-on:click="showStepOne" v-translate>PREVIOUS_STEP</button>
                                          <button type="button" class="btn btn-info" v-on:click="showStepThree" v-translate>NEXT_STEP</button>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <br>
                                      <p v-if="stepTwoError !== ''" class="alert alert-danger">{{ stepTwoError }}</p>
                                  </div>
                              </v-tab>

                              <v-tab title="۳. ثبت کالا">

                                  <div class="panel panel-info">
                                      <div class="panel-heading" v-translate>MAIN_INFORMATION</div>
                                      <div class="panel-body">
                                          <div class="row">
                                              <table class="table table-hover">
                                                  <tbody>
                                                  <tr>
                                                      <th class="col-md-4" v-translate>CATEGORY</th>
                                                      <td>{{ selectedCategory.name }}</td>
                                                  </tr>
                                                  <tr>
                                                      <th class="col-md-4" v-translate>SUB_CATEGORY</th>
                                                      <td>{{ selectedSubCategory.name }}</td>
                                                  </tr>
                                                  <tr v-if="creationYears[selectedYearIndex]">
                                                      <th class="col-md-4" v-translate>CREATE_YEAR</th>
                                                      <td>{{ creationYears[selectedYearIndex].title}}</td>
                                                  </tr>
                                                  <tr v-if="conditions[selectedConditionIndex]">
                                                      <th class="col-md-4" v-translate>CURRENT_CONDITION</th>
                                                      <td>{{ conditions[selectedConditionIndex].title}}</td>
                                                  </tr>
                                                  <tr>
                                                      <th class="col-md-4" v-translate>SALE_USAGE_IN_MONTHS</th>
                                                      <td>{{ selectedUsageYear}} <span v-translate>YEAR</span> {{ selectedUsageMonth}} <span v-translate>MONTH</span></td>
                                                  </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>


                                  <div class="panel panel-info">
                                      <div class="panel-heading" v-translate>FURTHER_INFORMATION</div>
                                      <div class="panel-body">
                                          <div class="row">
                                              <table class="table table-hover">
                                                  <tbody>
                                                  <tr v-for="(selectedAttribute, index) in selectedAttributes" >
                                                      <th class="col-md-4">{{ selectedAttribute.name }}</th>
                                                      <td v-if="selectedAttribute.type === 'select'">{{selectedAttribute.label}}</td>
                                                      <td v-else-if="selectedAttribute.type === 'boolean'"><span v-if="selectedAttribute.value === '1'" v-translate>YES</span> <span v-if="selectedAttribute.value === '0'" v-translate>NO</span></td>
                                                      <td v-else>{{selectedAttribute.value}}</td>
                                                  </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>


                                  <div class="panel panel-info">
                                      <div class="panel-heading" v-translate>PRODUCT_IMAGES</div>
                                      <div class="panel-body">
                                          <div class="row">
                                              <div v-for="base64 in imageUploadBase64" style="display: inline-block; margin: 15px;">
                                                  <img height="150" :src="base64">
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-md-12" style="text-align: left;">
                                          <button type="button" class="btn btn-info" v-on:click="showStepTwoLast" v-translate>PREVIOUS_STEP</button>
                                          <button type="button" class="btn btn-warning" v-on:click="addSale" v-translate>SUBMIT</button>
                                      </div>
                                  </div>

                                  <br>
                              </v-tab>
                          </vue-tabs>
                      </div>
                  </div>
              </div>
          </div>

          <div id="tab-my-addresses" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading" v-translate>MY_ADDRESSES</div>
                  <div class="panel-body">
                      <div v-if="user.addresses">
                          <div v-for="address in user.addresses.data">
                              <p>
                                  <i class="fa fa-address-card-o" aria-hidden="true"></i>
                                  {{ address.state }}, {{ address.city }}, {{ address.address }}, <span v-translate>POSTAL_CODE</span> {{ address.postcode }} , (<span v-translate>CONTACT_NUMBER</span> : {{ address.phoneNumber }} )

                                  <button type="button" class="btn btn-danger" v-on:click="deleteAddress(address.id)">
                                      <span v-translate>DELETE</span>
                                  </button>
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
                          <form class="form-horizontal">
                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="state" v-translate>STATE</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <select class="form-control" v-model="addressState">
                                              <option value="تهران">تهران</option>
                                          </select>
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="city" v-translate>CITY</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <select class="form-control" v-model="addressCity">
                                              <option value="تهران">تهران</option>
                                          </select>
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="contact_number" v-translate>CONTACT_NUMBER</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="addressPhoneNumber" type="text" class="form-control" id="contact_number" name="contact_number">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="postal_code" v-translate>POSTAL_CODE</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="addressPostcode" type="text" class="form-control" id="postal_code" name="postal_code">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="full_address" v-translate>FULL_ADDRESS</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-12">
                                          <input v-model="addressAddress" type="text" class="form-control" id="full_address" name="full_address">
                                      </label>
                                  </div>
                              </div>

                              <br>

                              <button type="button" class="btn btn-success" v-on:click="createAddress">
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

          <div id="tab-my-bank-account" class="tabcontent">
              <div class="panel panel-default">
                  <div class="panel-heading" v-translate>MY_BANK_ACCOUNT</div>
                  <div class="panel-body">
                      <div v-if="user.bankAccounts">
                          <div v-for="bankAccount in user.bankAccounts.data">
                              <form class="form-horizontal">

                                  <div class="row">
                                      <div class="col-sm-2">
                                          <label class="bold" v-translate>FULL_NAME</label>
                                      </div>
                                      <div class="col-sm-4">
                                          {{bankAccount.fullName}}
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-2">
                                          <label class="bold" v-translate>BANK_NAME</label>
                                      </div>
                                      <div class="col-sm-4">
                                          {{bankAccount.bankName}}
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-2">
                                          <label class="bold" v-translate>BANK_ACCOUNT_NUMBER</label>
                                      </div>
                                      <div class="col-sm-4">
                                          {{bankAccount.bankAccount}}
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-2">
                                          <label class="bold" v-translate>BANK_ACCOUNT_CARD_NUMBER</label>
                                      </div>
                                      <div class="col-sm-4">
                                          {{bankAccount.bankCard}}
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-2">
                                          <label class="bold" v-translate>BANK_ACCOUNT_SHABA</label>
                                      </div>
                                      <div class="col-sm-4">
                                          {{bankAccount.shabaNumber}}
                                      </div>
                                  </div>

                                  <br>

                                  <button type="button" class="btn btn-danger" v-on:click="deleteBankAccount(bankAccount.id)">
                                      <span v-translate>DELETE_BANK_ACCOUNT</span>
                                  </button>

                              </form>
                          </div>
                      </div>

                      <div class="container" v-if="toShowAddBankAccountForm()">
                          <h4 v-translate>BANK_ACCOUNT_INFORMATION</h4>
                          <form class="form-horizontal">

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="bank_account_fullname" v-translate>FULL_NAME</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="bankAccountFullName" type="text" class="form-control" id="bank_account_fullname" name="bank_account_fullname">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="bank_account_bank_name" v-translate>BANK_NAME</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="bankAccountBankName" type="text" class="form-control" id="bank_account_bank_name" name="bank_account_bank_name">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="bank_account_number" v-translate>BANK_ACCOUNT_NUMBER</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="bankAccountNumber" type="text" class="form-control" id="bank_account_number" name="bank_account_number">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="bank_account_card_number" v-translate>BANK_ACCOUNT_CARD_NUMBER</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="bankAccountCardNumber" type="text" class="form-control" id="bank_account_card_number" name="bank_account_card_number">
                                      </label>
                                  </div>
                              </div>

                              <div class="form-group">
                                  <label class="control-label col-sm-2 bold" for="bank_account_shaba" v-translate>BANK_ACCOUNT_SHABA</label>
                                  <div class="col-sm-10">
                                      <label class="col-md-4">
                                          <input v-model="bankAccountShaba" type="text" class="form-control" id="bank_account_shaba" name="bank_account_shaba">
                                      </label>
                                  </div>
                              </div>

                              <br>

                              <button type="button" class="btn btn-success" v-on:click="createBankAccount">
                                  <span v-translate>REGISTER_BANK_ACCOUNT</span>
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
                                      <section class="center slider" style="position: relative; left: -15px;" v-if="sale.images.data[0]">
                                          <slick ref="slick" :options="slickOptions">
                                              <div class="pro-cart" v-for="saleImage in sale.images.data">
                                                  <div>
                                                      <img :src="getSaleImageLink(sale.id, saleImage.id)" class="img-thumbnail"/>
                                                  </div>
                                              </div>
                                          </slick>
                                      </section>
                                  </div>
                                  <div class="col-sm-3">
                                      <i class="fa fa-question-circle-o"></i>
                                      <strong  v-translate>STATUS</strong>:
                                      <span :class="sale.saleStatus" style="pointer-events: none" v-translate>SL_{{sale.saleStatus}}</span>
                                  </div>
                                  <div class="col-sm-6">
                                      <i class="fa fa-calendar"></i>
                                      <strong  v-translate>SALE_CREATION_DATETIME</strong>:
                                      <span>{{ transformGregorianDate(sale.createdAt) }}</span>
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

                                      <div v-if="sale.saleStatus === 'PRICE_ESTIMATED'">
                                          <a :href="getSaleAppointmentLink(sale.id)" v-translate class="btn btn-success" style="float: right;">SET_APPOINTMENT</a>
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
  require('slick-carousel/slick/slick.css')
  require('slick-carousel/slick/slick-theme.css')

  import Vue from 'vue'
  import VueBase64FileUpload from 'vue-base64-file-upload'
  import {VueTabs, VTab} from 'vue-nav-tabs'

  Vue.use(VueTabs)

  import user from '../auth/user'
  import sale from '../services/sale'
  import profile from '../services/profile'
  import PDatePicker from '@/components/PDatePicker'
  import Slick from 'vue-slick'

  export default {
    data () {
      return {
        user: '',
        stepOneError: '',
        stepTwoError: '',
        customImageMaxSize: 2,
        imageUploadBase64: [],
        categories: '',
        subCategories: '',
        attributes: '',
        saleUploads: '',
        saleUploadsCount: 0,
        selectedCategory: '',
        selectedSubCategory: '',
        selectedYearIndex: '',
        selectedConditionIndex: '',
        selectedAttributes: '',
        creationYears: sale.data().availableCreationYears,
        conditions: sale.data().availableConditions,
        toShowAddAddressForm: false,
        addressState: 'تهران',
        addressCity: 'تهران',
        addressAddress: '',
        addressPostcode: '',
        addressPhoneNumber: '',
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userDateOfBirth: '',
        selectedUsageYear: '',
        selectedUsageMonth: '',
        bankAccountFullName: '',
        bankAccountBankName: '',
        bankAccountNumber: '',
        bankAccountCardNumber: '',
        bankAccountShaba: '',
        slickOptions: {
          dots: true,
          slidesToShow: 1
        }
      }
    },
    components: {
      VueTabs,
      VTab,
      VueBase64FileUpload,
      'pdatepicker': PDatePicker,
      Slick
    },
    methods: {
      updateUser () {
        let dateOfBirth = $('#date_of_birth').attr('datevalueprop') ? $('#date_of_birth').attr('datevalueprop') : this.userDateOfBirth
        user.updateUser(this.userFirstName, this.userLastName, this.userEmail, dateOfBirth)
      },
      deleteAddress (addressId) {
        profile.deleteAddress(addressId)
      },
      deleteBankAccount (bankAccountId) {
        profile.deleteBankAccount(bankAccountId)
      },
      createAddress () {
        profile.createAddress(this.addressState, this.addressCity, this.addressAddress, this.addressPostcode, this.addressPhoneNumber)
      },
      createBankAccount () {
        profile.createBankAccount(this.bankAccountFullName, this.bankAccountBankName, this.bankAccountNumber, this.bankAccountCardNumber, this.bankAccountShaba)
      },
      cancelAddNewAddressForm () {
        this.toShowAddAddressForm = false
      },
      showAddAddressForm () {
        this.toShowAddAddressForm = true
      },
      toShowAddBankAccountForm () {
        return this.user.bankAccounts && this.user.bankAccounts.data.length === 0
      },
      getSaleAppointmentLink (saleId) {
        return '/sale/' + saleId + '/appointment'
      },
      getUploadedImages () {
        return this.imageUploadBase64.slice(-2)
      },
      onFile (file) {

      },
      onLoad (dataUri) {
        this.imageUploadBase64.push(dataUri)
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
        let year = this.creationYears[this.selectedYearIndex] ? this.creationYears[this.selectedYearIndex].title : ''
        let condition = this.conditions[this.selectedConditionIndex] ? this.conditions[this.selectedConditionIndex].title : ''
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
        return (
          this.selectedCategory !== '' &&
            this.selectedSubCategory !== '' &&
            this.selectedYearIndex !== '' &&
            this.selectedConditionIndex !== '' &&
            this.selectedUsageYear !== '' &&
            this.selectedUsageMonth !== ''
        )
      },
      isStepTwoFinished () {
        let isFinished = true
        $.each(this.selectedAttributes, function (index, attribute) {
          if (attribute.value.length === 0) {
            isFinished = false
          }
        })

        if (this.imageUploadBase64.length !== this.saleUploadsCount) {
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
        let label = e.target[e.target.options.selectedIndex].label
        let attributeIndex = e.target.options[e.target.options.selectedIndex].dataset.attributeindex
        this.selectedAttributes[attributeIndex].label = label
      },
      checkUrlHash () {
        jQuery('#' + this.$route.hash.substr(1) + '-tab-btn').trigger('click')
      },
      checkMainTabs () {
        jQuery('.tabcontent').hide()
        jQuery('.tabcontent')[0].style.display = 'block'
      },
      openTab (hash, targetDiv, event) {
        let i, tabcontent

        tabcontent = jQuery('.tabcontent')
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = 'none'
        }

        jQuery('.tablinks').removeClass('active')
        document.getElementById(targetDiv).style.display = 'block'
        event.currentTarget.className += ' active'

        window.location.hash = '#' + hash
      },
      transformGregorianDate (date) {
        return PDatePicker.methods.transformGregorianDate(date)
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

<style scoped>
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
        margin-bottom: 10px;
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
    }

   .category-attributes .form-group{
        margin-bottom: 0px;
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

   .my-sales .created{
       background-color: #f0ad4ea6;
       padding: 2px 8px;
       border-radius: 5px;
   }


   .my-sales .PRICE_ESTIMATED {
       background-color: #0099ff61;
       padding: 2px 8px;
       border-radius: 5px;
   }

   .tab-container .panel{
       margin-top:30px;
   }

   .tab-container .panel-heading{
       font-size: 17px;
       padding:5px 15px;
       color: #444;
       background-color: #aae0ec;
   }

   .tab-container .panel-body{
        padding:0px 15px;
    }

   .slick-next, .slick-prev{
       background-size: 90% !important;
       height: 23px !important;
       width: 23px !important;
   }

   .slick-next{
       right: -20px;
   }

   .slick-prev{
       left: -20px;
   }
</style>
