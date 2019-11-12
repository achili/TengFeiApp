<template>
  <div class="select-order-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title">确定取消该{{title}}吗?</div>
      <div class="content">
        <div class="select" >
          <div class="text" @click.stop="selectYes(entity)">是</div>
        </div>
        <div class="select" >
          <div class="text" @click.stop="selectNo">否</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    props: {
      closeCall: {
        type: Function
      },
      title:{

      },
      entity:{

      },
      refresh:{
        type: Function
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      selectYes(e) {
        let that = this;
        e.httpDel(function () {
          that.refresh(function () {

          });
        }, function () {

        });
        this.closeCall()
      },
      selectNo() {
        this.closeCall()
      }
    },
    mounted(){

    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .select-order-service {
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
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      background: white;
      color: #484848;
      .title {
        padding-top: 10px;
        text-align: center;
        width: 100%;
        font-size: 20px;
        line-height: 50px;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 10px 25px 30px 25px;
        font-size: 12px;
        color: #ce0058;
        .select {
          width: 50%;
          .text{
            width: 145px;
            height: 45px;
            border: 2px solid #ce0058;
            border-radius: 8px;
            line-height: 45px;
            text-align: center;
            margin: auto;
            color: #ce0058;
            font-size: 16px;
          }
        }

      }
    }
  }
</style>
