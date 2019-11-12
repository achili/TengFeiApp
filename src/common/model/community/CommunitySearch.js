import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";

let Type = {
  COMMUNITY: "COMMUNITY",
  NEWS: "NEWS",
  EVENTS: "EVENTS",
  POSTS: "POSTS"
};

export default class CommunitySearch extends BaseEntity{
  constructor(args) {
    super(args);
    this.creator = new User();
    this.type = null;
    this.content = null;
  }

  static GET_HOT_URL = "/community/search/hot";
  static SEARCH_ALL_URL = "/community/search/community";

  getTAG() {
    return "CommunitySearch"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
  }

  //请求热词
  httpGetHot(successCallback, errorCallback){
    let that = this;
    let form = {
      page: 0,
      pageSize: 3
    };
    this.httpPost(CommunitySearch.GET_HOT_URL, form, function (response) {
      successCallback && successCallback(response.data.data.list);
    }, errorCallback)
  }


  httpSearchCommunity(successCallback, errorCallback) {

  }
}
