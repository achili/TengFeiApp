import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import Tank from '../../tank/Tank'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {simpleDate, simpleMinute, simpleDateTime, str2Date} from "../../../filter/time";


let ServicesMap = {
  "LED":{
    val: "LED",
    name:"两个带有VGA/HDMI连接口的84\" LED",
    ico: require("../../../../assets/svg/space/severs1.svg")
  },
  "LED65":{
    val: "LED65",
    name:"一个带有VGA/HDMI连接口的65\" LED",
    ico: require("../../../../assets/svg/space/severs1.svg")
  },
  "LED55":{
    val: "LED55",
    name:"一个带有VGA/HDMI连接口的55\" LED",
    ico: require("../../../../assets/svg/space/severs1.svg")
  },
  "DEMONSTRATION":{
    val: "DEMONSTRATION",
    name:"无线演示设备",
    ico: require("../../../../assets/svg/space/severs3.svg")
  },
  "VIDEO":{
    val: "VIDEO",
    name:"企业级视频会议",
    ico: require("../../../../assets/svg/space/severs4.svg")
  },
  "MICROPHONE":{
    val: "MICROPHONE",
    name:"企业级桌面话筒",
    ico: require("../../../../assets/svg/space/severs5.svg")
  },
  "HORN":{
    val: "HORN",
    name:"顶置式喇叭",
    ico: require("../../../../assets/svg/space/severs6.svg")
  },
  "WIFI":{
    val: "WIFI",
    name:"高速WIFI",
    ico: require("../../../../assets/svg/space/severs7.svg")
  },
  "STATIONERY":{
    val: "STATIONERY",
    name:"可移动白板，带马克笔和文具",
    ico: require("../../../../assets/svg/space/severs8.svg")
  },
  "TEA":{
    val: "TEA",
    name:"免费咖啡/茶水",
    ico: require("../../../../assets/svg/space/severs9.svg")
  },
  "TIME":{
    val: "TIME",
    name:"时间",
    ico: require("../../../../assets/svg/space/severs10.svg")
  },
  "LIGHTING":{
    val: "LIGHTING",
    name:"灯光",
    ico: require("../../../../assets/svg/space/severs11.svg")
  },
  "PROJECTION":{
    val: "PROJECTION",
    name:"投影仪及幕布",
    ico: require("../../../../assets/svg/space/severs12.svg")
  }
};

export default class ActiveSite extends BaseEntity {

  constructor(args) {
    super(args);
    //会议室类型
    this.name = "默认类型";
    this.creator = new User();
    this.introduce = "详细说明";
    //服务
    this.services = [];
    //封面图片
    this.posterTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //内容
    this.address = "详细地址";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.SORT,'空间地点','spaceRegionalUuid')
    ]
  };
  getTAG() {
    return "ActiveSite"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('poster', Tank);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
    this.services = JSON.parse( this.services );
  }
  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/active/site/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID",true, true, "uuid", "activeSite.uuid"),
        new FormItem(FormItem.prototype.Type.DATE, "使用日期", true,true, "startTime", "activeSite.startTime", new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.TIME, "使用时间", true,true, "endTime", "activeSite.endTime", "9:00",{},function () {
          return simpleMinute(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "场地价格", true,true, "price", "activeSite.price", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "场地地点",true, true, "address", "activeSite.address", null,{}),
        new FormItem(FormItem.prototype.Type.TEXT_AREA, "要求备注",true, false, "remarks", "activeSite.remarks", null,{}),
        new FormItem(FormItem.prototype.Type.REMINDER, "友情提示",false, true, "text", "activeSite.text", null,{})
      ]
    );
  };

}

ActiveSite.registerEnum("Services", ServicesMap);
