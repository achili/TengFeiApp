<template>
  <div class="call-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="item" v-if="!isCreator"  @click.stop="confirmReport">举报</div>
      <div class="item" @click.stop="confirmDel" v-if="isCreator">删除</div>
      <div class="close" @click.stop="closeOwn">取消</div>
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
      delCallBack: {
        type: Function,
        required: false
      },
      reportCallback : {
        type: Function,
        required: false
      },
      isCreator: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      confirmDel() {
        this.closeCall();
        this.delCallBack && this.delCallBack();
      },
      confirmReport() {
        this.closeCall();
        this.reportCallback && this.reportCallback();
      }
    },
    mounted(){

    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .call-service {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
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
      color: #484848;
      background: #8C8C8C;
      text-align: center;
      font-size: 16px;
      .item {
        color: #ce0058;
        line-height: 50px;
        background: white;
        margin-bottom: 6px;
      }
      .close {
        line-height: 53px;
        background: white;
      }
    }
  }
</style>
