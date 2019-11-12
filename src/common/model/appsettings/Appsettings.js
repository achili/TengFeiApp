import BaseEntity from '../_base/BaseEntity'
import Tank from '../tank/Tank'
import User from "../user/User";
import SpaceRegional from "../space/regional/SpaceRegional";
import store from "../../../_store";
import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../../common/util/Utils";

export default class Appsettings extends BaseEntity {

  constructor(args) {
    super(args);
    this.splash = new Tank('image', false, 1024 * 1024);
    this.xiaoQiaoUser = new User();
    this.xiaoQiaoPhone = null;
    this.stationPrice = 0;
    this.spacePrice = 0;
    this.onePrice = 0;
  }
  static URL_GET_SETING = "/appsettings/get/seting";
  static GET_SPLASH = '/appsettings/get/splash';
  static GET_PRICE = '/appsettings/get/price';

  render(obj) {
    super.render(obj);
    this.renderEntity('splash', Tank);
    this.renderEntity('xiaoQiaoUser', User);
  }

  getTAG() {
    return "Appsettings";
  }
  httpGetPrice(currentSpaceRegionalUuid,successCallback,errorCallback){
    let that = this;
    this.httpPost(Appsettings.GET_PRICE,{uuid:currentSpaceRegionalUuid},function (response) {
      store.state.appSettingList.render(response.data.data);
      successCallback && successCallback(response);
    },errorCallback)
  }

  httpGetSplash(currentSpaceRegionalUuid,successCallback, errorCallback){
    let that = this;
    this.httpPost(Appsettings.GET_SPLASH,{spaceRegional: currentSpaceRegionalUuid},function (response) {
      that.render(response.data.data);
      successCallback && successCallback(response);
    }, errorCallback);
  };
  getAppSeting(currentSpaceRegionalUuid,successCallback, errorCallback) {
    let that = this;
    this.httpPost(Appsettings.URL_GET_SETING, {spaceRegional:currentSpaceRegionalUuid}, function (response) {
      that.render(response.data.data);
      //处理空间列表
      if(response.data.data.spaceRegionalList) {
        store.state.appSettings = [];
        response.data.data.spaceRegionalList.forEach(spaceRegiona => {
          let temp = new SpaceRegional();
          temp.render(spaceRegiona);
          store.state.spaceRegionalList.push(temp);
        })
      }
      //检查更新
      that.checkUpdate(
        parseFloat(response.data.data.KernelVersion),
        parseFloat(response.data.data.appVersion),
        response.data.data.latestDownloadUrlAndroid,
        response.data.data.latestDownloadUrlIOS
      );

      successCallback && successCallback(response);
    }, errorCallback);
  }

  /**
   * 检查更新
   */
  checkUpdate(kernel, version, androidUrl, iosUrl) {
    console.log('开始检查更新' + version + kernel);
    if(window.plus) {
      store.state.downloadUrl = window.plus.os.name === "iOS" ? iosUrl : androidUrl;
    } else {
      store.state.downloadUrl = androidUrl;
    }
    if(parseFloat(store.state.kernelVersion) < kernel) {
      //强制更新
      store.state.needUpdate = "force";
    } else if(parseFloat(store.state.version) < version) {
      //需要更新
      store.state.needUpdate = "need";
    } else {
      //无需更新
      store.state.needUpdate = "unwanted";
    }

  }


  downloadSplash() {
    let nameKey = "splashFileName";
    let idKey = "splashFileId";
    let pathKey = "splashPath";
    let spaceIdKey = "currentSpaceRegionalUuid";
    let that = this;
    this.httpGetSplash(readLocalStorage(spaceIdKey) ,function () {
      let splashFileId = readLocalStorage(idKey);
      if(splashFileId !== that.splash.uuid) {
        //需要下载图片 创建下载任务
        if(!that.splash.uuid) {
          console.log("不需要下载图片");
          removeLocalStorage(nameKey);
          removeLocalStorage(idKey);
          removeLocalStorage(pathKey);
        } else {
          console.log("需要下载图片  图片id-》" + splashFileId);
          let downloaderTask = store.state.plus.downloader.createDownload(that.splash.url, {}, function(d, status) {
            if (status === 200) {
              console.log("下载成功=" + that.splash.url);
              saveToLocalStorage(idKey, that.splash.uuid);
              saveToLocalStorage(nameKey, that.splash.name);
              saveToLocalStorage(pathKey, store.state.plus.io.convertLocalFileSystemURL("_downloads/" + that.splash.name));

              store.state.plus.io.resolveLocalFileSystemURL("_downloads/" + that.splash.name, function () {}, function () {
                console.log("图片并没有存在  清除缓存-》");
                removeLocalStorage(nameKey);
                removeLocalStorage(idKey);
                removeLocalStorage(pathKey);
              });
            } else {
              console.log("下载失败" + status);
              //dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
              store.state.plus.io.resolveLocalFileSystemURL("_downloads/" + that.splash.name, function(entry) {
                entry.remove(function() {
                  console.log("文件删除成功");
                }, function(e) {
                  console.log("文件删除失败");
                });
              });
            }
          });
          //启动下载任务
          downloaderTask.start();
        }
      }
    });
  }
}
