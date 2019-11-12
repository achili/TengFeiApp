<template>
  <div class="about">
    <div class="about-header">
      <div class="about-first-block">
        <div class="about-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'">
        </div>
        <div class="about-first-block-name">
          关于
        </div>
      </div>
    </div>

    <div class="about-pic">
      <div :style="'background: url(\''+background+'\') no-repeat; height: 100px;width: 150px;margin: 0 auto;background-size: contain;'"></div>
      <div class="about-pic-title">
        奕桥 Bridge+ {{version}}
      </div>
    </div>

    <div class="about-button">
      <div class="about-button-block-1" @click="about">
        关于奕桥
      </div>
      <div class="about-button-block-2" @click="agreement">
        用户协议
      </div>
    </div>

    <div class="about-footer">
      凯德集团版权所有 © 1997-2018
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        version: this.$store.state.version,
        user: this.$store.state.user,
        background: require("../../assets/more/about/bridge.png")
      }
    },
    components: {

    },
    methods: {
      about(){
        this.$router.openActivity('about_bridge');
      },
      agreement(){
        this.$router.openActivity('user_agreement');
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .about {
    position: relative;
    height: 90vh;
    .about-header {
      padding: 10px 20px 10px 20px;
      .about-first-block {
        position: relative;
        font-size: 18px;
        .about-first-block-svg {
          height: 30px;
          width: 30px;
          display: inline-block;
        }
        .about-first-block-name {
          display: inline-block;
          position: absolute;
          right: 46%;
        }
      }
    }
    .about-pic {
      background-color: #F7F7F7;
      padding: 30px 0;
      .about-pic-title {
        text-align: center;
        font-size: 18px;
      }
    }
    .about-button {
      padding-top: 70px;
      .about-button-block-1 {
        border: 1px solid #ccc;
        width: 150px;
        margin: 0 auto;
        text-align: center;
        padding: 10px 0;
      }
      .about-button-block-2 {
        border: 1px solid #ccc;
        width: 150px;
        margin: 30px auto;
        text-align: center;
        padding: 10px 0;
      }
    }
    .about-footer {
      position: absolute;
      bottom: 0;
      left: 16%;
      color: #ccc;
    }
  }
</style>
