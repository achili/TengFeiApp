<template>
  <div class="register-page" style="padding: 20px 0 0 20px;height: 100vh;overflow-y: scroll;-webkit-overflow-scrolling:touch;">
    <div @click="$router.closeActivity()" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'" style="height: 30px;width: 30px;"></div>
    <div class="register-page-title">
      注册
    </div>
    <div class="register-page-description">
      免费注册奕桥用户，体验灵活办公空间和新世代的工作方式。
    </div>
    <div style="padding-right: 20px;">
      <!--表单提交的两种方法-->
      <!--<div>-->
      <!--<NbForm :httpForm="httpRegister" :successCallback="register" createText="注册" :createClass="sss" create-icon=""></NbForm>-->
      <!--</div>-->
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
  import $ from "jquery"
  import {startWith} from "../../common/filter/str";
  import NbForm from "../../components/widget/NbForm"
  import NbFormItem from "../../components/widget/NbFormItem";
  import FormItem from "../../common/model/_base/FormItem";
  import NbLoadingButton from "../../components/widget/NbLoadingButton"

  export default {
    data () {
      let  phoneTest = new FormItem(FormItem.prototype.Type.INPUT, "手机号码",false, true, "phone", "user.phone", null,{max: 100, placeholder: "手机号码",isPhone:true});
      let passwordTest = new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: "请输入密码"});
      return {
        user: this.$store.state.user,
        phoneValidation: this.$store.state.user.phoneValidation,
        // httpRegister: this.$store.state.user.getHttpRegister(),
        sss: "sss",
        phoneTest: phoneTest,
        passwordTest: passwordTest,
        phoneCodeTest: new FormItem(FormItem.prototype.Type.VALIDATION, "验证码",false, true, "phoneCode", "user.phoneCode", null,{placeholder: "验证码", phone: phoneTest, checkLogin: true}),
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
        if(!FormItem.validateAll([this.phoneTest, this.passwordTest, this.phoneCodeTest, this.repeatPasswordTest])) {
          return;
        }
        if (!this.phoneTest.value || !this.phoneCodeTest.value || !this.passwordTest.value || !this.repeatPasswordTest.value) {
          that.$store.state.plus.nativeUI.toast("请填写完所有的注册信息",{duration:"short"});
        } else {
          this.user.httpRegister(this.phoneTest.value, this.phoneCodeTest.value, this.repeatPasswordTest.value, function (response) {
            that.$store.state.plus.nativeUI.toast("注册成功",{duration:"short"});
            that.user.httpAppLogin(that.phoneTest.value, that.repeatPasswordTest.value,function (response) {
              //登录成功后更新一下用户信息
              that.user.innerLogin(response);
              that.user.keepLocalAvatar();
            });
            that.$router.openActivity('edit');
          });
        }
      },
      software(){
        this.$router.openActivity('software_license');
      }
    },
    mounted () {
      this.phoneValidation.checkLogin = true;
    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .register-page {
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

