import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import {simpleDateTime, str2Date, timeTime} from "../../filter/time";
import store from "../../../_store";

export default class InviteVisitor extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.inviteName = null;
    this.name = null;
    this.invitingTime = new Date();
    this.accessTime = new Date();
    this.visitorsNum = 0;
    this.remark = null;
    this.startTime = new Date();
    this.endTime = new Date();
    this.dayTime = [new Date(), new Date()];
    this.spaceRegional = null;
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,'已删除','deleted'),
      new Filter(Filter.prototype.Type.INPUT, "用户", "user")
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('invitingTime', Date);
    this.renderEntity('accessTime', Date);
    this.startTime = str2Date(this.invitingTime);
    this.endTime = str2Date(this.accessTime);

    this.dayTime = [this.startTime, this.endTime];
  }

  getTAG(){
    return "InviteVisitor"
  }

  validate(){
    if(!this.name) {
      store.state.plus.nativeUI.toast("邀请人姓名不能为空！",{duration:"short"});
      return;
    }

    if(!this.invitingTime) {
      store.state.plus.nativeUI.toast("邀请日期不能为空！",{duration:"short"});
      return;
    }

    if(!this.accessTime) {
      store.state.plus.nativeUI.toast("访问时间不能为空！",{duration:"short"});
      return;
    }

    if(!this.visitorsNum) {
      store.state.plus.nativeUI.toast("访问人数不能为空！",{duration:"short"});
      return;
    }

    if (this.visitorsNum > 20) {
      store.state.plus.nativeUI.toast("访问人数不能超过20人！",{duration:"short"});
      return;
    }

    return true;
  }

  httpCreate(successCallback, errorCallback){
    let that = this;
    let form = {
      inviteName:this.inviteName,
      name: this.name,
      invitingTime: simpleDateTime(this.invitingTime),
      accessTime: simpleDateTime(this.accessTime),
      visitorsNum: this.visitorsNum,
      remark: this.remark
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpSave( form, successCallback, errorCallback);
  }

  httpSave(startTime, endTime, successCallback, errorCallback) {
    let that = this;
    //验证是否装填好
    if (!this.validate()) {
      return
    }
    let form = {
      inviteName:this.inviteName,
      name: this.name,
      invitingTime: startTime,
      accessTime: endTime,
      visitorsNum: this.visitorsNum,
      remark: this.remark,
      spaceRegional:this.spaceRegional
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    super.httpSave(form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  shareWeiXinMessage(uuid) {
    store.state.sharewx.send( {content: "邀请访客函", href: store.state.domain + '/share/invite/visitor/detail?uuid=' + uuid, extra: {scene: "WXSceneSession"}}, function () {
      store.state.plus.nativeUI.toast("分享成功！",{duration:"short"});
    }, function (e) {
      store.state.plus.nativeUI.toast("分享失败: ",{duration:"short"});
    })
  }

  shareSystem(uuid) {
    store.state.plus.share.sendWithSystem({content: '邀请访客函',href: store.state.domain + '/share/invite/visitor/detail?uuid=' + uuid}, function () {
      store.state.plus.nativeUI.toast("分享成功！",{duration:"short"});
    }, function (e) {
      store.state.plus.nativeUI.toast("分享失败! ",{duration:"short"});
    })
  }
}
