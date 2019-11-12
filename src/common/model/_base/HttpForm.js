import FormItem from "./FormItem";
import Base from "./Base";

let Type = {
  //用于创建和修改 这时候URL会自动生成 无需指定。
  CREATE_SAVE: 'CREATE_SAVE',
  //常规的
  ORDINARY: 'ORDINARY',
  //自定义提交表单的
  CUSTOM: 'CUSTOM'
};
export default class HttpForm extends Base{
  //type url form列表 successCallback errorCallback
  constructor (type, url, form) {
    super();
    if(!form || !(form instanceof Array)) {
      console.error("form 不存在或不是数组！")
    }
    this.type = type;
    this.url = url;
    this.form = form;
  }

  validate() {
    return FormItem.validateAll(this.form);
  }

  getParam() {
    return FormItem.getParamAll(this.form);
  }

  backFill(parameter) {
    if(parameter) {
      this.form.forEach(formItem => {
        formItem.backFill(parameter);
      });
    }
  }

  submit(successCallback, errorCallback) {
    if(this.validate()) {
      let url = this.url;
      if(this.type === Type.CREATE_SAVE) {
        if(this.editMode) {

          url = url.replace('{editMode}', 'edit');
        } else {
          url = url.replace('{editMode}', 'create');
        }
      } else if(this.type === Type.CUSTOM) {
        successCallback(this.getParam());
        return;
      }
      this.httpPost(url, this.getParam(), successCallback, errorCallback);
    }
  }

  //根据一个KEY找到对应的FormItem
  getFormItem (val) {
    if (!this.form || !this.form.length) {
      return null
    }
    for (let i = 0; i < this.form.length; i++) {
      let formItem = this.form[i];
      if (formItem.name === val) {
        return formItem;
      }
    }
  };
}
HttpForm.prototype.Type = Type;
