<template>
    <div class="meeting-loading-container">
      <div class="meeting-loading-html">
          <div class="meeting-loading-text">
            <p class="meeting-text-prompt">提示：</p>
            <p class="meeting-text-loading">{{text}}</p>
          </div>
          <div class="meeting-loading-img"></div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
          return{

          }
      },
      props:{
        text:{

        }
      },
      methods:{
      },
      mounted(){

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .meeting-loading-container{
    .meeting-loading-html{
      position: fixed;
      bottom:calc(50% - 100px);
      left: 5%;
      right: 5%;
      height: 200px;
      .meeting-loading-text{
        display: inline-block;
        position: absolute;
        left: 6%;
        top: 30px;
        .meeting-text-prompt{
          margin-top: -29px;
          width: 59%;
          font-size: 18px;
          color: #fff;
        }
        .meeting-text-loading{
          margin-top: -20px;
          width: 59%;
          font-size: 18px;
          color: #fff;
        }
      }
      .meeting-loading-img{
        position: absolute;
        bottom: 75px;
        right: 0;
        display: inline-block;
        width: 152px;
        height: 167px;
        background: url("../../../src/assets/svg/space/prompt.svg") content-box no-repeat;
      }

    }
  }
</style>
