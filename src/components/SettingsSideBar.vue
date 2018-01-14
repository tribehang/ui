<template>
    <div>
        <div class="col-md-4" style="padding: 0px;">
            <div class="sidebar">
                <h5 class="main-title">{{user.name}}</h5>
                <div class="sidebar-thumbnail">
                    <vue-base64-file-upload
                            class="user-upload-thumbnail"
                            accept="image/jpg,image/jpeg"
                            image-class="v1-image"
                            placeholder=""
                            input-class="v1-image"
                            :max-size="customImageMaxSize"
                            @load="onLoad" />
                </div>

                <div class="row" style="text-align: center;" v-if="userImageBase64 !== ''">
                    <button class="btn btn-default" v-on:click="saveUserProfileImage()">Save Image</button>
                    <hr>
                </div>
                <div class="sidebar-information">
                    <div class="profile-usermenu">
                        <ul class="nav nav-links">
                            <li v-bind:class="{ active: isActiveSection('account') }"> <a href="/settings/account"> <i class="fa "></i> Account </a> </li>
                            <li v-bind:class="{ active: isActiveSection('password') }"> <a href="/settings/password"> <i class="fa "></i> Password </a> </li>
                            <li> <a href="#."> <i class="fa "></i> Upgrade My Account </a> </li>
                            <li> <a href="#."> <i class="fa "></i> Account Settings </a> </li>
                            <li> <a href="#."> <i class="fa "></i> Sign out </a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import VueBase64FileUpload from 'vue-base64-file-upload'
import account from '../services/account'

export default {
  components: {
    VueBase64FileUpload
  },
  name: 'SettingsSideBar',
  props: {
    'user': {'default': '', Object},
    'section': {'default': 'account', String}
  },
  data () {
    return {
      customImageMaxSize: 2,
      userImageBase64: ''
    }
  },
  updated () {
    let profileImageSelector = jQuery('.user-upload-thumbnail input[type="text"]')

    profileImageSelector.css('background-image', 'url(' + account.getUserProfileImageUri(this.user) + ')')

    if (this.userImageBase64 !== '') {
      profileImageSelector.css('background-image', 'url(' + this.userImageBase64 + ')')
    }
  },
  methods: {
    isActiveSection (section) {
      return section === this.$route.meta.section
    },
    onLoad (dataUri) {
      this.userImageBase64 = dataUri
      jQuery('.user-upload-thumbnail input[type="text"]').css('background-image', 'url(' + dataUri + ')')
    },
    saveUserProfileImage () {
      account.setUserProfileImage(this.userImageBase64)
    }
  }
}
</script>

<style>
    .user-upload-thumbnail {
        width:100%;
        height:4rem;
        position:relative;
        left: 0;
        bottom: 0;
    }

    .user-upload-thumbnail img{
        display: none !important;

    }

    .user-upload-thumbnail input[type="text"]{
        height: 300px;
        color: #00000003;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .profile-company-content .sidebar .sidebar-thumbnail {
        height:310px;
    }
</style>
