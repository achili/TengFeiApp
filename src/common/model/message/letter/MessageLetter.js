import Vue from "Vue";

import BaseEntity from '../../_base/BaseEntity'
import User from "../../user/User";
import Filter from "../../_base/Filter";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../util/Utils";
import Tank from "../../tank/Tank";
import store from "../../../../_store";
import {str2Date} from "../../../filter/time";

export default class MessageLetter extends BaseEntity {

  constructor(args) {
    super(args);
    this.sender = new User();
    this.receiver = new User();
    this.content = null;
    this.read = null;
  }

  static URL_READ = "/message/letter/read";
  static URL_UNREAD = "/message/letter/unread";
  static URL_ALL_MESSAGE = "/message/letter/all/message";
  static URL_REQUEST_MANANGER = "/message/letter/request/manager";
  static URL_SEND_MESSAGE ="/message/letter/send/message";

  getFilters() {
    return [
      new Filter("SORT", "发送时间", "orderCreateTime"),
      new Filter("CHECK", "读取信息状态", "read"),
      new Filter("SORT", "发送者", "sender", null, User, false),
      new Filter("SORT", "接收者", "receiver", null, User, false)
    ];
  };

  getTAG() {
    return "MessageLetter";
  }

  render(obj) {
    super.render(obj);
    this.renderEntity("avatar", Tank);
    this.renderEntity("sender", User);
    this.renderEntity("receiver", User);
    this.renderList('data', this.Clazz)
  };

  //标记或者已读或未读
  httpRead = function (senderUuid, successCallback, errorCallback) {

    let form = {
      sender: senderUuid
    };
    this.httpPost(MessageLetter.URL_READ, form, successCallback, errorCallback);

  };

  httpUnRead = function (successCallback, errorCallback) {
    this.httpPost(MessageLetter.URL_UNREAD, {}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpAllMessage = function (successCallback, errorCallback) {
    this.httpPost(MessageLetter.URL_ALL_MESSAGE, {spaceRegionalUuid: store.state.currentSpaceRegionalUuid}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpRequestManager = function (successCallback, errorCallback) {
    this.httpPost(MessageLetter.URL_REQUEST_MANANGER, {}, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  };

  static saveMessageToLocalStorage = function () {
    saveToLocalStorage('MessageLetters' + store.state.user.uuid, JSON.stringify(store.state.allMessage));
  };

  static startMessageRequire() {
    let temp = new MessageLetter();

    setInterval(function () {
      if (!store.state.user.isLogin) {
        return;
      }
      let currentUserUuid = store.state.user.uuid;
      temp.httpAllMessage(function (response) {
        try {
          let res = response.data.data;
          store.state.isAssociator = res.isAssociator;
          //res = {count, allMessageList: [MessageLetter,...]}
          store.state.unReadMessageCount = res.count;
          store.state.circleMessage = res.circleMessage;
          res.allMessageList.forEach(messageLetter => {
            if (!store.state.allMessage[messageLetter.senderUuid]) {
              Vue.set(store.state.allMessage, messageLetter.senderUuid, []);
            }
            let localMessage = {
              msgUuid: messageLetter.uuid,
              content: messageLetter.content,
              createTime: str2Date(messageLetter.createTime),
              read: false
            };
            if(store.state.allMessage[messageLetter.senderUuid].length > 0) {
              let lastMsg = store.state.allMessage[messageLetter.senderUuid][store.state.allMessage[messageLetter.senderUuid].length - 1];
              if(lastMsg.createTime.getTime() < localMessage.createTime.getTime()) {
                store.state.allMessage[messageLetter.senderUuid].push(localMessage);
              }
            } else {
              store.state.allMessage[messageLetter.senderUuid].push(localMessage);
            }
          });
          MessageLetter.saveMessageToLocalStorage();
        } catch (e) {
          console.error("轮询未读消息失败！55555");
          removeLocalStorage('MessageLetters' + currentUserUuid)
        }
      }, function () {
        console.error("轮询未读消息失败！")
      });
    }, 20000)
  }

  renderMessageFromLocalStorage = function (currentUserUuid) {
    let json = readLocalStorage('MessageLetters' + currentUserUuid);
    if(!json || json === "[]") {
      return {};
    }
    let localMessageLetters = JSON.parse(readLocalStorage('MessageLetters' + currentUserUuid));

    Object.keys(localMessageLetters).forEach(key => {
      localMessageLetters[key].forEach(localMessage => {
        localMessage.createTime =  str2Date(localMessage.createTime);
      });
    });

    return localMessageLetters;
  };

  httpSendMessage (receiverUuid, successCallback, errorCallback) {
    let that = this;
    let form = {
      content: this.content,
      receiver: receiverUuid
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(MessageLetter.URL_SEND_MESSAGE, form,function (response) {
      if (!store.state.allMessage[receiverUuid]) {
        Vue.set(store.state.allMessage, receiverUuid, []);
      }
      let localMessage = {
        msgUuid: response.data.data.uuid,
        content: that.content,
        createTime: str2Date(response.data.data.createTime),
        //是否是自己发送的信息
        read: true
      };
      store.state.allMessage[receiverUuid].push(localMessage);
      MessageLetter.saveMessageToLocalStorage();
      successCallback && successCallback(response);
    } , errorCallback);

  };

}

