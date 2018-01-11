<template>
    <div>
        <div id="main-wrapper">
            <div class="toolbar navbar-fixed-top">
                <div class="uou-block-1a">
                    <div class="container">
                        <div class="search">
                            <ul class="authentication">
                                <li><a href="/profile">{{user.name}}</a></li>
                                <li><a href="/">TribeHang</a></li>
                            </ul>
                        </div>

                        <ul class="sf-menu">
                            <li><a><i class="fa fa-gear" style="font-size: 20px;"></i></a>
                                <ul>
                                    <li><a href="/settings/account">Account</a></li>
                                    <li><a href="profile_company-no-tabs.html">Profile Company No Tabs</a></li>
                                    <li><a href="user-dashboard(connections)(hotkeys-disabled).html">User Dashboard 1</a></li>
                                    <li><a href="user-dashboard(connections)(hotkeys-enabled).html">User Dashboard 2</a></li>
                                    <li><a href="user-dashboard(followers).html">User Dashboard 3</a></li>
                                    <li><a href="user-dashboard(following).html">User Dashboard 4</a></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </li>
                            <li> <a href="#" class="btn btn-primary btn-hang">Hang</a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'UserTopHeader',
  props: {
    'user': {'default': '', Object}
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
    .sf-menu {
        float: right;
        margin-bottom: 0px;

    }

    .sf-menu a {
        color: #333333;
        font-size:14px;
        border-left:none;
    }

    .sf-menu ul {
        box-shadow:none;
    }

    .sf-menu ul li {
        background: none;
    }
    .uou-block-1a .container .sf-menu > li > ul li {
        border-bottom: 1px solid #353535;
        font-size: 15px;
    }

    .uou-block-1a .container .sf-menu > li > ul li a {
        background: #444444;
        color: inherit;
        padding: 6px 15px;
        min-width: 160px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 300 !important;
        border:none;
    }

    .uou-block-1a .container .sf-menu > li > ul li a:hover {
        background: #0099ff;
        color: #ffffff;
    }

    .uou-block-1a .container .sf-menu > li > ul li:first-child a  {
        border-radius: 3px 3px 0 0;
    }

    .btn-hang{
        padding: 8px 15px;
        line-height: 18px;
        color: #FFF !important;
        text-transform: none;
        position: relative;
        top: 5px;
        background-color: #1da1f2;
        border-top: none;
    }

    .btn-hang:hover{
        background-color: #1da1f2e6
    }
</style>
