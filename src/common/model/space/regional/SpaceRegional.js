import {lowerCamel, lowerSlash, startWith, toPlural} from "../../../filter/str";
import $ from "jquery";
import Vue from "vue";
import {str2Date} from "../../../filter/time";


export default class SpaceRegional {

  constructor(args) {
    this.uuid = null;
    this.name = null;
    this.sort = null;
    this.createTime = null;
    this.updateTime = null;
    this.deleted = false;

    this.description = null;
  }

  static URL_PAGER = "/space/regional/page";
  static URL_LIST = "/space/regional/list";

  render(obj) {
    if (obj) {
      $.extend(this, obj)
    }
    // this.createTime = str2Date(this.createTime);
    // this.updateTime = str2Date(this.updateTime);

  }

  httpPager(successCallback, errorCallback){
    let that = this;
    let form = {
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(SpaceRegional.URL_PAGER,form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback)
  }

  httpList(successCallback, errorCallback){
    let that = this;
    let form = {
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost(SpaceRegional.URL_LIST,form, function (response) {
      //that.render(response.data.data.list);
      successCallback && successCallback(response);
    }, errorCallback)
  }

  //Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
  //url is something like this: /article/detail/1
  //opts中可以传递一些特殊的选项。具体参考：https://github.com/pagekit/vue-resource/blob/develop/docs/http.md
  httpPost(url, params, successCallback, errorCallback, opts = {}) {
    if(!url) {
      console.error("URL为空！")
    }
    let that = this;
    let fullUrl = url;
    if (!startWith(url, 'http')) {
      fullUrl = Vue.http.options.root + url
    }
    let options = $.extend({}, opts);
    //options["emulateJSON"] = !(params instanceof FormData);
    //Post请求临时使用json的方式。
    options['emulateJSON'] = true;
    this.loading = true;
    Vue.http.post(fullUrl, params, options).then(function (response) {
      that.loading = false;
      typeof successCallback === 'function' && successCallback(response)
    }, function (response) {
      that.loading = false;
      console.error(response);
      //错误信息一律存放在自己的errorMessage中，user httpLogout将显得不灵活了
      //that.errorMessage = that.getErrorMessage(response)
      //对于没有登录的错误直接跳转到登录页面
      // if (Base.loginErrorHandler(response)) {
      //   return
      // }
      //有传入错误处理方法，就按你的执行
      if (typeof errorCallback === 'function') {
        errorCallback(response)
      } else {
        //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
        that.defaultErrorHandler(response)
      }
    })
  }

  //we provide a default error handing method. handle with specific errorCallback.
  defaultErrorHandler(response, errorCallback) {
    let msg = this.getErrorMessage(response);
    if (typeof errorCallback === 'function') {
      errorCallback(response)
    } else {
      Notification.error({
        title: '错误',
        message: msg
      })
    }
  }

  //get errorMessage from response and wrap the value to this.errorMessage.
  getErrorMessage(response) {
    let msg = '网络出错，请稍后再试!';
    if (response === null) {
      msg = '出错啦，请稍后重试！'
    } else if (typeof response === 'string') {
      msg = response
    } else if (response['msg']) {
      msg = response['msg']
    } else if (response['message']) {
      msg = response['message']
    } else {
      let temp = response['data'];
      if (temp !== null && typeof temp === 'object') {
        if (temp['message']) {
          msg = temp['message']
        } else if (temp['msg']) {
          msg = temp['msg']
        } else {
          if (temp['error'] && temp['error']['message']) {
            msg = temp['error']['message']
          }
        }
      }
    }
    this.errorMessage = msg;
    return msg
  }

}
