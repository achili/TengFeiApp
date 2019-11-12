<template>
  <div class="pay-loading-service">
    <div class="popup animated bounceInUp">
      <div class="ali-pay-state">
        <span v-show="state===1 || state===4">支付中</span>
        <span v-show="state===2">支付成功</span>
        <span v-show="state===3">支付失败</span>
        <span v-show="state===5">等待pos机支付中</span>
      </div>
      <div class="loading-img" :style="'background:url(\''+ loadingImg() +'\') no-repeat'"></div>
      <div class="loading-price">支付金额：￥{{price}}</div>
      <div class="ali-pay-line"></div>
      <div class="cancel" @click.stop="closeOwn">
        <span v-show="state===1">请稍等</span>
        <span v-show="state===2">确定</span>
        <span v-show="state===5">去支付</span>
        <span v-show="state===3||state===4">返回</span>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loadingImg1: require('../../../../assets/pay/loading.png'),
        loadingImg2: require('../../../../assets/pay/pay_success.png'),
        loadingImg3: require('../../../../assets/pay/pay_false.png'),
        interval: null
      }
    },
    props: {
      state: {

      },
      price:{

      },
      closeCall: {
        type: Function
      },
      //刷新订单状态
      refreshStateCall: {

      }
    },
    methods: {
      closeOwn() {
        if(this.state !== 1) {
          this.closeCall()
        }
      },
      loadingImg() {
        if(this.state === 1 || this.state === 4 || this.state === 5) {
          return this.loadingImg1;
        } else if(this.state === 2) {
          return this.loadingImg2;
        } else {
          return this.loadingImg3;
        }
      },
      refreshState() {
        this.refreshStateCall && this.refreshStateCall();
      }
    },
    mounted(){
      this.interval = setInterval(this.refreshState, 2000);
    },
    beforeDestroy() {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .pay-loading-service {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    .popup {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background: #ffffff;
      color: #484848;
      .ali-pay-state {
        text-align: center;
        width: 100%;
        font-size: 16px;
        line-height: 50px;
        color: #484848;
      }
      .loading-img {
        height: 70px;
        width: 70px;
        background: url("../../../../assets/pay/loading.png")no-repeat center content-box;
        background-size: cover!important;
        margin: 0 auto 10px auto;
      }
      .loading-price {
        color: #9c9c9c;
        font-size: 12px;
        text-align: center;
        line-height: 32px;
      }
      .ali-pay-line {
        width: 90%;
        margin: auto;
        height: 1px;
        background: #f7f7f7;
      }
      .cancel {
        text-align: center;
        font-size: 16px;
        line-height: 50px;
        color: #00B3E5;
      }
    }
  }

</style>
