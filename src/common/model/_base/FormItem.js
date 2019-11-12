import {validateEmail,validatePhone} from '../../../common/filter/validate'
import Base from "./Base";
import store from '../../../_store'
import User from "../../../common/model/user/User";
import PhoneValidation from "../user/validation/PhoneValidation";
import {getDayStart, simpleDateTime} from "../../filter/time";

let Type = {
  //用于文本输入筛选
  INPUT: 'INPUT',
  MOBILE_NUMBER: 'MOBILE_NUMBER',
  //用于手机号输入
  HTTP_VERIFY_PHONE:'HTTP_VERIFY_PHONE',
  //用于密码输入
  INPUT_PASSWORD: 'INPUT_PASSWORD',
  SINGER_CHECK: 'SINGER_CHECK',
  TEXT_AREA: 'TEXT_AREA',
  //数字、小数
  NUMBER: 'NUMBER',
  //文件
  TANK: 'TANK',
  //富文本编辑器
  RICH_TEXT: "RICH_TEXT",
  //隐藏
  HIDDEN: "HIDDEN",
  //手机验证码
  VALIDATION: "VALIDATION",
  //Checkbox
  CHECKBOX:"CHECKBOX",
  //REMINDER
  REMINDER:"REMINDER",
  //SPACE_ORDER
  SPACE_ORDER:"SPACE_ORDER",
  //RADIO
  RADIO:"RADIO",
  //日期
  DATE:"DATE",
  //时间
  TIME:"TIME",
  //select
  SELECT:"SELECT",
  //滑块时间
  SLIDER_TIME: "SLIDER_TIME",
  //公司码
  COMPANY_CODE:"COMPANY_CODE"
};

export default class FormItem {
  //表单类型、表单说明、是否显示表单说明、是否必填、提交名、调用backFill的选用属性、默认值、规则(如字数、大小)、提交前预处理
  constructor (type, description, showDescription, isRequired, name, fillKey, defaultValue, rule = {},beforeSubmit) {
    if (!type || !description || !name) {
      console.error('FormItem 传入的参数缺失！' + type + ' ' + name);
      return
    }
    this.type = type;
    this.description = description;
    this.showDescription = showDescription;
    this.isRequired = isRequired;
    this.name = name;
    this.fillKey = fillKey;
    this.value = defaultValue;
    this.rule = rule;
    this.beforeSubmit = beforeSubmit;

    this.errorMsg = null;
  }

  backFill(parameter) {
    if(this.fillKey) {
      let arr = this.fillKey.split(".");
      if(this.value instanceof Base) {
        this.value.render(parameter[arr[0]][arr[1]]);
      } else {
        this.value = parameter[arr[0]][arr[1]];
      }

    }
  }

  sendValidation(checkLogin, checkNotLogin) {
    store.state.user.phoneValidation.checkLogin = !!checkLogin;
    store.state.user.phoneValidation.checkNotLogin = !!checkNotLogin;
    store.state.user.phoneValidation.phone = this.rule.phone.value;
    store.state.user.phoneValidation.httpFetch();
  };

  validate() {
    this.errorMsg = null;
    switch(this.type) {
      case Type.INPUT:
      case Type.INPUT_PASSWORD:
      case Type.TEXT_AREA:
      case Type.RICH_TEXT:
      case Type.MOBILE_NUMBER:
        return this.inputValidate();
      case Type.NUMBER:
        return this.numberValidate();
      case Type.TANK:
        return this.defaultEntityValidate();
      case Type.CHECKBOX:
        return this.defaultCheckBoxdate();
      case Type.HTTP_VERIFY_PHONE:
        return this.verifyCellRepeat();
      case Type.SELECT:
        return this.defaultValidate();
      case Type.REMINDER:
      case Type.RADIO:
      case Type.COMPANY_CODE:
      case Type.DATE:
        return this.dateValidate();
      case Type.TIME:
        return this.timeValidate();
      default:
        return true;
    }

  }

  watch(newVal,oldVal) {
    //避免输入框自带的赋值效果影响errorMsg
    if(oldVal !== null && oldVal !== undefined) {
      this.errorMsg = null;
    }
    switch(this.type) {
      case Type.INPUT:
      case Type.HTTP_VERIFY_PHONE:
      case Type.INPUT_PASSWORD:
      case Type.MOBILE_NUMBER:
      case Type.TEXT_AREA:
      case Type.RICH_TEXT:
        return this.inputWatch(newVal,oldVal);
      case Type.NUMBER:
        return this.numberWatch(newVal,oldVal);
      case Type.TANK:
        return this.defaultWatch(newVal,oldVal);
    }

  }

  getParam() {
    if(typeof this.beforeSubmit === 'function') {
      console.log("getParam")
      return this.beforeSubmit();
    } else {
      return this.value;
    }
  }

  static validateAll(form) {
    if(!FormItem.checkForm(form)) {
      return false
    }
    let isPass = true;
    form.forEach(formItem => {
      if(!formItem.validate()) {
        isPass = false;
      }
    });
    return isPass;
  }

  static getParamAll(form) {
    if(!FormItem.checkForm(form)) {
      return {}
    }
    let param = {};
    form.forEach(formItem => {
      param[formItem.name] = formItem.getParam();
    });
    return param;
  }

  static checkForm(form) {
    if(!form) {
      console.error("validateAll : from is false")
      return false;
    }
    if(!(form instanceof Array)) {
      console.error("validateAll : from is not Array")
      return false;
    }
    return true;
  }

