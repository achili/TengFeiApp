<template>
  <div class="message">
    <div class="message-header">
      <div class="message-first-block">
        <div class="message-first-block-svg" @click="$router.closeActivity()"
             :style="'background:url(\''+(require('../../../assets/svg/register/arrow.svg'))+'\') center no-repeat'">
        </div>
        <div class="message-first-block-name">
          我的消息
        </div>
      </div>
    </div>
    <div v-for="(lastMessageUser,key) in allMessages" :key="lastMessageUser.uuid">
      <div style="padding: 20px 0 0;" v-for="userManager in userManagerList.data"
           :key="userManager.index"  @click.stop="openMessage(userManager)" v-if="userManager.uuid === key">
        <div class="pull-right" style="color: #8D8D8D;">
          {{lastMessageUser[lastMessageUser.length - 1].createTime | complexHumanTime}}
        </div>
        <div style="display: flex;">
          <div v-if="userManager.avatar.uuid">
            <img :src="userManager.avatar.getLocalUrlBySize(40, 40)" style="width: 40px;height: 40px;border-radius: 50%;">
          </div>
          <div v-else>
            <img src="../../../assets/avatar.png" style="width: 40px;height: 40px;border-radius: 50%;">
          </div>
          <div style="padding-left: 20px;">
            <div style="color: #333333;font-size: 16px;font-weight: 600;">
              <span>{{userManager.name}}</span>
            </div>
            <div style="color: #8D8D8D;">
              <span>{{lastMessageUser[lastMessageUser.length - 1].content}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import MessageLetter from "../../../common/model/message/letter/MessageLetter"
  import Pager from "../../../common/model/_base/Pager";
  import {str2Date} from "../../../common/filter/time";
  import Tank from "../../../common/model/tank/Tank";
  import User from "../../../common/model/user/User";

  export default {
    data() {
      return {
        user: this.$store.state.user,
        allMessages: this.$store.state.allMessage,
        messageLetter: new MessageLetter(),
        messageLetterPage: new Pager(MessageLetter, 50),
        unReadMessageUsers: [],
        userManagerList: new Pager(User)
      }
    },
    components: {

    },
    methods: {
      openMessage(userManager) {
        let that = this;
        this.messageLetter.httpRead(userManager.uuid, function () {
          that.$router.openActivity('self_information', 'slide-left', {uuid: userManager.uuid});
        })
      }
    },
    mounted(){
      let that = this;
      this.messageLetter.httpRequestManager(function (response) {
        that.userManagerList.render(response.data.data);
        that.userManagerList.data.forEach(userManager => {
          userManager.avatar.keepLocal(40, 40);
        })
      });
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .message {
    height: 100vh;
    padding: 10px 20px;
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .message-header {
      .message-first-block {
        position: relative;
        font-size: 18px;
        .message-first-block-svg {
          height: 30px;
          width: 30px;
          display: inline-block;
        }
        .message-first-block-name {
          display: inline-block;
          position: absolute;
          line-height: 30px;
          right: 38%;
          font-weight: 600;
        }
      }
    }
  }
</style>
