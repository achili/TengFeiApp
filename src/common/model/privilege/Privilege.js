import BaseEntity from '../_base/BaseEntity'
import Filter from '../_base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";
import {simpleDateTime} from "../../filter/time";
import Vue from 'vue'


let Type = {
  'CORPORATE': 'CORPORATE',
  'INDIVIDUAL': 'INDIVIDUAL'
};
let TypeMap = {
  CORPORATE: {
    name: "企业服务",
    value: "CORPORATE",
    style: "success"
  },
  INDIVIDUAL: {
    name: "会员优惠",
    value: "INDIVIDUAL",
    style: "warning"
  }
};
export default class Privilege extends BaseEntity {

  constructor(args) {
    super(args);
    this.creator = new User();
    this.type = Type.CORPORATE;
    //图片
    this.poster = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    //标题
    this.title = null;
    //详情介绍
    this.description = null;
    //有效期 会员优惠
    this.validTime = new Date();
    //合作伙伴 企业服务
    this.cooperativePartner = [];


    //ui
    this.openDetail = false;
    this.padding = 15;
  }

  getTAG() {
    return "Privilege"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('poster', Tank);
    this.renderEntity('validTime', Date);
    if(this.type === Type.CORPORATE) {
      this.poster.keepLocal(270, 500);
    } else {
      this.poster.keepLocal(215, 500);
    }

    let a = this.cooperativePartner.toString();
    this.cooperativePartner = JSON.parse(a);
    if(this.cooperativePartner) {
      this.cooperativePartner.forEach(c => {
        let bean = new Tank();
        if (c.picture !== null) {
          bean.render(c.picture);
          c.picture = bean;
        }
        c.picture.keepLocal(300, 600)
      })
    }
  }
  getFilters() {
    return [
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.SORT,'空间地点','spaceRegionalUuid')
    ]
  };
}
Privilege.prototype.Type = Type;
Privilege.prototype.TypeMap = TypeMap;
Privilege.prototype.TypeList = Privilege.prototype.getTypeList();
