<template>
  <div class="self-information">
    <div class="self-information-header">
      <div class="self-information-first-block">
        <div class="self-information-first-block-svg" @click="$router.closeActivity()"
             :style="'background:url(\''+(require('../../../assets/svg/register/arrow.svg'))+'\') center no-repeat'">
        </div>
        <div class="self-information-first-block-name">
          {{user.name}}
        </div>
      </div>
    </div>

    <div class="self-information-test" ref="scrollContent">
      <!--所有的聊天记录-->
      <div class="message-history" v-for="(lastMessageUser,key) in allMessages" :key="lastMessageUser.key">
        <div v-if="activity.query.uuid === key">
          <div v-for="message in lastMessageUser" :key="message.index">
            <div class="message-history-other" v-if="message.read === false">

              <div class="message-history-other-img" v-if="user.avatar.uuid">
                <img :src="user.avatar.getLocalUrlBySize(35, 35)" style="width: 35px;height: 35px;border-radius: 50%;"/>
              </div>
              <div class="message-history-other-img" v-else>
                <img src="../../../assets/avatar.png">
              </div>

              <div class="message-history-other-word">
                <div class="message-history-other-content">
                  {{message.content}}
                </div>
                <div class="message-history-other-time">
                  {{message.createTime | humanTime}}
                </div>
              </div>
            </div>
            <div class="message-history-owner" v-else>
              <div class="message-history-owner-word">
                <div class="message-history-owner-content">
                  {{message.content}}
                </div>
                <div class="message-history-owner-time">
                  {{message.createTime | humanTime}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="message-history-footer" :style="'bottom:'+ num + 'px'">
      <div class="message-history-footer-textarea" v-if="!isWrite" @click.stop="changeWrite">
         <textarea class="form-control chat-footer-textarea-cell" rows="1" v-model="messageLetter.content"
                   @keyup.enter="send(messageLetter)" placeholder="写信息 ...">
         </textarea>
      </div>
      <div class="message-history-footer-textarea" v-else>
         <textarea class="form-control chat-footer-textarea-cell" rows="1" v-model="messageLetter.content"
                   placeholder="写信息 ...">
         </textarea>
        <div class="message-history-footer-textarea-button" @click.stop="send(messageLetter)">
          发送
        </div>
        <i v-show="messageLetter.loading" class="fa fa-spinner fa-spin pull-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import Activity from "../../../common/model/_base/Activity";
  import MessageLetter from "../../../common/model/message/letter/MessageLetter"
  import {str2Date} from "../../../common/filter/time";
  import Pager from "../../../common/model/_base/Pager";
  import User from "../../../common/model/user/User";
  import $ from "jquery";

  export default {
    data() {
      return {
        user: new User(),
        allMessages: this.$store.state.allMessage,
        currentUser: this.$store.state.user,
        messageLetter: new MessageLetter(),
        pager: new Pager(MessageLetter, 50),
        plus: this.$store.state.plus,
        num: 0,
        isWrite: false
      }
    },
    props: {
      activity: {
        type: Activity,
        required: false
      }
    },
    computed: {
      scrollContent() {
        return this.$refs["scrollContent"];
      }
    },
    components: {

    },
    methods: {
      refreshMessageLetterPage() {
        let that = this;
        this.pager.setFilterValue("sender", this.currentUser.uuid);
        this.pager.setFilterValue("receiver", this.currentUser.uuid);
        this.pager.httpFastPage(function () {
          $(that.scrollContent).animate({
            scrollTop: 9900
          }, 10);
        });
      },
      changeWrite() {
        this.isWrite = !this.isWrite;
      },
      send(messageLetter){
        let that = this;
        if (this.messageLetter.content.replace(/^\s|\s|\s|\s$/g,'') === "" || this.messageLetter.content === null || this.messageLetter.content === undefined) {

          that.plus.nativeUI.toast("私信正文不能为空",{duration:"short"});
          that.messageLetter.render(new MessageLetter());
        } else {
          if(messageLetter.loading) {
            return;
          }
          this.messageLetter.httpSendMessage(that.activity.query.uuid, function (response) {
            that.plus.nativeUI.toast("发送成功",{duration:"short"});
            that.messageLetter.render(new MessageLetter());
            that.messageLetter.data = response.data.data;
            // that.refreshMessageLetterPage();
          });
        }
      },
      refresh() {
        let that = this;
        //前台通过路由传回来了所选用户的uuid，通过这个参数可以找到该用户的详情，
        // 返回结果先render转换成BaseEntity对象，再保存到本地渲染出来
        this.user.uuid = this.$store.state.route.query.uuid;
        this.user.httpDetail(function () {
          that.user.avatar.keepLocal(35, 35);
          $(that.scrollContent).animate({
            scrollTop: 9900
          }, 10);
        });
      }
    },
    mounted(){
      this.refresh();
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .self-information {
    .self-information-header {
      border-bottom: 1px solid #EDEDED;
      .self-information-first-block {
        position: relative;
        font-size: 20px;
        line-height: 30px;
        padding: 5px 20px 5px;
        .self-information-first-block-svg {
          height: 30px;
          width: 30px;
          display: inline-block;
        }
        .self-information-first-block-name {
          display: inline-block;
          position: absolute;
          right: 42%;
          font-weight: 600;
        }
      }
    }

    .self-information-test {
      height: calc(100vh - 180px);
      position: relative;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      border-bottom: 1px solid #EDEDED;
      padding: 10px 20px;
      .message-history {
        .message-history-other {
          display: flex;
          padding-bottom: 10px;
          .message-history-other-img {
            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
            }
          }
          .message-history-other-word {
            max-width: 260px;
            .message-history-other-content {
              font-size: 18px;
              padding-left: 30px;
            }
            .message-history-other-time {
              font-size: 14px;
              color: #ccc;
              padding-left: 20px;
              padding-top: 10px;
            }
          }
        }

        .message-history-owner {
          display: flex;
          padding-bottom: 10px;
          justify-content: flex-end;
          .message-history-owner-word {
            max-width: 260px;
            .message-history-owner-content {
              font-size: 18px;
              padding: 10px 50px 10px 10px;
              background-color: #EDEDED;
              border-radius: 8px;
              max-width: 260px;
            }
            .message-history-owner-time {
              font-size: 14px;
              color: #ccc;
              padding-top: 5px;
              text-align: right;
            }
          }
        }
      }
    }
    .message-history-footer {
      .message-history-footer-textarea {
        display: flex;
        justify-content: space-between;
        margin: 20px;

        textarea {
          flex: 4;
          resize: none;
          padding: 15px;
          outline: none;
          font-size: 18px;
          margin-right: 10px;
          background-color: #EDEDED;
          border: 0;
          border-radius: 7px;
        }
        .message-history-footer-textarea-button {
          flex: 1;
          height: 49px;
          color: #ffffff;
          text-align: center;
          line-height: 49px;
          font-size: 17px;
          border-radius: 7px;
          border: 1px solid #00B3E5;
          background-color: #00B3E5;
        }
      }
    }
  }
</style>
