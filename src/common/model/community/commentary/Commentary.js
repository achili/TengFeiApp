import BaseEntity from "../../_base/BaseEntity";
import User from "../../user/User";
import CommunityPosts from "../CommunityPosts";
import Filter from "../../_base/Filter";

export default class Commentary extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.communityPosts = new CommunityPosts();
    this.content = null;
  }

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("communityPosts", CommunityPosts);
  }

  getTAG() {
    return "Commentary"
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关联圈子', 'communityPosts'),
      new Filter(Filter.prototype.Type.SORT, '创建时间', 'orderCreateTime')
    ]
  };



}