  /************************************ input *************************************************/
  inputValidate() {
    if(!this.defaultValidate()) {
      return false;
    }
    if(this.value) {
      if(this.rule.max) {
        if(this.value.length > this.rule.max) {
          this.errorMsg = "最大可填写" +  this.rule.max  + "个字，" + "您已超出" +  (this.value.length - this.rule.max) + "个字。";
          return false
        }
      }
      if(this.rule.min) {
        if(this.value.length < this.rule.min) {
          this.errorMsg = "最少填写" + this.rule.min + "个字，尚差" + (this.rule.min - this.value.length) + "个字。";
          return false
        }
      }
      if(this.rule.isEmail) {
        if(!validateEmail(this.value)) {
          this.errorMsg = "您填写的邮箱格式不正确。";
          return false
        }
      }
      if(this.rule.isPhone) {
        if(!validatePhone(this.value)) {
          this.errorMsg = "您填写的手机号格式不正确。";
          return false
        }
      }
    }
    if (this.rule.equal) {
      if (this.rule.equal.value && this.rule.equal.value !== 0) {
        if (this.rule.equal.value !== this.value) {
          this.errorMsg = "两次填写的内容不一致。";
          return false
        }
      }
    }
    return true;
  }
  inputWatch(newVal,oldVal) {
    if(this.rule.max) {
      if(this.value) {
        if(this.value.length > this.rule.max) {
          this.errorMsg = "您已超出" +  (this.value.length - this.rule.max) + "个字。";
          return false
        }
        if(this.value.length > this.rule.max * 0.8) {
          this.errorMsg = "您还可以填写" +  (this.rule.max - this.value.length) + "个字。";
          return false
        }
      }
    }
    if (this.rule.equal) {
      if (this.rule.equal.value && this.rule.equal.value !== 0) {
        if (this.rule.equal.value !== this.value) {
          this.errorMsg = "两次填写的内容不一致。";
          return false
        }
      }
    }
  }
  //在登录页验证手机号是否已注册
  verifyCellRepeat () {
    let that =  this;
    if(!this.defaultValidate()) {
      return false;
    }
    if(this.value) {
      if(!validatePhone(this.value)) {
        this.errorMsg = "您填写的手机号格式不正确。";
        return false
      }
    }
    let tempUser = new User();
    tempUser.httpInquiryCellRepeat(this.value,function () {
      return null
    },function () {
      that.errorMsg = "您的手机号未注册。";
      return false
    });
    return true;
  }

  /************************************ input *************************************************/

  /************************************ number *************************************************/
  numberValidate() {
    if(!this.defaultValidate()) {
      return false;
    }
    if(this.rule.max) {
      if((Number)(this.value) > this.rule.max) {
        this.errorMsg = "您已超出最大数字限制，最大大小" + this.rule.max + "。";
        return false
      }
    }
    if(this.rule.min) {
      if((Number)(this.value) < this.rule.min) {
        this.errorMsg = "您输入的数字小于最小限制，最小" + this.rule.min + "。";
        return false
      }
    }
    return true;
  }
  numberWatch(newVal,oldVal) {
    if(this.rule.max) {
      if((Number)(this.value) > this.rule.max) {
        this.errorMsg = "已超出最大数字限制。";
        return false
      }
    }
  }
  /************************************ input *************************************************/

  /************************************ default *************************************************/
  defaultValidate() {
    if(this.isRequired) {
      //避免无法填0的问题
      if(this.value === null || this.value === undefined || this.value === "") {
        this.errorMsg = "请填写" + this.description + "。";
        return false
      }
    }
    return true;
  }
  defaultEntityValidate() {
    if(this.isRequired) {
      if(this.value) {
        if(this.value.uuid) {
          return true;
        }
      }
      this.errorMsg = "请选择" + this.description + "。";
      return false;
    }
    return true;
  }
  defaultWatch(newVal,oldVal) {
    this.errorMsg = null;
    return true;
  }

  static defaultEntityBeforeSubmit = function () {
    if(this.value) {
      return this.value.uuid;
    }
    return null;
  }

  static defaultDateBeforeSubmit = function () {
    if(this.value) {
      return simpleDateTime(this.value);
    }
    return null;
  }

  //json转字符串
  static jsonTransformation = function () {
    if(this.value){
      return  JSON.stringify(this.value)
    }
    return null;
  }
  defaultCheckBoxdate = function () {
    if(this.isRequired) {
      if(this.value){
        if(this.value instanceof Array && this.value.length !== 0){
          return true;
        }
      }
      this.errorMsg = "请至少选择选择一项" + this.description + "。";
      return false;
    }
    return true
  };
  dateValidate = function () {
    if (this.isRequired) {
      if (!this.value || !(this.value instanceof Date)) {
        this.errorMsg = "请至少选择" + this.description + "。";
        return false;
      }
    }
    if (this.rule.maxDay) {
      let startTime = new Date(this.rule.startTime.value.getFullYear() + '-' + (this.rule.startTime.value.getMonth() + 1) + '-' + this.rule.startTime.value.getDate()).getTime();
      let endTime = new Date(this.value.getFullYear() + '-' + (this.value.getMonth() + 1) + '-' + this.value.getDate()).getTime();
      let now = getDayStart(new Date()).getTime();
      let dateLength = (endTime - startTime) / (1000 * 60 * 60 * 24) + 1;
      if(dateLength >= 29) {
        this.errorMsg = this.description + "最大天数为" + this.rule.maxDay + "天。";
        return false;
      }
      if((startTime - now) <= 0){
        this.errorMsg = "最早开始日期要从明天开始";
        return false;
      }
      if((endTime - startTime) < 0){
        this.errorMsg = "开始时间不能小于结束时间";
        return false;
      }
    }
    return true;
  };

  timeValidate = function () {
    if (this.isRequired) {
      if (!this.value || this.value === "") {
        this.errorMsg = "请至少选择" + this.description + "。";
        return false;
      }
    }
    return true;
  };


  /************************************ default *************************************************/
}

FormItem.prototype.Type = Type;
