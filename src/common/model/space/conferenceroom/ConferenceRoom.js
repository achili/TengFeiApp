import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import Tank from '../../tank/Tank'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {simpleDateTime, simpleMinute, str2Date} from "../../../filter/time";


let ServicesMap = {
  "LED":{
    val: "LED",
    name:"两个带有VGA/HDMI连接口的84\" LED"
  },
  "LED65":{
    val: "LED65",
    name:"一个带有VGA/HDMI连接口的65\" LED"
  },
  "LED55":{
    val: "LED55",
    name:"一个带有VGA/HDMI连接口的55\" LED"
  },
  "DEMONSTRATION":{
    val: "DEMONSTRATION",
    name:"无线演示设备"
  },
  "VIDEO":{
    val: "VIDEO",
    name:"企业级视频会议"
  },
  "MICROPHONE":{
    val: "MICROPHONE",
    name:"企业级桌面话筒"
  },
  "HORN":{
    val: "HORN",
    name:"顶置式喇叭"
  },
  "WIFI":{
    val: "WIFI",
    name:"高速WIFI"
  },
  "STATIONERY":{
    val: "STATIONERY",
    name:"可移动白板，带马克笔和文具"
  },
  "TEA":{
    val: "TEA",
    name:"免费咖啡/茶水"
  },
  "PROJECTION":{
    val: "PROJECTION",
    name:"投影仪及幕布"
  }
};
let CapacityMap = {
  MINIMUM:{
    value: "MINIMUM",
    name:"1-6人"
  },
  SECONDARY:{
    value: "SECONDARY",
    name:"6-10人"
  },
  SPACIOUS:{
    value: "SPACIOUS",
    name:"10人以上"
  }
}

export default class ConferenceRoom extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.name = "会议室";
    this.introduce = "详细说明";
    this.capacity = CapacityMap.MINIMUM.value;
    this.price = "0";
    this.vipPrice = "0";
    this.services = [];

    this.posters = [];

    this.address = "";

    //ui
    this.timeInfo = {
      startTime: 0,
      endTime: 0,
      occupyList: []
    }
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.DATE_TIME_SELECTION, '发布日期', 'createTime'),
      new Filter(Filter.prototype.Type.INPUT, '申请日期', 'date'),
      new Filter(Filter.prototype.Type.SELECTION, '容纳人数', 'capacityType', ConferenceRoom.prototype.CapacityList),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.SORT,'空间地点','spaceRegionalUuid')
    ]
  };

  getTAG() {
    return "ConferenceRoom"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
    this.renderList('posters', Tank);
    if(!(this.services instanceof Array)) {
      this.services = JSON.parse( this.services );
    }
  }
  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/conference/room/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID",true, true, "uuid", "conferenceRoom.uuid"),
        new FormItem(FormItem.prototype.Type.DATE, "开始时间",true, true, "startTime", "conferenceRoom.startTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.DATE, "结束时间",true, true, "endTime", "conferenceRoom.endTime", null,{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "会议室价格",true, true, "price", "conferenceRoom.price", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "会议室地点", true,true, "location", "conferenceRoom.location", null,{}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "要求备注",true, false, "remarks", "conferenceRoom.remarks", null,{height: "300px"})
      ]
    );
  };

  httpDetailByDate(date, uuid, successCallback, errorCallback) {
    let that = this;
    if (!this.uuid) {
      this.errorMessage = '没有详情！';
      this.defaultErrorHandler(this.errorMessage, errorCallback);
      return
    }
    this.detailLoading = true;
    this.httpGet("/conference/room/detail/by/date", {
      uuid: this.uuid,
      date: simpleDateTime(date),
      tudingUuid: uuid
    }, function (response) {
      that.detailLoading = false;
      that.render(response.data.data);
      successCallback && successCallback(response)
    }, function (response) {
      that.detailLoading = false;
      if (typeof errorCallback === 'function') {
        errorCallback()
      } else {
        //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
        that.defaultErrorHandler(response)
      }
    })
  }
}
ConferenceRoom.registerEnum("Capacity", CapacityMap);
ConferenceRoom.registerEnum("Services", ServicesMap);

