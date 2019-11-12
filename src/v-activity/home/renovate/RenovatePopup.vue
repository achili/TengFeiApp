<template>
    <div class="renovate-popup-content">
      <div class="popup animated bounceInUp">
        <div class="title">检测到有新版本，是否更新?</div>
        <div class="content">
          <div class="select">
            <div class="text" @click.stop="selectYes">是</div>
          </div>
          <div class="select">
            <div class="text" @click.stop="selectNo">否</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "RenovatePopup",
      data(){
        return {

        }
      },
      methods:{
        selectYes(){
          this.$store.state.plus.runtime.openURL(this.$store.state.downloadUrl)
        },
        selectNo(){
          if(this.$store.state.needUpdate === 'need'){
            this.$store.state.needUpdate = 'unwanted';
          }else if(this.$store.state.needUpdate === 'force'){
            this.$store.state.plus.runtime.quit();
          }
        }
      },
      mounted(){

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .renovate-popup-content{
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .popup {
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background: #F3F4F6;
      color: #484848;
      .title {
        text-align: center;
        width: 100%;
        font-size: 20px;
        line-height: 80px;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 0 20px 45px 20px;
        line-height: 30px;
        font-size: 12px;
        .select {
          width: 50%;
          .text{
            width: 126px;
            height: 40px;
            border: 1px solid #D3216F;
            border-radius: 5px;
            line-height: 40px;
            text-align: center;
            color: #D3216F;
            margin: 0 auto;
            font-size: 16px;
          }
        }

      }
    }
  }

</style>
