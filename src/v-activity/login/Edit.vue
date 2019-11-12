<template>
  <div class="edit-page" style="padding: 50px 0 0 20px;overflow-y: scroll;height: 100vh;-webkit-overflow-scrolling:touch;">
    <div style="font-size: 40px;border-bottom: 2px solid #00B3E4;padding-bottom: 30px;">
      注册
    </div>
    <div style="font-size: 18px;line-height: 30px;padding: 20px 20px 20px 0;">
      恭喜您已注册成功，您可以进一步完善个人信息，解锁更多功能。
    </div>
    <div style="padding: 0 20px 90px 0;">
      <div>
        <NbForm :httpForm="httpEdit" :successCallback="edit" createText="完成" :createClass="sss" create-icon=""></NbForm>
      </div>
      <div class="wechat-login" @click="$router.closeActivity('slide-right', 'home')">
        跳过
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
        loginFail: false,
        redirect: this.$store.state.route.query.redirect,
        httpEdit: this.$store.state.user.getHttpEdit(),
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
      edit (response) {
        this.user.render(response.data.data);
        this.$store.state.plus.nativeUI.toast("已完善信息，请登录",{duration:"short"});
        this.$router.closeActivity('slide-right', 'home');
      }
    },
    mounted () {

    }

  }

</script>
<style lang="less" rel="stylesheet/less">
  .edit-page {
    .sss {
      background-color: #00B3E4;
      border: 1px solid #00B3E4;
      padding: 16px;
      width: 100%;
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 20px;
      margin-top: 40px;
    }
    .wechat-login {
      border: 1px solid #00B3E4;
      color: #00B3E4;
      padding: 16px;
      margin-top: 20px;
      text-align: center;
      border-radius: 8px;
      font-size: 20px;
    }
  }
</style>
