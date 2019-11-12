<template>
  <div class="weChat-register-page" style="padding: 20px 0 0 20px;height: 100vh;overflow-y: scroll;">
    <!--<div class="register-page-title">-->
      <!--完善信息-->
    <!--</div>-->
    <div style="border-bottom: 2px solid #00B3E4;padding-bottom: 30px;">
      <span style="font-size: 40px;">
        完善信息
      </span>
      <span class="pull-right" style="font-size: 18px;margin-right: 20px;color: #00B3E4;margin-top: 5px;"  @click="$router.closeActivity()">
        返回
      </span>
    </div>
    <div class="register-page-description">
      如果您是第一次微信登录，请完善一下个人信息。
    </div>
    <div style="padding-right: 20px;">
      <NbFormItem :formItem="phoneTest"></NbFormItem>
      <div style="margin-top: 30px;">
        <NbFormItem :formItem="phoneCodeTest"></NbFormItem>
      </div>
      <NbFormItem :formItem="passwordTest"></NbFormItem>
      <NbFormItem :formItem="repeatPasswordTest"></NbFormItem>
    </div>
    <div style="padding: 0 20px 70px 0;">
      <NbLoadingButton :entity="user" :callback="register" createText="注册" :createClass="sss" create-icon=""></NbLoadingButton>
      <div>
        注册即表示同意《软件许可及服务协议》
      </div>
      <div style="color: #00B3E4;" @click="software">
        条约与规划
      </div>
    </div>
  </div>
</template>
<script>
  import NbForm from "../../components/widget/NbForm"
  import NbFormItem from "../../components/widget/NbFormItem";
  import FormItem from "../../common/model/_base/FormItem";
  import NbLoadingButton from "../../components/widget/NbLoadingButton"

  export default {
    data () {
      let  phoneTest = new FormItem(FormItem.prototype.Type.INPUT, "手机号码",false, true, "phone", "user.phone", null,{max: 100, placeholder: "手机号码"});
      let passwordTest = new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: "请输入密码"});
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        // httpRegister: this.$store.state.user.getHttpRegister(),
        sss: "sss",
        phoneTest: phoneTest,
        passwordTest: passwordTest,
        phoneCodeTest: new FormItem(FormItem.prototype.Type.VALIDATION, "验证码",false, true, "phoneCode", "user.phoneCode", null,{placeholder: "验证码", phone: phoneTest}),
        repeatPasswordTest: new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "确认密码",false, true, "repeatPassword",  "user.repeatPassword", null, {max: 100, placeholder: "请确认密码", equal: passwordTest})
      }
    },
    beforeCreate() {
    },
    props: {},
    watch: {},
    computed: {},
    components: {
      NbForm,
      NbFormItem,
      NbLoadingButton
    },
    methods: {
      register () {
        let that = this;
        if (!this.phoneTest.value || !this.phoneCodeTest.value || !this.passwordTest.value || !this.repeatPasswordTest.value) {
          that.$store.state.plus.nativeUI.toast("请填写完所有的注册信息",{duration:"short"});
        } else {
          let weChatAuth = this.$store.state.auths[0];
          let form = {
            phone: this.phoneTest.value,
            phoneCode: this.phoneCodeTest.value,
            password: this.repeatPasswordTest.value,

            name: this.phoneTest.value,
            localArea: "",
            gender: "MALE",
            unionid: null,
            avatarUrl: null
          };
          weChatAuth.getUserInfo(function () {
            form.name = weChatAuth.userInfo.nickname;
            form.localArea = weChatAuth.userInfo.country;
            if(weChatAuth.userInfo.sex === 1) {
              form.gender = "MALE";
            } else {
              form.gender = "FEMALE";
            }
            form.unionid = weChatAuth.userInfo.unionid;
            form.avatarUrl = weChatAuth.userInfo.headimgurl;

            that.user.httpWeChatRegister(form, function () {
              that.$store.state.plus.nativeUI.toast("注册成功",{duration:"short"});
              that.user.keepLocalAvatar();
              that.$router.closeActivity('slide-right', 'home');
            });
          });

        }
      },
      software(){
        this.$router.openActivity('software_license');
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .weChat-register-page {
    .register-page-title {
      font-size: 40px;
      border-bottom: 2px solid #00B3E4;
      padding-bottom: 30px;
      padding-top: 30px;
    }
    .register-page-description {
      font-size: 18px;
      line-height: 30px;
      padding: 20px 20px 10px 0;
    }
    .sss {
      background-color: #00B3E4;
      border: 1px solid #00B3E4;
      padding: 14px;
      width: 100%;
      outline: none;
      resize: none;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 20px;
      margin-top: 35px;
      margin-bottom: 30px;
    }
  }
</style>

