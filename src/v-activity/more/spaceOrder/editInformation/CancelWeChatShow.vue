<template>
  <div class="cancel-weChat-show" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title">确认要取消微信关联吗?</div>
      <div class="content">
        <div class="select" >
          <div class="text" @click.stop="selectYes">是</div>
        </div>
        <div class="select" >
          <div class="text" @click.stop="selectNo">否</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        user: this.$store.state.user
      }
    },
    props: {
      closeCall: {
        type: Function
      },
      entity:{

      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      selectYes() {
        let that = this;
        this.user.httpCancelAssociation(this.user.unionid, function () {
          that.user.unionid = null;
          that.user.weChat = null;
          that.user.authLogoutAll();
          that.$store.state.plus.nativeUI.toast("取消关联成功！",{duration:"short"});
          that.closeCall();
        })
      },
      selectNo() {
        this.closeCall()
      }
    },
    mounted(){

    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .cancel-weChat-show {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
        font-size: 20px;
        line-height: 80px;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 0 20px 45px 20px;
        line-height: 30px;
        font-size: 12px;
        .select {
          width: 50%;
          .text{
            width: 126px;
            height: 40px;
            border: 1px solid #D3216F;
            border-radius: 5px;
            line-height: 40px;
            text-align: center;
            color: #D3216F;
            margin: 0 auto;
            font-size: 16px;
          }
        }

      }
    }
  }
</style>
