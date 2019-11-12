/*
如果不想在测试环境中出现plus调用失败的错误日志。可以在这里定义默认的 plus
 */

let plus = {
  isReady: false,
  key: {
    addEventListener() {
      console.log("addEventListener")
    }
  },
  io: {
    //读取本地文件信息
    resolveLocalFileSystemURL() {
      console.log("resolveLocalFileSystemURL")
    },
    //将快捷路径转成静态资源url
    convertLocalFileSystemURL() {
      console.log("convertLocalFileSystemURL")
    }
  },
  downloader: {
    //创建下载任务
    createDownload(URL,form,success) {
      console.log("createDownload");
      return {
        start() {
          success && success();
          console.log("start Download");
        }
      }
    }
  },
  webview: {
    currentWebview() {
      return {setStyle() {
          console.log("setStyle");
        }
      }
    }
  },
  nativeUI: {
    toast(msg) {
      console.log("show toast:" + msg);
    }
  },
  runtime: {
    quit() {
      console.log("quit app");
    },
    openURL: function (url, errorCB, identity) {
      console.log("打开URL" + url);
    }
  },
  camera: {
    getCamera() {
      console.log("getCamera");
      return {
        captureImage() {
          console.log("captureImage");
        }
      }
    }
  },
  os: {
    name: "WINDOWS"
  },
  share: {
    sendWithSystem: function () {
      console.log("sendWithSystem");
    }
  },
  geolocation: {
    getCurrentPosition() {
      console.log("getCurrentPosition");
    }
  },
  push: {
    //创建一条本地推送 option.title: (String 类型 )推送消息的标题  cover: (Boolean 类型 )是否覆盖上一次提示的消息
    createMessage(str, payload, option = {cover:false}) {
      console.log("创建了一条本地推送(" + payload + ")：" + str);
    }
  }
};
export default plus;
