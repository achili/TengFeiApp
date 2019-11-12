<template>
  <div class="home-index" :class="$store.state.keyboardHeight > 1? 'keyboard-show':''">
    <div class="home-index-top">
      <div class="home-search-box">
        <div class="home-search">
          <div class="input-box">
            <div class="search-ico"></div>
            <input class="search-input" placeholder="搜索" @click.stop="openSearchPopup"/>
          </div>
        </div>
        <div class="home-select">
          <NbSelect :options="$store.state.spaceRegionalList"></NbSelect>
        </div>
        <div class="home-user-box pull-right"
             :class="$store.state.unReadMessageCount > 0? 'msg':'' || $store.state.circleMessage === true? 'msg':''"
             @click.stop="login">
        </div>
      </div>
      <div class="fast-link">
        <div class="link-item" v-for="fastLink in fastLinks" :key="fastLink.text"  @click.stop="fastLink.click">
          <div class="link-ico"
               :style="'background:url(\''+fastLink.ico+'\') center no-repeat content-box'"
          ></div>
          <div class="link-text">{{fastLink.text}}</div>
        </div>
      </div>
    </div>

    <div class="index-tab-box">
      <div class="index-tab-item" :class="tab.active? 'active':''" v-for="tab in tabNavigation.homeIndex" @click.stop="clickTab(tab)" :key="tab.key">
        {{tabsStyle[tab.key]}}
      </div>
      <div class="write-circle" v-if="isCircle">
        <div class="circle-box" @click.stop="writeCircle"></div>
        <div class="circle-ico" @click.stop="writeCircle"></div>
      </div>
    </div>

    <div class="index-tab-line"></div>


    <div ref="swiper" class="home-index-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend">
      <div class="content-item">
        <CircleList ref="circleList" v-if="tabNavigation.homeIndex[0].active" :openCircleOperation="openCircleOperation"></CircleList>
      </div>
      <div class="content-item">
        <ActivityList v-if="tabNavigation.homeIndex[1].active"></ActivityList>
      </div>
      <div class="content-item">
        <NewList :openNewsDetail="openNewsDetail" v-if="tabNavigation.homeIndex[2].active"></NewList>
      </div>
    </div>

  </div>
</template>

