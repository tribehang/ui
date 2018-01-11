<template>
    <div>
        <div class="col-md-4" style="padding: 0px;">
            <div class="sidebar">
                <h5 class="main-title">{{user.name}}</h5>
                <div class="sidebar-thumbnail"> <img src="https://avatarfiles.alphacoders.com/643/thumb-64385.png" alt=""> </div>
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

export default {
  name: 'SettingsSideBar',
  props: {
    'user': {'default': '', Object},
    'section': {'default': 'account', String}
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    isActiveSection (section) {
      return section === this.$route.meta.section
    }
  }
}
</script>

<style scoped>

</style>
