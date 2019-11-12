import Base from './Base'
import {str2Date} from '../../filter/time'
import Filter from './Filter'
import {MessageBox, Notification as NotificationBox} from 'element-ui'
import Schema from '../../../../node_modules/async-validator'
import SpaceRegional from "../space/regional/SpaceRegional";

export default class BaseEntity extends Base {

  constructor(args) {
    super(args);
    this.uuid = null;
    this.sort = null;
    this.createTime = null;
    this.updateTime = null;
    this.deleted = false;
    this.spaceRegional = new SpaceRegional()
  }

  render(obj) {
    super.render(obj);
    this.createTime = str2Date(this.createTime);
    this.updateTime = str2Date(this.updateTime);
  }

  getFilters() {
    return [
      new Filter('SORT', '创建时间', 'orderCreateTime')
    ]
  };


  //该实体目前是否能够编辑
  canEdit() {
    console.error('canEdit: you should override this base method.')
  }
  //该实体目前是否能够删除
  canDel() {
    console.error('canDel: you should override this base method.')
  }


  //common http detail methods.
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
      that.render(response.data.data);
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

  httpSave(form, successCallback, errorCallback) {
    let that = this;
    let url = this.getUrlCreate();
    if (this.uuid) {
      url = this.getUrlEdit()
    }
    this.httpPost(url, form, function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response)
    }, errorCallback)
  }

  httpDel(successCallback, errorCallback) {
    let that = this;
    if (!this.uuid) {
      this.errorMessage = '没有uuid，无法删除！';
      that.defaultErrorHandler(this.errorMessage, errorCallback);
      return
    }
    let url = this.getUrlDel(this.uuid);
    if (!url) {
      return
    }
    this.httpPost(url, {}, function (response) {
      successCallback && successCallback(response)
    }, errorCallback)
  }

  httpSort(uuid1, sort1, uuid2, sort2, successCallback, failureCallback) {
    let that = this;
    if (!uuid1 || !uuid2 || !(sort1 === 0 || sort1) || !(sort2 === 0 || sort2)) {
      this.errorMessage = '参数不齐！';
      that.defaultErrorHandler(this.errorMessage, failureCallback);
      return
    }
    let url = this.getUrlSort();
    if (!url) {
      that.defaultErrorHandler(this.errorMessage, failureCallback);
      return
    }
    let params = {
      uuid1: uuid1,
      sort1: sort1,
      uuid2: uuid2,
      sort2: sort2
    };
    this.httpPost(url, params, successCallback, failureCallback)
  }

  //确认删除操作.
  confirmDel(successCallback, failureCallback) {
    let that = this;
    MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {
        that.httpDel(function () {
          NotificationBox.success({
            message: '成功删除!'
          })
          if (typeof successCallback === 'function') {
            successCallback()
          }
        }, failureCallback)
      },
      function () {
        if (typeof failureCallback === 'function') {
          failureCallback()
        }
      }
    )
  }

  getUrlCreate() {
    let prefix = this.getUrlPrefix();
    return prefix + '/create'
  }

  getUrlDel(uuid = null) {
    let prefix = this.getUrlPrefix();
    if (uuid === null) {
      return prefix + '/del/{uuid}'
    } else {
      return prefix + '/del/' + uuid
    }
  }

  getUrlEdit() {
    let prefix = this.getUrlPrefix();
    return prefix + '/edit'
  }

  getUrlDetail(uuid = null) {
    let prefix = this.getUrlPrefix();
    if (uuid === null) {
      return prefix + '/detail/{uuid}'
    } else {
      return prefix + '/detail/' + uuid
    }
  }


  getUrlPage() {
    let prefix = this.getUrlPrefix();
    return prefix + '/page'
  }

  getUrlSort() {
    let prefix = this.getUrlPrefix();
    return prefix + '/sort'
  }


  getLink() {
    return {
      nameField: "name",
      path: "/404"
    }
  };

  getLinkName() {
    return this[this.getLink().nameField];
  }

  getLinkPath(by) {
    let path = this.getLink().path;
    if(by) {
      path = path.replace("{:by}", by);
    }
    path = path.replace("{uuid}" ,this.uuid);
    return path;
  }
}

