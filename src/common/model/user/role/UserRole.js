import BaseEntity from "../../_base/BaseEntity";
import Filter from "../../_base/Filter";
import UserAccess from "../access/UserAccess";

import {isEmptyObject} from "../../../util/Utils";


let Type = {
	PROGRAMMER: "PROGRAMMER",
	ADMINISTRATOR: "ADMINISTRATOR",
	USER: "USER",
	GUEST: "GUEST",
	CUSTOM: "CUSTOM"
}
let TypeMap = {
	PROGRAMMER: {
		name: "网站维护人员",
		value: "PROGRAMMER",
		style: "success"
	},
	ADMINISTRATOR: {
		name: "超级管理员",
		value: "ADMINISTRATOR",
		style: "success"
	},
	USER: {
		name: "注册用户",
		value: "USER",
		style: "success"
	},
	GUEST: {
		name: "游客",
		value: "GUEST",
		style: "success"
	},
	CUSTOM: {
		name: "自定义角色",
		value: "CUSTOM",
		style: "success"
	}
};

export default class UserRole extends BaseEntity {

  constructor () {
    super();
    this.name = null;
    this.description = null;
    this.special = false;
    this.type = Type.GUEST;
    this.accesses = [];
    //权限的二维数组。
    this.accessMap = {};
  }

  static URL_PERMISSION = "/user/role/permission";

  getTAG() {
    return "UserRole";
  }

  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.renderList("accesses", UserAccess);
    this.renderAccessMap();
  }

  //渲染accessMap
  renderAccessMap() {
    this.accessMap = {};
    this.accesses.forEach(access => {
      this.accessMap[access.featureType] = access.active;
    });
  }

  //快速查看对某一项功能点是否有权限
  hasPermission = function (featureType) {
    if (isEmptyObject(this.accessMap)) {
      console.error(this.accessMap);
      console.error("角色未渲染权限，请及时排查。");
      return false;
    } else if (!this.accessMap.hasOwnProperty(featureType)) {
      console.error("数据库中没有" + featureType + ",请及时排查");
      return false;
    } else {
      return this.accessMap[featureType];
    }
  }



}
