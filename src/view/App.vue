<template>
  <div class="main-app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../common/util/Utils";
  import store from "../_store";

export default {
  name: 'app',
  data () {
    return {
      user: this.$store.state.user,
      plus: this.$store.state.plus,
      originalHeight: 0,

      appsettings: this.$store.state.splash,
      nameKey: "splashFileName",
      idKey: "splashFileId",
      pathKey: "splashPath"
    }
  },
  methods: {
    downloadSplash() {
      let that = this;
      this.appsettings.uuid = "233";
      this.appsettings.httpDetail(function () {
        let splashFileId = readLocalStorage(that.idKey);
        if(splashFileId !== that.appsettings.splash.uuid) {
          //需要下载图片 创建下载任务
          if(!that.appsettings.splash.uuid) {
            console.log("不需要下载图片");
            removeLocalStorage(that.nameKey);
            removeLocalStorage(that.idKey);
            removeLocalStorage(that.pathKey);
          } else {
            console.log("需要下载图片  图片id-》" + that.appsettings.splash.uuid);
            let downloaderTask = window.plus.downloader.createDownload(that.appsettings.splash.url, {}, function(d, status) {
              if (status === 200) {
                console.log("下载成功=" + that.appsettings.splash.url);
                saveToLocalStorage(that.idKey, that.appsettings.splash.uuid);
                saveToLocalStorage(that.nameKey, that.appsettings.splash.name);
                saveToLocalStorage(that.pathKey, window.plus.io.convertLocalFileSystemURL("_downloads/" + that.appsettings.splash.name));

                window.plus.io.resolveLocalFileSystemURL("_downloads/" + that.appsettings.splash.name, function () {

                }, function () {
                  console.log("图片并没有存在  清除缓存-》");
                  removeLocalStorage(that.nameKey);
                  removeLocalStorage(that.idKey);
                  removeLocalStorage(that.pathKey);
                });

              } else {
                console.log("下载失败" + status);
                //dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
                window.plus.io.resolveLocalFileSystemURL("_downloads/" + that.appsettings.splash.name, function(entry) {
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
  },
  mounted(){
    Vue.http.headers.common['Authorization'] = this.user.session;
    let that = this;
    //单页应用，在登录成功后更新一次用户的信息
    this.user.httpUpdateInfo(function () {}, function () {
      console.error("Update user information failure");
    });
    this.appsettings.getAppSeting(null, function () {}, function () {
      console.error("get getAppSeting information failure");
    });
    setInterval(function () {
      if(store.state.spaceRegionalList && store.state.spaceRegionalList != null && store.state.spaceRegionalList.length === 0 && store.state.spaceRegionalList.length < 3){
        console.log("轮询位置信息失败，重新请求。");
        that.appsettings.getAppSeting(null, function () {}, function () {
          console.error("get getAppSeting information failure");
        });
      }else {
          console.log("轮询位置信息成功。")
      }
    },10000);
    this.originalHeight = document.documentElement.clientHeight || document.body.clientHeight;

    let splashFileName = readLocalStorage(this.nameKey);
    // if(this.$store.state.debug) {
    //   if(splashFileName) {
    //     that.$router.push("/app/splash");
    //   } else {
    //     that.$router.push("/app/home");
    //     that.downloadSplash();
    //   }
    // }
    document.addEventListener("plusready",function () {
      if(splashFileName) {
        that.$router.push("/app/splash");
      } else {
        that.$router.push("/app/home");
        that.downloadSplash();
      }
      window.plus.navigator.closeSplashscreen();
      // Android处理返回键
      window.plus.key.addEventListener('backbutton', function(){
        if(that.$store.state.newsDetailShow) {
          that.$store.state.newsDetailShowFunction && that.$store.state.newsDetailShowFunction();
        } else {
          that.$router.closeActivity();
        }
      }, false);

      window.plus.webview.currentWebview().setStyle({
        height: that.originalHeight
      });
      window.onresize = function(){
        //软键盘弹起与隐藏  都会引起窗口的高度发生变化
        let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(resizeHeight < that.originalHeight){ //resizeHeight<originalHeight证明窗口被挤压了
          that.$store.state.keyboardHeight = that.originalHeight - resizeHeight;
          window.plus.webview.currentWebview().setStyle({
            height: that.originalHeight
          });
        } else {
          that.$store.state.keyboardHeight = 0;
        }
      }
    });
    //放在输入法挤压
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  @font-face {
    font-family: PINGFANG;
    src: url("/static/font/PINGFANG_MEDIUM.TTF") format("truetype");
  }
  @font-face {
    font-family: HELVETICA_NEUE;
    src: url("/static/font/HELVETICA_NEUE.TTF") format("truetype");
  }
  .main-app {
    font-family: "Helvetica Neue",HELVETICA_NEUE, PINGFANG, "PINGFANG", serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }
  html, body {
    background-color: white;
    min-height: 100vh;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
</style>
