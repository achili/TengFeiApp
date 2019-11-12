<template>
    <div class="loading-container" @click.stop="closeOwn">
      <div class="loading-html">
          <div class="loading-text">
            <p class="text-loading">{{title}}</p>
          </div>
          <div class="loading-img"></div>
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
        title:{

        }
      },
      methods:{
        closeOwn() {
          this.closeCall()
          this.$router.closeActivity()
        }
      },
      mounted(){

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .loading-container{
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .loading-html{
      position: fixed;
      bottom:calc(50% - 100px);
      left: 5%;
      right: 5%;
      height: 200px;
      .loading-text{
        display: inline-block;
        position: absolute;
        left: 6%;
        top: 30px;
        .text-loading{
          width: 59%;
          font-size: 18px;
          color: #fff;
        }
      }
      .loading-img{
        position: absolute;
        right: 0;
        display: inline-block;
        width: 152px;
        height: 167px;
        background: url("../../../src/assets/svg/space/prompt.svg") content-box no-repeat;
      }

    }
  }
</style>
