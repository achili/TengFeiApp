import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import CommunityEvents from "../CommunityEvents";
import Filter from "../../_base/Filter";

let StatusMap = {
  REVIEW: {
    name: "审核中",
    value: "REVIEW",
    style: "warning"
  },
  REVIEW_PASS: {
    name: "审核通过",
    value: "REVIEW_PASS",
    style: "success"
  },
  REVIEW_REJECT: {
    name: "审核未通过",
    value: "REVIEW_REJECT",
    style: "danger"
  }
};
export default class Enroll extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.communityEvents = new CommunityEvents();
    this.name = null;
    this.remarks = null;
    this.status = StatusMap.REVIEW.value;
  }
  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '用户', 'user')
    ]
  };
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("communityEvents", CommunityEvents);
  }

  getTAG(){
    return "Enroll"
  }

}
Enroll.prototype.StatusMap = StatusMap;
