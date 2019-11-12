import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import Tank from '../../tank/Tank'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {filterDay, getDayStart, simpleDateTime, str2Date} from "../../../filter/time";
import ConferenceRoom from "./ConferenceRoom";

let Status = {
  NOT_RECEIVE:'NOT_RECEIVE',
  RECEIVE:'RECEIVE',
  BE_OVERDUE:'BE_OVERDUE',
  WAIT_PAY:'WAIT_PAY',
  HAVE_PAY:'HAVE_PAY',
  REFUND:'REFUND',
  CANCEL:'CANCEL'
};
let StatusMap = {
  NOT_RECEIVE:{
    value: "NOT_RECEIVE",
    name:"未处理",
    style: "danger"
  },
  RECEIVE:{
    value: "RECEIVE",
    name:"已处理",
    style: "success"
  },
  BE_OVERDUE:{
    value: "BE_OVERDUE",
    name:"已过期",
    style: "danger"
  },

  WAIT_PAY:{
    value: "WAIT_PAY",
    name:"待支付",
    style: "danger"
  },
  HAVE_PAY:{
    value: "HAVE_PAY",
    name:"已支付",
    style: "success"
  },
  REFUND:{
    value: "REFUND",
    name:"已退款",
    style: "success"
  },
  CANCEL:{
    value: "CANCEL",
    name:"已取消",
    style: "success"
  }
};

export default class SpaceReservation extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.conferenceRoom = new ConferenceRoom();
    this.startTime = new Date();
    this.endTime = new Date();

    //价格
    this.price = "￥0";
    this.location = "";
    this.remarks = "";
    //ui
    this.timeInfo = {
      startTime: 0,
      endTime: 0,
      occupyList: []
    };
    this.no = "";

    this.payType = null;

    this.userType = null;
    this.type = null;

  }

  static HTTP_PAY_URL = "/space/reservation/create/meeting/pay";
  static WE_CHAT_PAY_URL = "/space/reservation/create/wechat/pay";
  static QUERY_PAY_STATE_URL = "/space/reservation/query/pay/state";
  static HTTP_MANAGE_MEETING = "/space/reservation/create/manage/meeting";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.MULTI_SELECTION, "状态", "statuses", this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, "使用日期", "orderStartTime"),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.CHECK,"两月",'isTwo'),
      new Filter(Filter.prototype.Type.INPUT, "用户", "user")
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('conferenceRoom', ConferenceRoom);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
  }
  getTAG() {
    return "SpaceReservation"
  }

  getHttpCreate() {
    let endTimeFormItem;
    let startTimeFormItem = new FormItem(FormItem.prototype.Type.DATE, "选择日期",true, true, "startTime", "spaceReservation.startTime",
      new Date(), {endTimeFormItem: endTimeFormItem}, function () {
        let dateLong = this.rule.endTimeFormItem.value.startTime + getDayStart(this.value).getTime();
        return simpleDateTime(new Date(dateLong));
      });
    endTimeFormItem = new FormItem(FormItem.prototype.Type.SLIDER_TIME, "预定时间",true, true, "endTime", "spaceReservation.timeInfo",
      {startTime: 0, endTime: 0, occupyList: []}, {startTimeFormItem: startTimeFormItem}, function () {
        let dateLong = this.value.endTime + getDayStart(this.rule.startTimeFormItem.value).getTime();
        return simpleDateTime(new Date(dateLong));
      });
    startTimeFormItem.rule.endTimeFormItem = endTimeFormItem;

    return new HttpForm(HttpForm.prototype.Type.CUSTOM, SpaceReservation.HTTP_PAY_URL,
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID",true, true, "uuid", "spaceReservation.uuid"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "spaceRegional",true, true, "spaceRegional", "spaceReservation.spaceRegional"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "预定的办公室",true, true, "conferenceRoom", "spaceReservation.conferenceRoom",
          new ConferenceRoom(), {}, FormItem.defaultEntityBeforeSubmit),
        startTimeFormItem,
        endTimeFormItem,
        new FormItem(FormItem.prototype.Type.INPUT, "会议室价格",true, true, "price", "spaceReservation.price", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.INPUT, "会议室地点",true, true, "location", "spaceReservation.location", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.INPUT, "要求备注",true, false, "remarks", "spaceReservation.remarks", null,{})
      ]
    );
  };

  getTimeLength(){
    let timeLength;
    let newStartTime = this.startTime.getTime() / (1000 * 60 * 60) + 8;
    let newEndTime = this.endTime.getTime() / (1000 * 60 * 60) + 8;

    timeLength =  ( newEndTime - newStartTime ) % 24;
    return timeLength;

  }

  httpPay(successCallback, failureCallback) {
    let form = {
      uuid: this.uuid,
      conferenceRoom: this.conferenceRoom.uuid,
      startTime: simpleDateTime(this.startTime),
      endTime: simpleDateTime(this.endTime),
      price: this.price,
      remarks: this.remarks,
      location: this.location,
      payType: this.payType,
      userType:this.userType
    };
    let that = this;
    this.httpPost(SpaceReservation.HTTP_PAY_URL, form, function (res) {
      that.uuid = res.data.data.spaceReservation.uuid
      successCallback && successCallback(res.data.data.financeBillReceipt);
    }, function () {
      failureCallback && failureCallback();
    });
  }

  httpManageMeeting(successCallback, failureCallback) {
    let form = {
      uuid: this.uuid,
      conferenceRoom: this.conferenceRoom.uuid,
      startTime: simpleDateTime(this.startTime),
      endTime: simpleDateTime(this.endTime),
      price: this.price,
      remarks: this.remarks,
      location: this.location,
      payType: this.payType,
      userType:this.userType
    };
    let that = this;
    this.httpPost(SpaceReservation.HTTP_MANAGE_MEETING, form, function (res) {
      successCallback && successCallback(res);
    }, function () {
      failureCallback && failureCallback();
    });
  }

  httWeChatPay(params,successCallback, failureCallback) {
    this.httpPost(SpaceReservation.WE_CHAT_PAY_URL, params, function (res) {
      successCallback && successCallback(res);
    }, function () {
      failureCallback && failureCallback();
    });
  }

  httpQueryPayState(successCallback, failureCallback) {
    this.httpPost(SpaceReservation.QUERY_PAY_STATE_URL, {uuid: this.uuid}, function (res) {
      successCallback && successCallback(res.data.data.status);
    }, function () {
      failureCallback && failureCallback();
    });
  }

  getRemainingTime() {

    return 15 - Math.floor(((new Date()).getTime() - this.createTime.getTime()) / (60 * 1000));
  }
}
SpaceReservation.prototype.Status = Status;
SpaceReservation.prototype.StatusMap = StatusMap;
