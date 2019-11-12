<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="call-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title">邀请一下，快乐加倍哦！</div>
      <div class="inline"></div>
      <div class="content">
        <div class="weChat" @click.stop="weChat">
          <div class="ico"></div>
          <div class="text">微信好友</div>
        </div>
        <div class="email" @click.stop="email">
          <div class="ico"></div>
          <div class="text">电子邮件</div>
        </div>
        <div class="link" @click.stop="link"
             v-clipboard:copy="appMessage" v-clipboard:success="onCopy" v-clipboard:error="onError"
        >
          <div class="ico"></div>
          <div class="text">复制链接</div>
        </div>
      </div>
      <div class="close" @click.stop="closeOwn">取消</div>
    </div>
  </div>
</template>

<script>
  import InviteVisitor from "../../../common/model/invite/InviteVisitor";
  export default {
    data() {
      return {
        user: this.$store.state.user,
        appMessage: ""
      }
    },
    props: {
      closeCall: {
        type: Function
      },
      invitation:{
        type: Function
      },
      inviteVisitor: {
        type: InviteVisitor
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      weChat() {
        //先使用系统分享，等微信审核通过后再变成微信好友分享
        this.inviteVisitor.shareSystem(this.inviteVisitor.uuid);
        // this.invitation();
        // this.$router.closeActivity('slide-top');
        // this.closeCall()
      },
      email() {
        this.invitation();
        let text = "?subject=邀请函&body=" + this.appMessage;
        window.location.href = "mailto:" + this.user.email + text;
        this.$router.closeActivity('slide-top');
      },
      link(){
        this.invitation();
        this.$router.closeActivity('slide-top');
      },
      onCopy(e){
        this.$store.state.plus.nativeUI.toast("复制成功",{duration:"short"});
      },
      onError(e){
        this.$store.state.plus.nativeUI.toast("复制失败",{duration:"short"});
      }
    },
    mounted(){
      this.appMessage = this.$store.state.domain + '/share/invite/visitor/detail?uuid=' + this.inviteVisitor.uuid;
    }
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
        background: #BCBCBC;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 20px 20px 25px 20px;
        line-height: 30px;
        font-size: 12px;
        .weChat {
          width: 50%;
          .ico {
            width: 29px;
            height: 40px;
            margin: auto;
            background: url("../../../assets/svg/home/index/weChat.svg") no-repeat center content-box;
          }
        }
        .email {
          width: 50%;
          .ico {
            width: 33px;
            height: 40px;
            margin: auto;
            background: url("../../../assets/svg/home/index/email.svg") no-repeat center content-box;
          }
        }
        .link {
          width: 50%;
          .ico {
            width: 33px;
            height: 40px;
            margin: auto;
            background: url("../../../assets/svg/home/index/link.svg") no-repeat center content-box;
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
