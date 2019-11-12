<template>
  <div class="app-home">
    <div class="home-content">
      <Index v-show="tabNavigation.home[0].active"
             :openCallService="openCallService"
             :openCircleOperation="openCircleOperation"
             :openSearchPopup="openSearchPopup"
             :openNewsDetail="openNewsDetail"></Index>
      <Space v-if="tabNavigation.home[1].active"></Space>
      <Welfar v-if="tabNavigation.home[2].active"></Welfar>
      <More v-if="tabNavigation.home[3].active" :openLogOut="openLogOut"></More>
    </div>
    <div v-show="$store.state.keyboardHeight < 1" class="home-tab">
      <div class="tab-item" :class="tab.active? 'active':''" v-for="tab in tabNavigation.home" :key="tab.index" @click.stop="clickTab(tab)">
        <div class="tab-item-ico"
             :style="'background:url(\''+(tab.active?tabsStyle[tab.key].active:tabsStyle[tab.key].ico)+'\') center no-repeat content-box'">

        </div>
        <div class="tab-item-text">{{tabsStyle[tab.key].text}}</div>
      </div>
    </div>

    <div class="popup-box" v-if="callServiceShow">
      <CallService :closeCall="closeAllPopup"></CallService>
    </div>

    <div class="popup-box" v-if="circleOperationShow">
      <CircleOperation :closeCall="closeAllPopup" :delCallBack="delCallBack" :isCreator="isCreator" :reportCallback="reportCallback"></CircleOperation>
    </div>

    <div class="popup-box" v-if="searchPopupShow">
      <SearchPopup :closeCall="closeAllPopup"></SearchPopup>
    </div>

    <div class="popup-box" v-if="$store.state.newsDetailShow">
      <NewDtail :closeCall="closeAllPopup" :dtailNews="dtailNews"></NewDtail>
    </div>

    <div class="popup-box" v-if="logOutShow">
      <logOut :closeCall="closeAllPopup" :logout="logout"></logOut>
    </div>
    <div class="mask-module" v-if="filterShow" @click.stop="filterMaskHideCall"></div>

    <div class="renovate-popup" v-if="$store.state.needUpdate !== 'unwanted'">
      <RenovatePopup></RenovatePopup>
    </div>
  </div>
</template>

<script>
  import Index from "../../components/home/Index";
  import More from "../../components/home/More";
  import Space from "../../components/home/Space";
  import Welfar from "../../components/home/Welfar";

  import CircleOperation from '../../components/home/index/CircleOperation'
  import CallService from '../../components/home/index/CallService'
  import SearchPopup from '../../components/home/index/SearchPopup'
  import NewDtail from '../../components/home/index/NewDtail'
  import logOut from "../../v-activity/more/logout/logOut.vue"

  import RenovatePopup from "../home/renovate/RenovatePopup.vue"
  export default {
    data() {
      return {
        user: this.$store.state.user,
        tabNavigation: this.$store.state.tabNavigation,
        homeSpaceI: this.$store.state.tabNavigation.homeSpace[0],
        homeSpaceA: this.$store.state.tabNavigation.homeSpace[2],
        keyboardHeight: this.$store.state.keyboardHeight,
        tabsStyle: {
          index: {
            text: "首页",
            ico: require("../../assets/svg/home/index.svg"),
            active: require("../../assets/svg/home/index-active.svg")
          },
          space: {
            text: "空间",
            ico: require("../../assets/svg/home/space.svg"),
            active: require("../../assets/svg/home/space-active.svg")
          },
          welfare: {
            text: "专享",
            ico: require("../../assets/svg/home/welfare.svg"),
            active: require("../../assets/svg/home/welfare-active.svg")
          },
          more: {
            text: "更多",
            ico: require("../../assets/svg/home/more.svg"),
            active: require("../../assets/svg/home/more-active.svg")
          }
        },
        callServiceShow: false,
        circleOperationShow: false,
        delCallBack: null,
        reportCallback: null,
        isCreator: false,
        searchPopupShow: false,
        logOutShow: false,
        dtailNews: null,
        filterShow:false,
        temps:this.$store.state.temps
      }
    },
    components: {
      Index,
      More,
      Space,
      Welfar,
      CallService,
      CircleOperation,
      SearchPopup,
      NewDtail,
      logOut,
      RenovatePopup
    },
    watch:{
      'homeSpaceI.active'(){
          this.temps.homeMaskHide();
      },
      'homeSpaceA.active'(){
          this.temps.homeMaskHide();
      }
    },
    methods: {
      clickTab(tab) {
        if(tab.key === "more" && !this.user.isLogin){
          this.$router.openActivity('login');
          return;
        }
        this.tabNavigation.home.forEach(tabI => {
          tabI.active = false
        });
        tab.active = true;
      },
      closeAllPopup() {
        this.callServiceShow = false;
        this.circleOperationShow = false;
        this.searchPopupShow = false;
        this.$store.state.newsDetailShow = false;
        this.logOutShow = false;
      },
      openCallService() {
        if (this.user.isLogin) {
          this.callServiceShow = true;
        } else {
          this.$router.openActivity('login');
        }
      },
      openCircleOperation(isCreator, delCallBack, reportCallback) {
        this.isCreator = isCreator;
        this.delCallBack = delCallBack;
        this.reportCallback = reportCallback;
        this.circleOperationShow = true;
      },
      openSearchPopup() {
        this.searchPopupShow = true;
      },
      openNewsDetail(news) {
        this.dtailNews = news;
        this.$store.state.newsDetailShow = true;
      },
      logout() {
        let that = this;
        //如果用户的unionid存在，说明该用户之前用微信登录过，退出后就先注销微信登录
        if (this.user.unionid) {
          this.user.authLogoutAll();
        }
        this.user.httpLogout(function () {
          that.$store.state.plus.nativeUI.toast("已成功退出！",{duration:"short"});
          that.$router.openActivity('login');
        });
      },
      openLogOut() {
        this.logOutShow = true;
      },
      filterMaskHideCall(){
        this.filterShow = false;
        this.temps.homeMaskHide();
        this.temps.dataFilterHide()
      }
    },
    mounted(){
      let that = this;
      this.temps.dataFilterShow = function () {
        that.filterShow = true;
      };
      this.temps.homeMaskHide = function () {
        that.filterShow = false;
      };
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .app-home {
    .mask-module{
      height: 100vh;
      width: 100vw;
      position: fixed;
      top:415px;
      left: 0;
      background: rgba(0,0,0,.45);
    }
    height: 100%;
    .home-content {

    }
    .home-tab {
      background: white;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      padding: 6px 12px 5px 12px;
      border-top: 1px solid #EDEFEF;
      .tab-item {
        width: 25%;
        display: inline-block;
        .tab-item-text {
          margin-top: 5px;
          font-size: 10px;
          line-height: 10px;
        }
        .tab-item-ico {
          height: 22px;
          width: 22px;
          margin: 0 auto;
        }
      }

    }
    @media (device-width: 375px) and (device-height: 812px){
      .home-tab{
        padding-bottom: 30px;
      }
    }
    @media (device-width: 414px) and (device-height: 896px){
      .home-tab{
        padding-bottom: 30px;
      }
    }
    .popup-box {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
