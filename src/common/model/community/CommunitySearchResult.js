import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Tank from "../tank/Tank";

export default class CommunitySearchResult extends BaseEntity{
  constructor(args) {
    super(args);
    this.type = null;

    this.title = null;
    this.content = null;
    this.poster = new Tank();

    this.type = null;
  }

  static SEARCH_ALL_URL = "/community/search/community";

  getTAG() {
    return "CommunitySearchResult"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('poster', Tank);
  }

}
