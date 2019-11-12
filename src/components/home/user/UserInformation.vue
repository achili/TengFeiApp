<template>
  <div class="user-information">
    <div class="user-information-header">
      <div class="user-information-close" @click="$router.closeActivity()">
        关闭
      </div>
      <div>
        <div class="qr-code-box">
          <div v-show="firstCode" :style="'background: url(\''+background+'\') center no-repeat;background-size: contain; height: 200px;width: 200px;'" style="margin: 0 auto;">
          </div>
          <div v-show="!firstCode" id="qrCode" class="qr-code" @click="refreshQrCode"></div>
        </div>

        <div style="text-align: center;font-size: 18px;color: #ccc;">
          通行二维码
        </div>
      </div>
      <div class="user-information-img" @click="$router.openActivity('archives')">
        <img class="avatar" :src="user.getAvatarUrl(300, 300)">
        <img class="associator"  v-if="$store.state.isAssociator" src="../../../assets/more/is_associator.png">
      </div>
    </div>

    <div class="user-information-block">
      <div class="user-information-block-name">
        {{user.name}}
      </div>
      <div class="user-information-block-content" @click="$router.openActivity('message')">
        <div :style="'background:url(\''+(require('../../../assets/svg/user/message.svg'))+'\') center no-repeat;height: 40px;'"
             v-if="this.$store.state.unReadMessageCount > 0"></div>
        <div :style="'background:url(\''+(require('../../../assets/svg/user/no_message.svg'))+'\') center no-repeat;height: 24px;margin: 7px;'"
             v-else></div>
        <div>
          我的消息
        </div>
      </div>

      <div class="user-information-block-content" v-for="item in items" :key="item.index" @click="$router.openActivity(item.router)">
        <div :style="'background: url(\''+ item.ico + '\') center no-repeat;height: 40px;margin: 0 auto;width: '+ item.width +';'"></div>
        <div>
          {{item.text}}
        </div>
      </div>

      <div class="user-information-block-content" @click="$router.openActivity('circleOrder')">
        <div :style="'background:url(\''+(require('../../../assets/svg/user/space_msg.svg'))+'\') center no-repeat;height: 40px;'"
             v-if="this.$store.state.circleMessage === true"></div>
        <div :style="'background:url(\''+(require('../../../assets/svg/user/space.svg'))+'\') center no-repeat;height: 24px;margin: 7px;'"
             v-else></div>
        <div>
          我的圈子
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import MessageLetter from "../../../common/model/message/letter/MessageLetter"
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        firstCode: true,
        loadingQrCode: true,
        qrCode: null,
        user: this.$store.state.user,
        messageLetter: new MessageLetter(),
        count: "",
        background: require("../../../assets/svg/user/code3.jpg"),
        items: {
          activeSpace: {
            text: "我的会议室",
            ico:  require('../../../assets/svg/user/meeting.svg'),
            width: "40px",
            router: "meetingOrder"
          },
          space: {
            text: "我的活动",
            ico:  require('../../../assets/svg/user/activity.svg'),
            width: "40px",
            router: "activeOrder"
          }
        },
        interval: null
      }
    },
    components: {

    },
    methods: {
      createQrCode(){
        this.qrCode = new QRCode('qrCode', {
          width: 190,
          height: 190, // 高度
          text: "172AAAA8D986917D2635465476533208AA3EFB519B7C8D848d965df6741b21bf01.00.00"// 二维码内容
        });
        this.refreshQrCode();
        //每隔25秒刷新一次
        this.interval = setInterval(this.refreshQrCode, 25000);
      },
      refreshQrCode() {
        let that = this;
        setTimeout(function () {
          that.loadingQrCode = true;
          that.user.httpUpdateQrCode(function (qrCode) {
            that.qrCode.makeCode(qrCode);
            that.loadingQrCode = false;
            that.firstCode = false;
          }, function () {
            that.loadingQrCode = false;
            that.$store.state.plus.nativeUI.toast("获取个人二维码失败",{duration:"short"});
          });
        }, 500);
      },
      refresh() {
        let that = this;
        // this.messageLetter.httpUnRead();
      }
    },
    mounted(){
      let that = this;
      this.refresh();
      this.createQrCode();
      //如果在打开二维码时登陆失效 需要有登陆回调
      this.$store.state.temps.loginCallback = function () {
        that.refreshQrCode();
      }
    },
    beforeDestroy(){
      if(this.interval) {
        clearInterval(this.interval)
      }
      this.$store.state.temps.loginCallback = null;
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .user-information {
    background-color: #F6F6F6;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;

    .qr-code-box {
      position: relative;
      padding-bottom: 10px;
      .qr-code-mask {
        position: absolute;
        top: 0;
        bottom: 0;
        margin-left: -100px;
        left: 50%;
        width: 200px;
        height: 200px;
        text-align: center;
        font-size: 40px;
        line-height: 200px;
        background: rgba(255,255,255,.4);
        color: black;
      }
      .qr-code {
        margin: 0 auto;
        width: 190px;
        height: 190px;
        padding: 5px;

      }
    }

    .user-information-header {
      background-color: #FFFFFF;
      .user-information-close {
        padding: 30px 20px;
        text-align: right;
        color: #00B3E4;
        font-size: 18px;
      }
      .user-information-img {
        width: 100px;
        margin: 0 auto;
        padding-top: 30px;
        position: relative;
        .avatar {
          border-radius: 50%;
          width: 100px;
          margin-bottom: -50px;
          border: 5px solid #FFFFFF;
        }
        .associator {
          position: absolute;
          width: 18px;
          height: 18px;
          bottom: -40px;
          right: 0;
        }
      }
    }
    .user-information-block {
      margin-top: 70px;
      width: 100%;
      text-align: center;
      padding-bottom: 50px;
      .user-information-block-name {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .user-information-block-content {
        display: inline-block;
        width: calc(50% - 30px);
        font-size: 15px;
        padding: 30px 0;
        background-color: #FFFFFF;
        margin: 10px;
        border-radius: 8px;
      }
    }
  }
</style>
