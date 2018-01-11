<template>
  <div>
    <userTopHeader :user="user"></userTopHeader>

    <div class="container">
      <div class="compny-profile">
        <div class="profile-company-content" style="background: none;">
          <div class="container">
            <div class="row">
              <div class="col-md-4" style="padding: 0px;">
                <div class="sidebar">
                  <h5 class="main-title">{{user.name}}</h5>
                  <div class="sidebar-thumbnail"> <img src="https://avatarfiles.alphacoders.com/643/thumb-64385.png" alt=""> </div>
                  <div class="sidebar-information">
                    <div class="profile-usermenu">
                      <ul class="nav nav-links">
                        <li class="active"> <a href="/settings/account"> <i class="fa "></i> Account </a> </li>
                        <li> <a href="#."> <i class="fa "></i> Bookmarks </a> </li>
                        <li> <a href="#."> <i class="fa "></i> Upgrade My Account </a> </li>
                        <li> <a href="#."> <i class="fa "></i> Account Settings </a> </li>
                        <li> <a href="#."> <i class="fa "></i> Sign out </a> </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab Content -->
              <div class="col-md-7" style="margin-left: 30px; padding: 0px;">
                <div class="profile-company-content sidebar" style="margin-bottom: 0px;">
                  <h4>Network</h4>
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
  import UserTopHeader from '@/components/UserTopHeader'

  export default {
    components: {
      'userTopHeader': UserTopHeader
    },
    data () {
      return {
        user: ''
      }
    },
    beforeCreate () {
      auth.getUser(this)
    }
  }
</script>

<style scoped>
  .profile-company-content {
    padding-top: 20px;
  }
</style>
