import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {simpleDate, simpleDateTime, simpleTime, str2Date, getDayStart, timeTime} from "../../../filter/time";
let CharacteristicMap = {
  "MOBILE_STATION":{
    val: "移动办公桌",
    name:"移动办公桌"
  },
  "PRIVATE_OFFICE":{
    val: "独立办公室",
    name:"独立办公室"
  },
  "ACTIVE_SITE":{
    val: "活动场地",
    name:"活动场地"
  },
  "CONFERENCE_ROOM":{
    val: "会议室",
    name:"会议室"
  }
};
export default class BookTour extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.address = "";
    this.name = null;
    this.phone = null;
    this.startTime = new Date();
    this.characteristic = [];
    this.remark = null;

    //ui
    this.dayTime = "9:00";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.INPUT, "用户", "user")
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('visitTime', Date);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
    this.characteristic = JSON.parse( this.characteristic );

    this.dayTime = timeTime(this.startTime);
  }
  getTAG(){
    return "BookTour"
  }
  getHttpCreate() {
    let dayTimeFormItem = new FormItem(FormItem.prototype.Type.TIME, "参观时间", true,true, "dayTime", "bookTour.dayTime", "9:00",{},function () {
      return null;
    });
    let startTimeFormItem = new FormItem(FormItem.prototype.Type.DATE, "选择日期", true,true, "startTime", "bookTour.startTime", new Date(),
      {dayTimeFormItem: dayTimeFormItem},
      function () {
        let arr = (this.rule.dayTimeFormItem.value).split(':');
        return simpleDateTime(new Date(getDayStart(this.value).getTime() + (Number)(arr[0]) * 60 * 60 * 1000 + (Number)(arr[1]) * 60 * 1000));
      }
    );
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/book/tour/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID",true, true, "uuid", "bookTour.uuid"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "spaceRegional",true, true, "spaceRegional", "bookTour.spaceRegional"),
        new FormItem(FormItem.prototype.Type.INPUT, "空间地点", true,true, "address", "bookTour.address", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.INPUT, "姓名",true, true, "name", "bookTour.name", null,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "电话", true,true, "phone", "bookTour.phone", null,{readonly: "readonly"}),
        startTimeFormItem,
        dayTimeFormItem,
        new FormItem(FormItem.prototype.Type.CHECKBOX,"我感兴趣的是(可多选)",true,true,"characteristic","bookTour.characteristic",[], {
          list: BookTour.prototype.CharacteristicList},FormItem.jsonTransformation  ),
        new FormItem(FormItem.prototype.Type.INPUT, "要求备注",true, false, "remarks", "bookTour.remarks", null,{placeholder:"填写备注信息..."})
      ]
    );
  };


}
BookTour.registerEnum("Characteristic", CharacteristicMap);
