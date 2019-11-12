import BaseEntity from "../_base/BaseEntity";
import User from "../user/User";
import Filter from "../_base/Filter";
import Tank from "../tank/Tank";
import HttpForm from "../_base/HttpForm";
import FormItem from "../_base/FormItem";
import store from "../../../_store";

export default class CommunityNews extends BaseEntity{
  constructor(args) {
    super(args);

    this.creator = new User();
    //图片
    this.poster = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    this.posterUrl = null;
    //标题
    this.title = null;
    this.subtitle = null;
    this.content = "";
    this.list = [];

    //ui
    this.showDetail = false;
    this.top = 200;
  }

  static URL_LOOKUP = "/community/news/lookup";

  getFilters() {
    return [
      new Filter(Filter.prototype.Type.INPUT, '关键词', 'keyword'),
      new Filter(Filter.prototype.Type.SORT, '发布日期', 'orderCreateTime'),
      new Filter(Filter.prototype.Type.CHECK,'已删除','deleted'),
      new Filter(Filter.prototype.Type.SORT,'空间地点','spaceRegionalUuid')
    ]
  };

  getTAG() {
    return "CommunityNews"
  }
  render(obj) {
    super.render(obj);
    this.renderEntity('creator', User);
    this.renderEntity('poster', Tank);

  }

  getHttpCreate() {
    return new HttpForm(HttpForm.prototype.Type.CREATE_SAVE, "/community/news/{editMode}",
      [
        new FormItem(FormItem.prototype.Type.HIDDEN, "ID", true, "uuid", "communityNews.uuid"),
        new FormItem(FormItem.prototype.Type.TANK, "图片", true, "poster", "communityNews.poster",  new Tank(), {}, FormItem.defaultEntityBeforeSubmit),
        new FormItem(FormItem.prototype.Type.INPUT, "名称", true, "title", "communityNews.title", null,{max: 20, placeholder: "这里填写名称"}),
        new FormItem(FormItem.prototype.Type.INPUT, "副标题", false, "subtitle", "communityNews.subtitle", null,{max: 30, placeholder: "提示文字"}),
        new FormItem(FormItem.prototype.Type.RICH_TEXT, "内容", true, "content", "communityNews.content", null,{height: "600px"})
      ]
    );
  };

  //搜索全部
  httpQueryAll(content,successCallback, errorCallback){
    let that = this;
    let form = {
      content:content
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(CommunityNews.URL_LOOKUP,form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpDetail(successCallback, errorCallback) {
    let that = this;
    if (!this.uuid) {
      this.errorMessage = '没有详情！';
      this.defaultErrorHandler(this.errorMessage, errorCallback);
      return
    }
    let url = this.getUrlDetail(this.uuid);
    if (!url) {
      return
    }
    this.detailLoading = true;
    this.httpGet(url, {}, function (response) {
      that.detailLoading = false;
      that.editMode = true;
      successCallback && successCallback(response)
    }, function (response) {
      that.detailLoading = false;
      if (typeof errorCallback === 'function') {
        errorCallback()
      } else {
        //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
        that.defaultErrorHandler(response)
      }
    })
  }

  shareSystem(title, uuid) {
    store.state.plus.share.sendWithSystem({content: '' + title,href: store.state.domain + '/share/community/news/detail?uuid=' + uuid}, function () {
      store.state.plus.nativeUI.toast("分享成功！",{duration:"short"});
    }, function (e) {
      store.state.plus.nativeUI.toast("分享失败! ",{duration:"short"});
    })
  }

  shareWeiXinMessage(title, uuid) {
    store.state.sharewx.send( {content: title, href: store.state.domain + '/share/community/news/detail?uuid=' + uuid, extra: {scene: "WXSceneSession"}}, function () {
      store.state.plus.nativeUI.toast("分享成功！",{duration:"short"});
    }, function (e) {
      store.state.plus.nativeUI.toast("分享失败! ",{duration:"short"});
    })
  }

}
