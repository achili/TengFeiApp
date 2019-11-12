<template>
  <div class="login-page">
    <div style="border-bottom: 2px solid #00B3E4;padding-bottom: 30px;">
      <span style="font-size: 40px;">
        登录
      </span>
      <span class="pull-right" style="font-size: 18px;margin-right: 20px;color: #00B3E4;margin-top: 5px;"  @click="$router.closeActivity()">
        返回
      </span>
    </div>
    <div class="login-page-description">
      请输入手机号码和密码登录，一起来探索奕桥空间，参与丰富活动。
    </div>
    <div class="login-page-content">
      <div>
        <NbForm :httpForm="httpLogin" :successCallback="login" createText="登录" :createClass="sss" create-icon=""></NbForm>
      </div>
      <div class="weChat-login" @click="weChatLogin">
        <div :style="'background:url(\''+(require('../../assets/svg/login/weChat.svg'))+'\') no-repeat'"
             style="height: 24px;width: 27px;margin-right: 15px;display: inline-block;vertical-align: text-top;"></div>
        微信登录
      </div>
      <div class="login-page-button">
        <div class="pull-left" @click="$router.openActivity('register')">
          马上注册
        </div>
        <div class="pull-right" @click="$router.openActivity('find_password',null,{title:'忘记密码'})">
          忘记密码
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import NbForm from "../../components/widget/NbForm"

  export default {
    data () {
      return {
        currentUser: this.$store.state.user,
        redirect: this.$store.state.route.query.redirect,
        httpLogin: this.$store.state.user.getHttpLogin(),
        sss: "sss"
      }
    },
    beforeCreate() {
    },
    props: {},
    computed: {},
    watch: {},
    components: {
      NbForm
    },
    methods: {
      login (response) {
        let that = this;
        //登录成功后更新一下用户信息
        this.currentUser.innerLogin(response);
        this.currentUser.keepLocalAvatar();
        this.$store.state.plus.nativeUI.toast("登录成功", {duration: "long"});
        //成功后的回调
        this.$store.state.temps.loginCallback && this.$store.state.temps.loginCallback();
        this.$router.closeActivity();
      },
      weChatLogin() {
        let that = this;
        this.currentUser.weChatLogin(function (response) {
          //登录成功后更新一下用户信息
          that.currentUser.innerLogin(response);
          that.currentUser.keepLocalAvatar();
          that.$store.state.plus.nativeUI.toast("登录成功", {duration: "long"});
          that.$store.state.temps.loginCallback && that.$store.state.temps.loginCallback();
          that.$router.closeActivity();
        }, function () {
          that.$router.openActivity("weChat_register");
        }, function () {

        });
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .login-page {
    padding: 30px 0 0 20px;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    height: 100vh;
    .login-page-title {
      font-size: 40px;
      border-bottom: 2px solid #00B3E4;
      padding-bottom: 30px;
    }
    .login-page-description {
      font-size:18px;
      line-height: 30px;
      padding: 20px 20px 30px 0;
    }
    .login-page-content {
      padding: 0 20px 0 0;
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
      .login-page-button {
        color: #00B3E4;
        font-size: 20px;
        margin-top: 50px;
        padding-bottom: 100px;
      }
    }
  }
</style>
