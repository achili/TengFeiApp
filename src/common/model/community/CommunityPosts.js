import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import Tank from "../tank/Tank";
import Commentary from "./commentary/Commentary";
import {trim} from "../../filter/str";
import store from '../../../_store'
import {simpleMinute} from "../../filter/time";
import SpaceOrder from "../space/introduction/SpaceOrder";

let Status = {
  OK:'OK',
  CLOSURE:'CLOSURE'
};
let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success"
  },
  CLOSURE: {
    name: "封禁",
    value: "CLOSURE",
    style: "danger"
  }
};
let ReasonMap = {
  "VIOLENT_AND_BLOODY":{
    val: "VIOLENT_AND_BLOODY",
    name:"血腥暴力"
  },
  "VULGAR_PORNOGRAPHY":{
    val: "VULGAR_PORNOGRAPHY",
    name:"低俗色情"
  },
  "GARBAGE_ADVERTISEMENT":{
    val: "GARBAGE_ADVERTISEMENT",
    name:"垃圾广告"
  },
  "ABUSIVE_ATTACK":{
    val: "ABUSIVE_ATTACK",
    name:"辱骂攻击"
  },
  "OTHER_REASONS":{
    val: "OTHER_REASONS",
    name:"其他"
  }
};

export default class CommunityPosts extends BaseEntity{

  constructor(args) {
    super(args);
    this.creator = new User();
    this.content = null;
    this.address = null;
    this.posters = [];
    this.postersUrls = [];
    this.likes = 0;
    this.isPraise = false;
    this.isTop = false;

    this.commentaries = [];

    this.commentarySize = 0;

    //ui
    this.openCommentaries = false
    this.writeComment = null;

    this.commentariesLoading = null; //ui
    this.more = false;
    this.status = Status.OK;
  }
  static URL_APPLAUD = "/community/posts/applaud";
  static URL_COMMENT = "/community/posts/commentary";
  static URL_REMIND = "/community/posts/remind";

  getTAG() {
    return "CommunityPosts";
  }

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '置顶', 'orderTop'),
      new Filter(Filter.prototype.Type.SELECTION,'状态', 'status',this.getStatusList()),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,'已过期','status')
    ]
  };

  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderList("posters", Tank);
    this.renderList("commentaries", Commentary);

  }


  httpCreate(positionText, successCallback, errorCallback) {
    if(!positionText) {
      positionText = ""
    }
    if(this.content === null || this.content === undefined) {
      store.state.plus.nativeUI.toast("内容不能为空！",{duration:"short"});
      errorCallback();
      return;
    }
    this.content = trim(this.content);
    if(this.content === "") {
      store.state.plus.nativeUI.toast("内容不能为空！",{duration:"short"});
      errorCallback();
      return;
    }
    let ids = [];
    if(this.posters) {
      this.posters.forEach(tank => {
        ids.push(tank.uuid)
      })
    }
    let from = {
      content: this.content,
      address:positionText,
      posters: ids.toString()
    };
    this.httpSave(from, successCallback, errorCallback);
  };

  //点赞
  httpApplaud (successCallback, errorCallback) {
    let that = this;
    let form = {
      likes: this.likes
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityPosts.URL_APPLAUD,form, function (response) {
      that.isPraise = response.data.data.isPraise;
      that.likes =  response.data.data.likes;
      successCallback && successCallback(response);
    }, errorCallback)
  };

  //评论
  httpComment(content,successCallback, errorCallback){
    let that = this;
    let form = {
      content:content
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityPosts.URL_COMMENT,form, function (response) {
      that.commentarySize = (response.data.data.commentarySize);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //删除评论
  delComment(index){
    let commentary = new Commentary();
    this.commentaries.splice(index, 1);
    this.commentaries.push(commentary);

  }

  getContent() {
    if(this.more) {
      return this.content;
    } else {
      return this.content.slice(0, 79) + "...";
    }
  }

  httpRemind(successCallback, errorCallback){
    let that = this;
    this.httpPost(CommunityPosts.URL_REMIND,{}, function (response) {

      successCallback && successCallback(response);
    }, errorCallback)
  }

  getHttpReport() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/community/report/create",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID",true, true, "reportId", "communityPosts.uuid"),
        new FormItem(FormItem.prototype.Type.SELECT, "举报类型",true, true, "reason", "report.reason", null,{list: CommunityPosts.prototype.ReasonList}),
        new FormItem(FormItem.prototype.Type.INPUT, "请填写举报理由(选填)",true, false, "describe", "report.describe", null,{}),
        new FormItem(FormItem.prototype.Type.REMINDER, "友情提示",false, false, "text", "report.text", null,{text: "举报成功后，我们将会在24小时内处理您的请求。"})
      ]
    );
  }

}
CommunityPosts.prototype.Status = Status;
CommunityPosts.prototype.StatusMap = StatusMap;
CommunityPosts.prototype.StatusList = CommunityPosts.prototype.getStatusList();

CommunityPosts.registerEnum("Reason", ReasonMap);
