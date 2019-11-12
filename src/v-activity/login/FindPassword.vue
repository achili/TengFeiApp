<template>
  <div class="find-password-page" style="padding: 50px 0 0 20px;">
    <div style="border-bottom: 2px solid #00B3E4;padding-bottom: 30px;">
      <span style="font-size: 40px;">
        {{activity.query.title}}
      </span>

      <span class="pull-right" style="font-size: 18px;margin-right: 20px;color: #00B3E4;margin-top: 5px;"  @click="$router.closeActivity()">
        返回
      </span>
    </div>

    <div style="font-size: 18px;line-height: 30px;padding: 20px 20px 20px 0;">
      为了您的账户安全，需要验证您的注册手机号，方可重置密码。
    </div>
    <div>
      <!--表单提交的两种方法-->
      <!--<div>-->
      <!--<NbForm :httpForm="httpRegister" :successCallback="register" createText="注册" :createClass="sss" create-icon=""></NbForm>-->
      <!--</div>-->
      <NbFormItem :formItem="phoneTest"></NbFormItem>
      <NbFormItem style="margin-top: 30px;" :formItem="phoneCodeTest"></NbFormItem>

    </div>
    <div style="padding: 30px 20px 0 0;">

      <NbLoadingButton :entity="user" :callback="findPassword" createText="提交" :createClass="sss" create-icon=""></NbLoadingButton>
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
  import Activity from "../../common/model/_base/Activity";

  export default {
    data () {
      let  phoneTest = new FormItem(FormItem.prototype.Type.INPUT, "手机号码",false, true, "phone", "user.phone", null,{max: 100, placeholder: "输入手机号"});
      return {
        user: this.$store.state.user,
        temps: this.$store.state.temps,
        phoneValidation: this.$store.state.user.phoneValidation,
        // httpRegister: this.$store.state.user.getHttpRegister(),
        sss: "sss",
        phoneTest: phoneTest,
        phoneCodeTest: new FormItem(FormItem.prototype.Type.VALIDATION, "验证码",false, true, "phoneCode", "user.phoneCode", null,{placeholder: "验证码", phone: phoneTest, checkNotLogin: true})
      }
    },
    beforeCreate() {
    },
    props: {
      activity: {
        type: Activity,
        required: true
      }
    },
    watch: {},
    computed: {},
    components: {
      NbForm,
      NbFormItem,
      NbLoadingButton
    },
    methods: {
      findPassword () {
        let that = this;
        if (!this.phoneTest.value || !this.phoneCodeTest.value) {
          that.$store.state.plus.nativeUI.toast("请填写完所有的信息",{duration:"short"});
        } else {
          this.user.httpPhoneValidation(this.phoneTest.value, this.phoneCodeTest.value, function (response) {
            that.$store.state.plus.nativeUI.toast("手机验证成功",{duration:"short"});
            that.user.innerLogin(response);
            that.temps.phone = that.phoneTest.value;
            that.temps.phoneCode = that.phoneCodeTest.value;
            console.log(that.temps);
            that.$router.openActivity('reset_password');
          });
        }
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .find-password-page {
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
      margin-top: 30px;
      margin-bottom: 30px;
    }
  }

</style>

