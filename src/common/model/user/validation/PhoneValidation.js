import BaseEntity from "../../_base/BaseEntity";
import $ from "jquery"
import store from '../../../../_store'

export default function PhoneValidation() {

  BaseEntity.call(this, arguments);

  this.phone = null;
  this.value = null;

  this.refreshTime = new Date();

  //true值时，当手机号注册过会抛异常。
  this.checkLogin = false;

  //true值时，当手机号没有注册过会抛异常。
  this.checkNotLogin = false;

  //更换新手机时需要用到
  this.newPhone = null;

  //冷却中
  this.coldingDown = 0;
  this.coldDownInterval = null;
}


PhoneValidation.prototype = new BaseEntity();
PhoneValidation.prototype.constructor = PhoneValidation;
PhoneValidation.prototype.URL_FETCH = "/sms/phone/validation/fetch";

PhoneValidation.prototype.getForm = function () {

  let form = {};
  form.phone = this.phone;
  form.checkLogin = this.checkLogin;
  form.checkNotLogin = this.checkNotLogin;
  return form;

};

PhoneValidation.prototype.validate = function () {
  if (!this.phone) {
    this.errorMessage = "请输入手机号";
    return false;
  }

  this.errorMessage = null;
  return true;
};

PhoneValidation.prototype.coldDown = function () {
  let that = this;
  if (this.coldingDown) {
    return;
  }
  this.refreshTime = new Date();

  if (this.coldDownInterval) {
    //清除定时器
    clearInterval(that.coldDownInterval);
  }
  this.coldDownInterval = setInterval(function () {
    that.coldingDown = parseInt(60 - (((new Date()).getTime() - that.refreshTime.getTime()) / 1000));
    if (that.coldingDown <= 0) {
      that.coldingDown = 0;

      //清除定时器
      clearInterval(that.coldDownInterval);
    }
  }, 1000);

};

PhoneValidation.prototype.reset = function () {
  let that = this;
  if (this.coldDownInterval) {
    //清除定时器
    clearInterval(that.coldDownInterval);
  }

  this.coldingDown = 0;
  this.phone = null;
  this.value = null;

};

PhoneValidation.prototype.httpFetch = function (successCallback, failureCallback) {
  let that = this;

  if (this.coldingDown > 0) {
    this.errorMessage = "您的操作太频繁";
    return;
  }

  this.httpPost(this.URL_FETCH, this.getForm(), function (response) {
    that.coldDown();
    if (typeof successCallback === "function") {
      successCallback();
    }
  }, function (response) {
    store.state.plus.nativeUI.toast("" + response.data.msg,{duration:"short"})
  });
};


