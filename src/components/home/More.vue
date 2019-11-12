<template>
  <div class="more">
    <div class="more-index-content">
      <div class="more-header" v-if="user.isLogin" @click="$router.openActivity('archives')">
        <div class="more-header-img">
          <img class="avatar" :src="user.getAvatarUrl(240, 240)">
          <img class="associator" v-if="$store.state.isAssociator" src="../../assets/more/is_associator.png">
        </div>
        <div class="more-header-word">
          <div v-if="user.name" class="more-header-word-name">
            {{user.name}}<span class="word-name-text" v-if="user.checkFeatureType('ADMIN')">({{user.role.name}})</span>
          </div>
          <div v-else class="more-header-word-name">
            {{user.phone}}<span class="word-name-text" v-if="user.checkFeatureType('ADMIN')">({{user.role.name}})</span>
          </div>

          <div>
            浏览及编辑档案
          </div>
        </div>
        <div :style="'background:url(\''+(require('../../assets/svg/more/select.svg'))+'\') center'" style="height: 30px;width: 30px;float: right;"></div>
      </div>
      <div class="more-header" v-else @click="$router.openActivity('login')">
        <div class="more-header-img">
          <img :src="user.getAvatarUrl(240, 240)">
        </div>
        <div class="more-header-word">
          <div class="more-header-word-name">
            {{user.name}}
          </div>
          <div>
            浏览及编辑档案
          </div>
        </div>
        <div :style="'background:url(\''+(require('../../assets/svg/more/select.svg'))+'\') center'" style="height: 30px;width: 30px;float: right;"></div>
      </div>

      <div class="more-order">
        <div class="more-order-name">
          我的订单
        </div>
        <div class="more-block" v-for="order in orders" :key="order.index" @click.stop="order.click" :typeTop="order.text">
          <div style="padding: 15px 20px;display: flex;">
            <div :style="'background: url(\''+ order.ico + '\') no-repeat;height: 22px;width: 20px;margin-right: 20px;'"></div>
            <div style="line-height: 23px;">{{order.text}}</div>
          </div>
        </div>

        <div class="more-information">
          其他信息
        </div>
        <div class="more-block" v-for="other in others" :key="other.index">
          <div style="padding: 15px 20px;display: flex;"  @click="$router.openActivity(other.router)">
            <div :style="'background: url(\''+ other.ico + '\') no-repeat;height: 22px;width: 20px;margin-right: 20px;'"></div>
            <div style="line-height: 23px;">{{other.text}}</div>
          </div>
        </div>

        <div class="more-information">
          设置
        </div>
        <!--<div class="more-block" v-for="setting in settings" :key="setting.index">-->
        <!--<div style="padding: 10px 0" @click="$router.openActivity(setting.router)">-->
        <!--<div :style="'background: url(\''+ setting.ico + '\') no-repeat;height: 30px;width: 30px;margin-right: 15px;display: inline-block;vertical-align: bottom;'"></div>-->
        <!--<div style="display: inline-block">{{setting.text}}</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="more-block">
          <div style="padding: 15px 20px;display: flex;" @click.prevent="toastMsg">
            <div :style="'background:url(\''+(require('../../assets/svg/more/language.svg'))+'\') no-repeat'"
                 style="height: 22px;width: 20px;margin-right: 20px;"></div>
            <div style="line-height: 23px;">语言</div>
          </div>
        </div>
        <div class="more-block">
          <div style="padding: 15px 20px;display: flex;" @click.prevent="changePassword">
            <div :style="'background:url(\''+(require('../../assets/svg/more/changePassword.svg'))+'\') no-repeat'"
                 style="height: 22px;width: 20px;margin-right: 20px;"></div>
            <div style="line-height: 23px;">修改密码</div>
          </div>
        </div>
        <div class="more-block">
          <div style="padding: 15px 20px;display: flex;" @click.prevent="openLogOut">
            <div :style="'background:url(\''+(require('../../assets/svg/more/logout.svg'))+'\') no-repeat'"
                 style="height: 22px;width: 20px;margin-right: 20px;"></div>
            <div style="line-height: 23px;">退出</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      let $router = this.$router;
      return {
        user: this.$store.state.user,
        logOutShow: false,
        orders: {
          meeting: {
            text: "会议室",
            ico:  require('../../assets/svg/more/meeting.svg'),
            click: function () {
              $router.openActivity("meetingOrder", "slide-left");
            }
          },
          activeSpace: {
            text: "活动场地",
            ico:  require('../../assets/svg/more/activeSpace.svg'),
            click: function () {
              $router.openActivity("activesOrder", "slide-left");
            }

          },
          space: {
            text: "空间",
            ico:  require('../../assets/svg/more/space.svg'),
            click: function () {
              $router.openActivity("spaceOrder", "slide-left");
            }
          },
          visit: {
            text: "预约参观",
            ico:  require('../../assets/svg/more/visit.svg'),
            click: function () {
              $router.openActivity("visitOrder", "slide-left");
            }
          },
          active: {
            text: "报名活动",
            ico:  require('../../assets/svg/more/active.svg'),
            click: function () {
              $router.openActivity("activeOrder", "slide-left");
             }
           },
          invite: {
            text: "邀请访客",
            ico:  require('../../assets/svg/more/invete.svg'),
            click: function () {
              $router.openActivity("inviteOrder", "slide-left");
            }
          }
        },
        others: {
          userManual: {
            text: "用户手册",
            ico: require('../../assets/svg/more/userManual.svg'),
            router: "user_manual"
          },
          usualQuestion: {
            text: "常见问题",
            ico: require('../../assets/svg/more/usualQuestion.svg'),
            router: "common_problem"
          },
          about: {
            text: "关于奕桥",
            ico: require('../../assets/svg/more/about.svg'),
            router: "about"
          }
        }
      }
    },
    components: {

    },
    props: {
      openLogOut: {
        type: Function
      }
    },
    methods: {
      logout() {
        let that = this;
        this.user.httpLogout(function () {
          that.$router.openActivity('login');
        });
      },
      changePassword(){
        let that = this;
        that.$router.openActivity('find_password',"slide-left",{title:"修改密码"});
      },
      toastMsg(){
        let that = this;
        that.$store.state.plus.nativeUI.toast("等待上线中");
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .more {
    height: calc(100vh - 50px);
    position: relative;
    .more-index-content {
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      .more-header {
        background: #F6F6F6;
        height: 120px;
        text-align: left;
        padding: 40px 20px 0 30px;
        .more-header-img {
          float: left;
          padding-right: 20px;
          position: relative;
          .avatar {
            border-radius: 50%;
            width: 80px;
            height: 80px;
          }
          .associator {
            position: absolute;
            width: 18px;
            height: 18px;
            bottom: 4px;
            right: 25px;
          }
        }
        .more-header-word {
          width: auto;
          line-height: 30px;
          height: 20px;
          padding-top: 10px;
          .word-name-text {
            font-size: 13px;
          }
          .more-header-word-name {
            font-size: 18px;
            font-weight: 600;
          }
          .more-header-word-description {
            color: #888888;
          }
        }
      }

      .more-order {
        text-align: left;
        .more-order-name {
          padding: 22px 20px 10px;
          color: #888888;
          font-size: 14px;
        }
        .more-block {
          border-bottom: 1px solid #ECEEEF;
        }
        .more-information {
          padding: 22px 20px 10px;
          color: #888888;
          font-size: 14px;
        }
      }
    }
  }
</style>
