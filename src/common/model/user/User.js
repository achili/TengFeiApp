import Vue from 'vue'
import store from '../../../_store'
import BaseEntity from '../_base/BaseEntity'
import UserRole from './role/UserRole'
import PhoneValidation from '../user/validation/PhoneValidation'

import {str2Date} from '../../filter/time'
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../util/Utils";
import Tank from "../tank/Tank";
import FormItem from "../_base/FormItem";
import HttpForm from "../_base/HttpForm";


let StatusMap = {
  OK: {
    name: "正常",
    value: "OK",
    style: "success"
  },
  LOGIN_LOCK: {
    name: "锁定",
    value: "LOGIN_LOCK",
    style: "warning"
  },
  DISABLE: {
    name: "封禁",
    value: "DISABLE",
    style: "error"
  }
};

export default class User extends BaseEntity{

  constructor(args) {
    super(args);
    this.role = new UserRole();
    //手机验证码模块。
    this.phoneValidation = new PhoneValidation();
    this.name = "";
    this.email = null;
    this.phone = null;
    this.description = null;
    this.unionid = null;

    //APP新增字段
    this.localArea = null;
    this.gender = null;
    this.weChat = null;
    this.companyCode = null;
    this.companyName = null;

    this.password = null;
    this.avatar = new Tank('image', false, 1024 * 1024, '图片不能超过1M');
    this.avatarUrl = null;
    this.lastIp = null;
    this.lastTime = null;
    this.status = StatusMap.OK.value;
    this.emailValidate = null;
    this.session = null;

    //非持久化
    this.isLogin = false;
    //修改密码用到的字段
    this.oldPassword = null;
    this.repeatPassword = null;

  }

  static URL_LOGIN = "/user/login";
  static URL_APP_LOGIN = "/user/app/login";
  static URL_BIND_WECHAT = "/user/bind/weChat";
  static URL_WECHAT_LOGIN = "/user/weChat/login";
  static URL_UPDATE = "/user/update";
  static URL_LOGOUT = "/user/logout";
  static URL_REGISTER = "/user/register";
  static URL_CALLVERIFICATION = "/user/callVerification";
  static URL_WECHAT_REGISTER = "/user/weChat/register";
  static URL_FAST_LOGIN = "/user/fast/login";
  static URL_PASSWORD_CHANGE = "/user/change/password";
  static URL_PASSWORD_RESET = "/user/password/reset";
  static URL_PHONE_CHANGE = "/user/phone/change";
  static URL_PHONE_VALIDATION = "/user/phone/validation";
  static URL_EMAIL_SEND = "/user/email/send";
  static URL_EMAIL_VALIDATE = "/user/email/validate";
  static URL_CANCEL_ASSOCIATION = "/user/cancel/association";
  static URL_APPSETTING ="/appsettings/detail/d4bc8d8d-5d40-466c-9b0a-bd3b6d5218b8";
  static UPDATE_QRCODE ="/user/update/qrcode";


  render(obj) {
    BaseEntity.prototype.render.call(this, obj);
    this.lastTime = str2Date(this.lastTime);
    this.renderEntity("avatar", Tank);
  };

  getTAG() {
    return "User";
  }

  httpAppLogin (phone,password, successCallback, errorCallback) {
    let form = {
      phone: phone,
      password: password
    };
    this.httpPost(User.URL_APP_LOGIN, form, function (response) {
      successCallback && successCallback(response)
    }, errorCallback);
  }

  httpBindWeChat (unionid, successCallback, errorCallback) {
    let weChatAuth = store.state.auths[0];
    let that = this;
    weChatAuth.login(function () {
      weChatAuth.getUserInfo(function () {
        let form = {
          unionid: weChatAuth.userInfo.unionid
        };
        that.httpPost(User.URL_BIND_WECHAT, form, function (response) {
          that.unionid = weChatAuth.userInfo.unionid;
          that.getWeChatName();
          successCallback && successCallback(response);
        }, errorCallback);
      }, function (e) {
        store.state.plus.nativeUI.toast("微信登录授权成功，但获取用户信息失败: " + e.message ,{duration:"short"});
        errorCallback && errorCallback();
      });
    },function (e) {
      store.state.plus.nativeUI.toast("微信登录授权失败: " + e.message ,{duration:"short"});
      errorCallback && errorCallback();
    });
  }

