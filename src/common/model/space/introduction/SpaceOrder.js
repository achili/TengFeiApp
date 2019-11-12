import BaseEntity from '../../_base/BaseEntity'
import Filter from '../../_base/Filter'
import User from '../../user/User'
import FormItem from "../../_base/FormItem";
import HttpForm from "../../_base/HttpForm";
import {addDate, simpleDate, simpleDateTime, str2Date} from "../../../filter/time";
import Appsettings from "../../appsettings/Appsettings";

let CharacteristicMap = {
  "MOBILE_STATION":{
    value: "MOBILE_STATION",
    val: "MOBILE_STATION",
    name:"移动办公桌"
  },
  "INDEPENDENT_SPACE":{
    value: "INDEPENDENT_SPACE",
    val: "INDEPENDENT_SPACE",
    name:"独立办公室"
  }
};
let AttributeInheritMap = {
  "SOUTH":{
    value:"SOUTH",
    val:"SOUTH",
    name:"朝南"
  },
  "BESIDE_THE_WINDOW":{
    value:"BESIDE_THE_WINDOW",
    val:"BESIDE_THE_WINDOW",
    name:"朝北"
  },
  "OFFICE_SUPPLIES":{
    value:"OFFICE_SUPPLIES",
    val:"OFFICE_SUPPLIES",
    name:"靠窗"
  },
  "QUIET":{
    value:"QUIET",
    val:"QUIET",
    name:"带办公用品"
  },
  "NORTH":{
    value:"NORTH",
    val:"NORTH",
    name:"临近走道"
  },
  "NEAR_THE_AISLE":{
    value:"NEAR_THE_AISLE",
    val:"NEAR_THE_AISLE",
    name:"安静"
  }
};

