import Vue from 'vue'
import Vuex from 'vuex'

import plus from "./plus"
import User from "../common/model/user/User";
import Pager from "../common/model/_base/Pager";
import CommunityPosts from "../common/model/community/CommunityPosts";
import CommunityNews from "../common/model/community/CommunityNews";
import CommunityEvents from "../common/model/community/CommunityEvents";
import Privilege from "../common/model/privilege/Privilege";
import MessageLetter from "../common/model/message/letter/MessageLetter";
import ConferenceRoom from "../common/model/space/conferenceroom/ConferenceRoom";
import ActiveSite from "../common/model/space/activesite/ActiveSite";
import Appsettings from "../common/model/appsettings/Appsettings";
import SpaceRegional from "../common/model/space/regional/SpaceRegional";

Vue.use(Vuex);

const state = {
  user: new User(),
  spaceRegionalList: [],
  currentSpaceRegionalAddress:'杭州空间',
  currentSpaceRegionalUuid:'fff031b9-c3f4-4c53-ae9f-64d0d9ee83af',
  appSettingList:new Appsettings(),
  //支付
    //支付类型
  PaymentTerms:"支付宝",
  typeModule:"QuickIntoPay",
  //配置
  debug: false,
  version: '8.4',
  kernelVersion: '6',
  //unwanted 是不需要更新 need 是需要更新 force 是强制更新
  needUpdate: "unwanted",
  downloadUrl: null,
  // host: "https://fwpmanage.ascendas.mobi/api",
  host: "http://nb3.com/api",
  domain: "https://fwp.allready.cc",
  plus: plus,
  temps: {},
  isAssociator: false,
  XiaoQiaoTelephone: "18621996313",
  messageLetter: new MessageLetter(),
  //未读消息的数量
  unReadMessageCount: 0,
  //所有消息，形式： {senderUuid: [{msgUuid,content,createTime,read}...], senderUuid: [{...}...]....}
  allMessage: {},

  circleMessage: false,

  roomTime: new Date(),

  //以下是状态变化
  //窗体列表
  keyboardHeight: 0,

  activityList: [],
  newsDetailShow: false,
  newsDetailShowFunction: null,
  tabNavigation: {
    home: [
      {active: true, key: "index"},{active: false, key: "space"},{active: false, key: "welfare"},{active: false, key: "more"}
    ],
    homeIndex: [
      {active: true, key: "circle"},{active: false, key: "activity"},{active: false, key: "news"}
    ],
    homeSpace: [
      {active: true, key: "introduction"},{active: false, key: "conferenceRoom"},{active: false, key: "activeSite"}
    ],
    homeWelfare: [
      {active: true, key: "corporate"},{active: false, key: "member"}
    ]
  },


  //以下是数据缓存
  activityPager: new Pager(CommunityEvents),
  circlePager: new Pager(CommunityPosts),
  circleTopPager: new Pager(CommunityPosts),
  newsPager: new Pager(CommunityNews),
  conferencePage:new Pager(ConferenceRoom),
  activePage:new Pager(ActiveSite),
  appSettings:new Appsettings(),
  splash:new Appsettings(),

  welfarPager: new Pager(Privilege),
   //weChat配置
  auths: null,
  shares: null,
  sharewx: null,

  SuZhouPayConfig: {
    msgId: 5371,
    //消息来源
    msgSrc: "WWW.XQTENGF.COM",
    //商户号
    midAli: "898310165130871",
    midWeChat: "898310165130945",
    midCard: "898310165130871",
    //终端号
    tidAli: "20072071",
    tidWeChat: "20092037",
    tidCard: "20072071",
    //业务类型
    instMid: "H5DEFAULT",
    ////////////////////////////////////////////
    MD5key: "AM2e5y8dBT62ry6apzNRdjHenSS7n8HB8sJ3hR653MCGP7hF"
  },

  HangZhouPayConfig: {
    msgId: 5371,
    //消息来源
    msgSrc: "WWW.XQTENGF.COM",
    //商户号
    midAli: "898310165130939",
    midWeChat: "898310165130945",
    midCard: "898310165130939",
    //终端号
    tidAli: "20079183",
    tidWeChat: "20092037",
    tidCard: "20079183",
    //业务类型
    instMid: "H5DEFAULT",
    ////////////////////////////////////////////
    MD5key: "AM2e5y8dBT62ry6apzNRdjHenSS7n8HB8sJ3hR653MCGP7hF"
  },

  openUpdate: function (url, mandatory) {

  }
};

//从本地存储中读取用户信息。
state.user.renderFromLocalStorage();
MessageLetter.startMessageRequire();
//监听plusready 事件，装配plus
console.log("plus正在加载...");
document.addEventListener("plusready",function () {
  console.log("plus加载完成！");
  state.plus = window.plus;
  // 隐藏滚动条
  state.plus.webview.currentWebview().setStyle({scrollIndicator:'none'});

  //微信授权登录
  state.plus.oauth.getServices(function (services) {
    state.auths = services;
  }, function (e) {
    state.plus.nativeUI.toast("获取分享服务列表失败: " + e.message + " - " + e.code,{duration:"short"});
  });
  //系统分享功能
  state.plus.share.getServices(function (s) {
    state.shares = s;
    for (let i in s) {
      if (s[i].id === 'weixin') {
        state.sharewx = s[i];
      }
    }
  }, function (e) {
    state.plus.nativeUI.toast("获取分享服务列表失败: " + e.message,{duration:"short"});
  })
}, false);

export default new Vuex.Store({
  state
})