  httpWeChatLogin (unionid, successCallback, errorCallback) {
    let form = {
      unionid: unionid
    };
    this.httpPost(User.URL_WECHAT_LOGIN, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  }

  innerLogin (response) {
    this.errorMessage = null;
    this.isLogin = true;
    this.render(response.data.data);
    //从localStorage读取对应用户的所有消息store.state.allMessage = "XXX"
    store.state.allMessage = store.state.messageLetter.renderMessageFromLocalStorage(store.state.user.uuid);
    //登录成功后去本地保存一下用户的简单信息，方便下次自动填入个别字段。
    Vue.http.headers.common['Authorization'] = this.session;
    this.saveUser(response.data.data)
  }

  //将用户信息存储在本地。
  saveUser(rawUserObject = null) {
    if (rawUserObject) {
      rawUserObject.isLogin = true;
    }
    saveToLocalStorage(this.getTAG(), JSON.stringify(rawUserObject));
  }

  //获取用户头像的url.
  getAvatarUrl = function (h = 200, w = 200) {
    if (this.avatar && this.avatar.url) {
      return this.avatar.getLocalUrlBySize(h, w, require("../../../assets/avatar.png"));
    } else {
      return require("../../../assets/avatar.png");
    }
  };

  httpLogout (successCallback, errorCallback) {
    let that = this;
    that.innerLogout();
    this.httpPost(User.URL_LOGOUT, {}, function (response) {
      delete Vue.http.headers.common['Authorization'];
      successCallback && successCallback(response);
    }, function () {
      delete Vue.http.headers.common['Authorization'];
      errorCallback && errorCallback();
    })
  }

  getHttpLogin() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/app/login", [
      new FormItem(FormItem.prototype.Type.HTTP_VERIFY_PHONE, "手机号码",false, true, "phone", "user.phone", null,{max: 100, placeholder: "手机号码"}),
      new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "密码",false, true, "password",  "user.password", null,{min: 6, placeholder: "密码"})
    ]);
  };

  getHttpResetPassword() {
    let httpForms =  new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/reset/password", [
      new FormItem(FormItem.prototype.Type.INPUT_PASSWORD, "设置密码",false, true, "password", "user.password", null,{min: 6, placeholder: "设置密码"}),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, true, "uuid",  "user.uuid", this.uuid),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, true, "phone",  "user.phone", store.state.temps.phone),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, true, "phoneCode",  "user.phoneCode", store.state.temps.phoneCode)
    ]);
    httpForms.form.push(
      new FormItem(
        FormItem.prototype.Type.INPUT_PASSWORD, "确认密码",false, true, "repeatPassword",  "user.repeatPassword", null,
        {max: 100, placeholder: "确认密码", equal: httpForms.getFormItem("password")}
      ));
    return httpForms;
  };

  //保存用户基本信息
  getHttpEdit() {
    return new HttpForm(HttpForm.prototype.Type.ORDINARY, "/user/edit", [
      new FormItem(FormItem.prototype.Type.INPUT, "姓名",false, false, "name", "user.name", null,{max: 100, placeholder: "姓名"}),
      new FormItem(FormItem.prototype.Type.SINGER_CHECK, "性别",false, false, "gender", "user.gender", null,{placeholder: "性别",
        list: [
          {
            name: "男",
            val: "MALE"
          } ,
          {
            name: "女",
            val: "FEMALE"
          }
        ]}),
      new FormItem(FormItem.prototype.Type.INPUT, "电子邮箱",false, false, "email",  "user.email", null,{max: 100, placeholder: "电子邮箱", isEmail: true}),
      new FormItem(FormItem.prototype.Type.COMPANY_CODE, "公司码",false, false, "companyCode",  "user.companyCode", null,{max: 100, placeholder: "公司码"}),
      new FormItem(FormItem.prototype.Type.INPUT, "公司名称",false, false, "companyName",  "user.companyName", null,{max: 100, placeholder: "公司名称"}),
      new FormItem(FormItem.prototype.Type.HIDDEN, "UUID",false, false, "uuid",  "user.uuid", this.uuid)
    ]);
  };

  httpRegister (phone, phoneCode, password, successCallback, errorCallback) {
    let that = this;
    let form = {
      phone: phone,
      phoneCode: phoneCode,
      password: password
    };
    this.httpPost(User.URL_REGISTER, form, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpWeChatRegister (form, successCallback, errorCallback) {
    let that = this;
    this.httpPost(User.URL_WECHAT_REGISTER, form, function (response) {
      that.innerLogin(response);
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpEditInformation (avatar, name, localArea, description, email, weChat, companyName, successCallback, errorCallback) {
    let that = this;

    let form = {
      avatar: avatar,
      name: name,
      localArea: localArea,
      description: description,
      email: email,
      weChat: weChat,
      companyName: companyName
    };
    if (this.uuid) {
      form.uuid = this.uuid;
    }
    this.httpPost("/user/edit", form, function(response) {
      let ss = that.session;

      that.render(response.data.data);
      that.session = ss;
      that.keepLocalAvatar();
      that.saveUser(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback);
  }

  httpPhoneValidation (phone, phoneCode, successCallback, errorCallback) {
    let that = this;
    let form = {
      phone: phone,
      phoneCode: phoneCode
    };
    this.httpPost(User.URL_PHONE_VALIDATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };

  httpCancelAssociation (unionid, successCallback, errorCallback) {
    let form = {
      unionid: unionid
    };
    this.httpPost(User.URL_CANCEL_ASSOCIATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);

  }


  //从本地存储中读取用户信息
  renderFromLocalStorage() {

    try {
      let userString = readLocalStorage(this.getTAG());
      if (userString) {
        let json = JSON.parse(userString);
        this.render(json);

      }
    } catch (e) {
      removeLocalStorage(this.getTAG());
    }

  }

  //清除本地的user信息
  clearLocalStorage() {
    removeLocalStorage(this.getTAG());
  };

  //退出登陆
  innerLogout() {
    this.render(new User());
    this.clearLocalStorage();
  };

  hasPermission(featureType) {
    if (this.role) {
      return this.role.hasPermission(featureType);
    } else {
      console.error("该用户没有角色，请及时排查。");
      return false;
    }
  };

  //自动登陆的更新用户信息
  httpUpdateInfo(successCallback, errorCallback) {
    if (this.isLogin) {
      let that = this;
      let session = this.session;
      this.httpPost(User.URL_UPDATE, {}, function (response) {
        that.errorMessage = null;
        that.isLogin = true;
        that.render(response.data.data.user);
        that.session = session;
        //从localStorage读取对应用户的所有消息store.state.allMessage = "XXX"
        store.state.allMessage = store.state.messageLetter.renderMessageFromLocalStorage(store.state.user.uuid);
        let tempUser = response.data.data;
        tempUser.session = session;
        that.saveUser(tempUser);
        that.keepLocalAvatar();
        successCallback && successCallback(response);
      }, errorCallback);
    }
  };

  //登录页面查询手机号是否已注册
  httpInquiryCellRepeat(phone,successCallback,errorCallback){
    let form = {
      phone: phone
    };
    this.httpPost(User.URL_CALLVERIFICATION, form, function (response) {
      successCallback && successCallback(response);
    }, errorCallback);
  };


  weChatLogin(successCallback, needPerfectCallback, errorCallback) {
    let weChatAuth = store.state.auths[0];
    if (!this.isLogin) {
      let that = this;
      weChatAuth.login(function () {
        weChatAuth.getUserInfo(function () {
          that.httpWeChatLogin(weChatAuth.userInfo.unionid, function (response) {
            if (response.data.data === null) {
              needPerfectCallback && needPerfectCallback();
            } else {
              successCallback && successCallback(response);
            }
          }, function (response) {
            that.defaultErrorHandler(response);
            errorCallback && errorCallback();
          })
        }, function (e) {
          store.state.plus.nativeUI.toast("微信登录授权成功，但获取用户信息失败: " + e.message ,{duration:"short"});
          errorCallback && errorCallback();
        });
      }, function (e) {
        store.state.plus.nativeUI.toast("微信登录授权失败: " + e.message ,{duration:"short"});
        errorCallback && errorCallback();
      });
    } else {
      store.state.plus.nativeUI.toast("您已登录:" ,{duration:"short"});
    }
  }


  getWeChatName(successCallback, errorCallback) {
    let weChatAuth = store.state.auths[0];
    let that = this;
    if (this.isLogin) {
      weChatAuth.getUserInfo(function () {
        that.weChat = weChatAuth.userInfo.nickname;
        successCallback && successCallback(weChatAuth.userInfo.nickname);
      }, function () {
        errorCallback && errorCallback();
      })
    }
  }

  authLogoutAll() {
    if (store.state.auths) {
      this.authLogout(store.state.auths[0]);
    }
  }

  authLogout(auth) {
    auth.logout(function () {
      console.log("success logout")
      // store.state.plus.nativeUI.toast("success logout！" ,{duration:"short"});
    }, function (e) {
      // store.state.plus.nativeUI.toast("error logout！" ,{duration:"short"});
      console.log("error logout" + e.message)
    })
  }

  keepLocalAvatar() {
    this.avatar.keepLocal(240, 240);
    this.avatar.keepLocal(300, 300);
    this.avatar.keepLocal(440, 440);
  }


  httpUpdateQrCode(successCallback, errorCallback) {
    this.httpPost(User.UPDATE_QRCODE, null, function (response) {
      successCallback && successCallback(response.data.data.qrCode)
    }, errorCallback);
  }


  checkFeatureType(featureType) {
    if(!this.role || !this.role.accesses) {
      return false;
    }
    let res = false;
    this.role.accesses.forEach(acc => {
      if(acc.featureType.value === featureType) {
        res = acc.active;
      }
    });
    return res;
  }
}





