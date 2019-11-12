<template>
  <div class="call-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title">一键呼唤</div>
      <div class="inline"></div>
      <div class="content">
        <div class="phone" @click.stop="telephone">
          <div class="ico"></div>
          <div class="text">拨打电话</div>
        </div>
        <div class="sms" @click.stop="leavingMessage">
          <div class="ico"></div>
          <div class="text">小桥留言</div>
        </div>
      </div>
      <div class="close" @click.stop="closeOwn">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        appSettings: this.$store.state.appSettingList
      }
    },
    props: {
      closeCall: {
        type: Function
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      leavingMessage() {
        this.$router.openActivity('self_information', "slide-left", {uuid: this.$store.state.appSettingList.xiaoQiaoUser.uuid});
        this.closeCall()
      },
      telephone() {
        window.location.href = "tel:" + this.$store.state.appSettingList.xiaoQiaoPhone;
        this.closeCall()
      }
    },
    mounted(){}
  }
</script>


<style lang="less" rel="stylesheet/less">
  .call-service {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    .popup {
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background: #F3F4F6;
      color: #484848;
      .title {
        text-align: center;
        width: 100%;
        font-size: 16px;
        line-height: 56px;
      }
      .inline {
        width: 90%;
        margin: auto;
        height: 1px;
        background: #d7dcdd;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 20px 20px 25px 20px;
        line-height: 30px;
        font-size: 12px;
        .phone {
          width: 50%;
          .ico {
            width: 29px;
            height: 40px;
            margin: auto;
            background: url("../../../assets/svg/home/index/phone-ico.svg") no-repeat center content-box;
          }
        }
        .sms {
          width: 50%;
          .ico {
            width: 33px;
            height: 40px;
            margin: auto;
            background: url("../../../assets/svg/home/index/sms-cio.svg") no-repeat center content-box;
          }
        }
      }
      .close {
        text-align: center;
        font-size: 16px;
        line-height: 50px;
        background: white;
      }
    }
  }
</style>
