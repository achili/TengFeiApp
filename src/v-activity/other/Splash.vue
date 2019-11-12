<template>
  <div class="app-splash" :style="'background-image: url(\''+background+'\')'">

<!--    <div class="splash-top-mask"></div>-->
<!--    <div class="splash-bottom-mask"></div>-->

    <div class="count-down" @click="openHome">
      跳过{{countDown}}
    </div>
  </div>
</template>

<script>
  import Activity from "../../common/model/_base/Activity";
  import Appsettings from "../../common/model/appsettings/Appsettings";
  import {readLocalStorage, removeLocalStorage} from "../../common/util/Utils";

  export default {
    data() {
      return {
        isOpenHome: false,
        countDown: 3,
        interval: null,
        plus: this.$store.state.plus,
        appsettings: new Appsettings(),
        background: require("../../assets/splash/splash.jpg"),
        nameKey: "splashFileName",
        idKey: "splashFileId",
        pathKey: "splashPath"
      }
    },
    props: {
      activity: {
        type: Activity,
        required: true
      }
    },
    methods: {
      setSplash() {
        let that = this;
        let splashFileName = readLocalStorage(this.nameKey);
        if(splashFileName) {
          if(typeof splashFileName !== 'string') {
            console.log("设置图片出错   清除缓存");
            removeLocalStorage(this.nameKey);
            removeLocalStorage(this.idKey);
            removeLocalStorage(this.pathKey);
          } else {
            that.background = readLocalStorage(this.pathKey);
          }
        }
      },
      countDownStart() {
        let that = this;
        this.interval = setInterval(function () {
          if(!that.activity.isMostTop()) {
            clearInterval(that.interval);
            return;
          }
          if(that.countDown <= 1) {
            that.openHome();
            clearInterval(that.interval);
          }
          that.countDown--;
        },1000);
      },
      downloadSplash() {
        this.appsettings.downloadSplash();
      },
      openHome() {
        if(this.isOpenHome) {
          return;
        }
        this.isOpenHome = true;
        clearInterval(this.interval);
        this.$router.openActivity('home')
      }
    },
    mounted(){
      this.setSplash();
      this.countDownStart();
      this.downloadSplash();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .app-splash {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    .count-down {
      font-size: 13px;
      color: #eeeeee;
      padding: 5px;
      border-radius: 4px;
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(200,200,200,.5);
    }
    .splash-top-mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: url("../../assets/splash/splash-top-mask.png") 100% 0;
      background-size: cover;
      height: 350px;
      width: 100%;
    }
    .splash-bottom-mask {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: url("../../assets/splash/splash-bottom-mask.png") 0 100%;
      background-size: cover;
      height: 300px;
    }
  }
</style>
