import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import Tank from '../../tank/Tank'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {getDayStart, simpleDate, simpleDateTime, simpleMinute, str2Date, timeTime} from "../../../filter/time";


export default class SiteReservation extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.address = null;
    this.nickname = null;
    this.phone = null;
    this.startTime = new Date();
    this.characteristic = [];
    this.remarks = null;
    this.status = null;
    this.spaceRegional = null;
    //临时字段
    this.dayTime = "6:30"

  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,"已删除",'deleted'),
      new Filter(Filter.prototype.Type.INPUT, "用户", "user")
    ]
  };
  getTAG() {
    return "SiteReservation"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('startTime', Date);
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
  }

  getHttpCreate() {
    let dayTimeFormItem = new FormItem(FormItem.prototype.Type.TIME, "使用时间", true,true, "dayTime", "siteReservation.dayTime", "9:00",{},function () {
      return null;
    });
    let startTimeFormItem = new FormItem(FormItem.prototype.Type.DATE, "使用日期", true,true, "startTime", "siteReservation.startTime", new Date(),
      {dayTimeFormItem: dayTimeFormItem},
      function () {
        let arr = (this.rule.dayTimeFormItem.value).split(':');
        return simpleDateTime(new Date(getDayStart(this.value).getTime() + (Number)(arr[0]) * 60 * 60 * 1000 + (Number)(arr[1]) * 60 * 1000));
      }
    );
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/site/reservation/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID",true, true, "uuid", "siteReservation.uuid"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "spaceRegional",true, true, "spaceRegional", "siteReservation.spaceRegional"),
        startTimeFormItem,
        dayTimeFormItem,
        new FormItem(FormItem.prototype.Type.INPUT, "场地地点",true, true, "address", "siteReservation.address", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.INPUT, "要求备注",true, false, "remarks", "siteReservation.remarks", null,{}),
        new FormItem(FormItem.prototype.Type.REMINDER, "友情提示",false, true, "text", "siteReservation.text", null,{})
      ]
    );
  };

}