export default class SpaceOrder extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.address = null;
    this.name = null;
    this.phone = null;
    this.startTime = addDate(new Date(),1);
    this.endTime = addDate(new Date(),1);
    this.characteristic = null;
    this.remarks = null;
    this.price = "￥0";
    this.number = 0;
    this.onePrice = null;
    this.unitPrice = {
      stationPrice:0,
      spacePrice:0
    };
    this.attribute = [];
    this.type = null;

    this.payType = null;


    //临时
    this.financePayNo = null
  }

  static WE_CHAT_PAY_URL = "/quick/order/create/wechat/pay";
  static QUERY_PAY_STATE_URL = "/quick/order/query/pay/state";

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
    this.startTime = str2Date(this.startTime);
    this.endTime = str2Date(this.endTime);
  }
  getTAG() {
    return "SpaceOrder"
  }
  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/space/order/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, true, "uuid", "spaceOrder.uuid"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "spaceRegional", true, true, "spaceRegional", "spaceOrder.spaceRegional"),
        new FormItem(FormItem.prototype.Type.INPUT, "空间地点", true,true, "name", "spaceOrder.name", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.SELECT,"空间类型",true,true,"characteristic","spaceOrder.characteristic", null, {
          list: SpaceOrder.prototype.CharacteristicList}),
        new FormItem(FormItem.prototype.Type.MOBILE_NUMBER, "工位数量", true,true, "number", "spaceOrder.number", 1,{}),
        new FormItem(FormItem.prototype.Type.INPUT, "价格", true,false, "price", "spaceOrder.price", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.DATE, "入驻日期",true, true, "startTime", "spaceOrder.startTime", new Date(),{},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "其他要求",true, false, "remarks", "spaceOrder.remarks", null,{placeholder:'如果您有其他特殊需求，请在此备注...'}),
        new FormItem(FormItem.prototype.Type.HIDDEN, "需求",true, false, "attribute", "spaceOrder.attribute", [],{list:SpaceOrder.prototype.AttributeList},FormItem.jsonTransformation),
        new FormItem(FormItem.prototype.Type.SPACE_ORDER, "友情提醒",false, true, "text", "spaceOrder.text", null,{})
      ]
    );
  };
  getHttpQuickIntoCreate() {
    let startTimeFormItem = new FormItem(FormItem.prototype.Type.DATE, "开始日期",true, true, "startTime", "spaceOrder.startTime",addDate(new Date(),1),{},function () {
      return simpleDateTime(this.value)
    });
    return new HttpForm(HttpForm.prototype.Type.CUSTOM, "/quick/order/quick/into/create",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, true, "uuid", "spaceOrder.uuid"),
        new FormItem(FormItem.prototype.Type.HIDDEN, "spaceRegional", true, true, "spaceRegional", "spaceRegionalInfo.uuid"),
        new FormItem(FormItem.prototype.Type.INPUT, "空间地点", true,true, "name", "spaceRegionalInfo.name", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.SELECT,"空间类型",true,true,"characteristic","spaceRegionalInfo.type", SpaceOrder.prototype.Characteristic.MOBILE_STATION, {
          list: SpaceOrder.prototype.CharacteristicList, disabled: true }),
        new FormItem(FormItem.prototype.Type.MOBILE_NUMBER, "工位数量", true,true, "number", "number.number", 1,{}),
        startTimeFormItem,
        new FormItem(FormItem.prototype.Type.DATE, "结束日期",true, true, "endTime", "spaceOrder.endTime",addDate(new Date(),1),{maxDay:28, startTime: startTimeFormItem},function () {
          return simpleDateTime(this.value)
        }),
        new FormItem(FormItem.prototype.Type.INPUT, "单价", true,false, "onePrice", "onePrice.onePrice", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.INPUT, "价格", true,false, "price", "spaceOrder.price", null,{readonly: "readonly"}),
        new FormItem(FormItem.prototype.Type.INPUT, "其他要求",true, false, "remarks", "spaceOrder.remarks", null,{placeholder:'填写其它要求...'}),
        new FormItem(FormItem.prototype.Type.CHECKBOX, "需求",true, false, "attribute", "spaceOrder.attribute", [],{list:SpaceOrder.prototype.AttributeList}),
        new FormItem(FormItem.prototype.Type.SPACE_ORDER, "友情提醒",false, true, "text", "spaceOrder.text", null,{})
      ]
    );
  };

  getHttpQuickIntoPay(appSettings ,successCallback, failureCallback) {
    let that = this;
    //前端数据校验
    if (!this.uuid) {
      this.errorMessage = '不能正常确认文件';
      return
    }
    //组装表单
    let form = {
      appSettings: appSettings
    };
    //发送
    this.httpPost("/quick/order/quick/into/create", form, function (response) {
      that.render(response.data.data);
      if (typeof successCallback === "function") {
        successCallback(response)
      }
    }, failureCallback)
  };

  getDateLength(){
    let startTime = new Date((this.startTime.getFullYear() + '-' + (this.startTime.getMonth() + 1) + '-' + this.startTime.getDate()).replace(/-/g,'/')).getTime();
    let endTime = new Date((this.endTime.getFullYear() + '-' + (this.endTime.getMonth() + 1) + '-' + this.endTime.getDate()).replace(/-/g,'/')).getTime();
    let dayLength = (endTime - startTime) / (1000 * 60 * 60 * 24) + 1;
    return dayLength;
  }

  httpQueryPayState(successCallback, failureCallback) {
    this.httpPost(SpaceOrder.QUERY_PAY_STATE_URL, {uuid: this.uuid}, function (res) {
      successCallback && successCallback(res.data.data.status);
    }, function () {
      failureCallback && failureCallback();
    });
  }

  httWeChatPay(params,successCallback, failureCallback) {
    this.httpPost(SpaceOrder.WE_CHAT_PAY_URL, params, function (res) {
      successCallback && successCallback(res);
    }, function () {
      failureCallback && failureCallback();
    });
  }

}
SpaceOrder.registerEnum("Characteristic", CharacteristicMap);
SpaceOrder.registerEnum("Attribute", AttributeInheritMap);
