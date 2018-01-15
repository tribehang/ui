<template>
  <div>
    <userTopHeader :user="user"/>
    <div class="container">
      <div class="compny-profile">
        <div class="profile-company-content" style="background: none;">
          <div class="container">
            <div class="row">
              <settingsSideBar :user="user" section="account" />
              <div class="col-md-7" style="margin-left: 30px; padding: 0px;">
                <div class="profile-company-content sidebar" style="margin-bottom: 0px;">
                  <div class="setting_content">
                    <h5>Account</h5>
                    <hr>
                    <div class="row">
                      <div class="col-md-4">
                        Username
                      </div>
                      <div class="col-md-8">
                        <input type="text" v-model="user.username" placeholder="Username" :value="user.username">
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                        Email
                      </div>
                      <div class="col-md-8">
                        <input type="text"  disabled :value="user.email">
                      </div>
                    </div>
                  </div>

                  <div class="setting_content">
                    <h5>Content</h5>
                    <hr>
                    <div class="row">
                      <div class="col-md-4">
                        Country
                      </div>
                      <div class="col-md-8">
                        <select name="country">
                          <option value="DE">Germany</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row" style="text-align: center;">
                    <br>
                    <button class="btn btn-primary" v-on:click="updateUser()">Save Changes</button>
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
    methods: {
      updateUser () {
        let data = {}
        data['username'] = this.user.username
        auth.updateUser(data)
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