<script>
  import CircleList from './index/CircleList'
  import ActivityList from './index/ActivityList'
  import NewList from './index/NewList'
  import MessageLetter from "../../common/model/message/letter/MessageLetter"
  import NbSelect from '../../components/widget/NbSelectRegional';
  export default {
    data() {
      let tabNavigation = this.$store.state.tabNavigation;
      let $router = this.$router;
      let that = this;
      return {
        keyboardHeight: this.$store.state.keyboardHeight,
        fastLinks: [
          {
            text: "会议室",
            ico: require("../../assets/svg/home/index/conference-room.svg"),
            click: function () {
              tabNavigation.home.forEach(item => {
                item.active = false;
              });
              tabNavigation.home[1].active = true;
              tabNavigation.homeSpace.forEach(item => {
                item.active = false;
              });
              tabNavigation.homeSpace[1].active = true;
            }
          },
          {
            text: "邀请访客",
            ico: require("../../assets/svg/home/index/invitation.svg"),
            click: function () {
              if (!that.$store.state.isAssociator) {
                that.$store.state.plus.nativeUI.toast("您还不是会员，不能邀请访客",{duration:"short"});
              } else {
                $router.openActivity("inviting_visitors", "slide-top");
              }
            }
          },
          {
            text: "预约参观",
            ico: require("../../assets/svg/home/index/visit.svg"),
            click: function () {
              $router.openActivity("introducTionVisit", "slide-top");
            }
          },
          {
            text: "呼唤小桥",
            ico: require("../../assets/svg/home/index/call-xiaoqiao.svg"),
            click: function () {
              that.openCallService();
            }
          }
        ],
        tabNavigation: tabNavigation,
        user: this.$store.state.user,
        messageLetter: new MessageLetter(),
        tabsStyle: {
          circle: "圈子",
          activity: "活动",
          news: "资讯"
        },
        //偏移量
        deviation: 0,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0,
        isCircle: true
      }
    },
    props: {
      openCallService: {
        type: Function
      },
      openCircleOperation: {
        type: Function
      },
      openSearchPopup: {
        type: Function
      },
      openNewsDetail: {
        type: Function
      }
    },
    components: {
      CircleList,
      ActivityList,
      NewList,
      NbSelect
    },
    methods: {
      login() {
        if (this.user.isLogin) {
          this.$router.openActivity('user_information');
        } else {
          this.$router.openActivity('login');
        }
      },
      clickTab(tab) {
        this.tabNavigation.homeIndex.forEach(tabI => {
          tabI.active = false
        });
        this.deviation = -(this.tabNavigation.homeIndex.indexOf(tab) * this.$refs.swiper.offsetWidth);
        tab.active = true;
        if (tab.key === "circle") {
          this.isCircle = true;
        } else {
          this.isCircle = false;
        }
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp
      },
      touchend(e) {
        let that = this;
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(Math.abs(distance) > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            if(distance > 0 && this.deviation < 0) {
              this.deviation += this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeIndex.forEach(tabI => {
                tabI.active = false;
              });
              this.tabNavigation.homeIndex[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
              if (this.tabNavigation.homeIndex[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].key === "circle") {
                that.isCircle = true;
              } else {
                that.isCircle = false;
              }
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * 2) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeIndex.forEach(tabI => {
                tabI.active = false;
              });
              this.tabNavigation.homeIndex[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
              if (this.tabNavigation.homeIndex[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].key === "circle") {
                that.isCircle = true;
              } else {
                that.isCircle = false;
              }
            }
          }
        }
      },
      writeCircle() {
        let that = this;
        this.$store.state.temps.publishCallBack = function () {
          that.$refs.circleList.refresh();
        };
        this.$router.openActivity("write_circle")
      }
    },
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">
  .home-index {
    height: calc(100vh - 50px);
    position: relative;
    &.keyboard-show {
      height: 100vh!important;
    }
    .home-index-top {
      padding: 5px 0 0 0;
      border-bottom: 1px solid #ECEEEF;
      .home-search-box {
        position: relative;
        padding: 0 15px;
        .home-search {
          width: calc(100% - 147px);
          display: inline-block;
          .input-box {
            position: relative;
            border-radius: 8px;
            background: #F1F1F2;
            padding: 7px 10px;
            display: flex;
            .search-ico {
              position: absolute;
              top: calc(50% - 7px);
              left: 15px;
              width: 14px;
              height: 14px;
              background: url("../../assets/svg/home/index/search.svg") no-repeat center;
            }
            .search-input {
              display: block;
              width: 100%;
              margin-left: 22px;
              background:none;
              outline:none;
              border:0;
              font-size: 16px;
            }
          }
        }
        .home-select{
          width: 95px;
          height: 34px;
          position: absolute;
          top: 0;
          right: 53px;
        }
        .home-user-box {
          position: absolute;
          top: 5px;
          right: 15px;
          width: 24px;
          height: 24px;
          padding: 5px;
          background: url("../../assets/svg/home/index/user.svg") content-box no-repeat center;
          &.msg {
            top: 2px;
            right: 15px;
            height: 27px;
            background: url("../../assets/svg/home/index/user-mesg.svg") content-box no-repeat center;
          }
        }
      }
      .fast-link {
        padding: 10px 15px;
        .link-item {
          padding: 8px 0 4px 0;
          width: 25%;
          display: inline-block;
          .link-ico {
            height: 25px;
            width: 25px;
            margin: 0 auto;
          }
          .link-text {
            margin-top: 5px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
    .index-tab-box {
      padding: 0 20px;
      height: 57px;
      .index-tab-item {
        height: 55px;
        width: 24%;
        display: inline-block;
        text-align: center;
        line-height: 55px;
        &.active {
          color: #00B3E5;
          border-bottom: 2px solid #00B3E5;
        }
      }
      .write-circle {
        width: 24%;
        display: inline-block;
        position: relative;
        .circle-box {
          position: absolute;
          top: -12px;
          bottom: 0;
          left: 0;
          right: 0;
          width: 65px;
          height: 35px;
          margin: auto;
        }
        .circle-ico {
          position: absolute;
          top: -15px;
          left: 64%;
          width: 18px;
          height: 18px;
          margin: auto;
          background: url("../../assets/svg/home/index/write-circle.svg") no-repeat center content-box;
        }
      }

    }
    .index-tab-line {
      height: 1px;
      background: #F6F6F6;
    }
    .home-index-content {
      height: calc(100% - 180px);
      width: 100%;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
      }
    }
  }
</style>
