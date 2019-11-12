<template>
    <div class="meeting-wait-container" @click.stop="closeOwn">
      <div class="meeting-wait-html">
          <div class="meeting-wait-text">
            <p class="meeting-wait-prompt">提示：</p>
            <p class="meeting-wait-loading">{{text}}</p>
            <p class="meeting-wait-loading">{{cancel}}</p>
          </div>
          <div class="meeting-wait-img"></div>
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
        closeCall: {
          type: Function
        },
        text:{

        },
        cancel:{

        }
      },
      methods:{
        closeOwn() {
          this.closeCall()
        }
      },
      mounted(){

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .meeting-wait-container{
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .meeting-wait-html{
      position: fixed;
      bottom:calc(50% - 100px);
      left: 5%;
      right: 5%;
      height: 200px;
      .meeting-wait-text{
        display: inline-block;
        position: absolute;
        left: 1%;
        top: 30px;
        .meeting-wait-prompt{
          margin-top: -29px;
          width: 59%;
          font-size: 18px;
          color: #fff;
        }
        .meeting-wait-loading{
          margin-top: -20px;
          width: 59%;
          font-size: 18px;
          color: #fff;
        }
      }
      .meeting-wait-img{
        position: absolute;
        bottom: 50px;
        left: 58%;
        right: 0;
        display: inline-block;
        width: 152px;
        height: 167px;
        background: url("../../../../../src/assets/svg/space/prompt.svg") content-box no-repeat;
      }

    }
  }
</style>
