<template>
  <div class="relogin-page" style="padding: 50px 0 0 20px;height: 100vh;overflow-y: scroll;-webkit-overflow-scrolling:touch;">
    <div style="font-size: 40px;border-bottom: 2px solid #00B3E4;padding-bottom: 30px;">
      登录
    </div>
    <div style="font-size:18px;line-height: 30px;padding: 20px 20px 50px 0;">
      恭喜您重置密码成功，请您重新登录。
    </div>
    <div style="padding: 0 20px 90px 0;">
      <div>
        <NbForm :httpForm="httpLogin" :successCallback="login" createText="登录" :createClass="sss" create-icon=""></NbForm>
      </div>
      <div class="weChat-login">
        <div :style="'background:url(\''+(require('../../assets/svg/login/weChat.svg'))+'\') no-repeat'"
             style="height: 24px;width: 27px;margin-right: 15px;display: inline-block;vertical-align: text-top;"></div>
        微信登录
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import Vue from 'vue'
  import {startWith} from "../../common/filter/str";
  import NbForm from "../../components/widget/NbForm"

  export default {
    data () {
      return {
        user: this.$store.state.user,
        redirect: this.$store.state.route.query.redirect,
        httpLogin: this.$store.state.user.getHttpLogin(),
        sss: "sss"
      }
    },
    beforeCreate() {
    },
    props: {},
    watch: {},
    computed: {},
    components: {
      NbForm
    },
    methods: {
      login (response) {
        let that = this;
        //登录成功后更新一下用户信息
        this.user.innerLogin(response);
        this.$store.state.tabNavigation.home[0].active = true;
        this.$router.closeActivity("slide-right", "home");
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .relogin-page {
    .sss {
      background-color: #00B3E4;
      border: 1px solid #00B3E4;
      padding: 14px;
      width: 100%;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 18px;
      margin-top: 40px;
    }
    .weChat-login {
      border: 1px solid #00B3E4;
      color: #00B3E4;
      padding: 14px;
      margin-top: 20px;
      text-align: center;
      border-radius: 8px;
      font-size: 18px;
    }
  }
</style>
