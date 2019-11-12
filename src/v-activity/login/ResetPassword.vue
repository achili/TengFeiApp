<template>
  <div class="reset-password-page" style="padding: 50px 0 0 20px;">
    <div style="font-size: 40px;border-bottom: 2px solid #00B3E4;padding-bottom: 30px;">
      重置密码
    </div>
    <div style="font-size: 18px;line-height: 30px;padding: 20px 20px 30px 0;">
      手机验证已通过，请您重新设置密码。
    </div>
    <div style="padding: 0 20px 0 0;">
      <div>
        <NbForm :httpForm="httpResetPassword" :successCallback="resetPassword" createText="提交" :createClass="sss" create-icon=""></NbForm>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  import {startWith} from "../../common/filter/str";
  import NbForm from "../../components/widget/NbForm"

  export default {
    data () {
      return {
        user: this.$store.state.user,
        temps: this.$store.state.temps,
        httpResetPassword: this.$store.state.user.getHttpResetPassword(),
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
      resetPassword (response) {
        this.$store.state.plus.nativeUI.toast("修改密码成功",{duration:"short"});
        this.$router.openActivity('re_login');
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .reset-password-page {
    .sss {
      background-color: #00B3E4;
      border: 1px solid #00B3E4;
      padding: 16px;
      width: 100%;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 20px;
      margin-top: 30px;
    }
  }
</style>

