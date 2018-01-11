<template>
  <div>
    <userTopHeader :user="user"></userTopHeader>

    <div class="container">
      <div class="compny-profile">
        <div class="profile-company-content" style="background: none;">
          <div class="container">
            <div class="row">
              <settingsSideBar :user="user" section="password"></settingsSideBar>

              <div class="col-md-7" style="margin-left: 30px; padding: 0px;">
                <div class="profile-company-content sidebar" style="margin-bottom: 0px;">

                  <div class="setting_content">
                    <h5>Password</h5>
                    <i>Change your password or recover your current one.</i>
                    <hr>
                    <div class="row">
                      <div class="col-md-4">
                        Current Password
                      </div>
                      <div class="col-md-8">
                        <input type="password" style="margin-bottom: 0px;">
                        <i><a href="#">Forgot your password?</a></i>
                      </div>
                    </div>

                    <br>
                    <div class="row">
                      <div class="col-md-4">
                        New Password
                      </div>
                      <div class="col-md-8">
                        <input type="password">
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                        Verify Password
                      </div>
                      <div class="col-md-8">
                        <input type="password">
                      </div>
                    </div>
                  </div>

                  <div class="row" style="text-align: center;">
                    <br>
                    <button class="btn btn-primary">Save Changes</button>
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
  import UserTopHeader from '@/components/UserTopHeader'
  import SettingsSideBar from '@/components/SettingsSideBar'

  export default {
    components: {
      'userTopHeader': UserTopHeader,
      'settingsSideBar': SettingsSideBar
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

  .setting_content hr {
    margin-top: 10px;
  }

  .setting_content h5 {
    margin-bottom: 0px;
  }
</style>
