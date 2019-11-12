<template>
  <div class="ali-pay-call-service">
    <div class="popup animated bounceInUp">
      <div class="ali-pay-money">￥{{price}}</div>
      <div class="ali-pay-line"></div>
      <div class="content">
        <div class="ali-pay-background">
          <div class="ali-pay-picture"></div>
          <div class="ali-pay-text">支付宝支付</div>
          <div class="ali-pay-user">推荐支付宝用户使用</div>
        </div>
      </div>
      <div class="other-pay" @click.stop="payServiceOpen">
        其他支付方式&ensp;>
        <div class="other-pay-ali"></div>
        <div class="other-pay-weChat"></div>
        <div class="other-pay-bank"></div>
      </div>
      <div class="ali-pay-line"></div>
      <div class="fast-pay"  @click.stop="aliPay">立即支付</div>
      <div class="ali-pay-line"></div>
      <div class="cancel" @click.stop="closeOwn">取消</div>
    </div>

    <PayService :querenzhifuCall="querenzhifuCall" class="pay-service" v-show="showPayService" :closeCall="payServiceClose" :price="price"></PayService>
  </div>
</template>

<script>
  import PayService from "./PayService";
    export default {
      data () {
        return {
          name: "AliPay",
          showPayService:false
        }
      },
      props: {
        price:{

        },
        closeCall: {
          type: Function
        },
        querenzhifuCall: {
          type: Function
        },
        chooseOtherPay:{

        },
        typeModule:{

        }
      },
      components: {
        PayService
      },
      methods: {
        closeOwn() {
          this.closeCall()
        },
        payServiceClose() {
          this.showPayService = false;
        },
        payServiceOpen() {
          this.showPayService = true;
        },
        aliPay() {
          this.querenzhifuCall("支付宝");
        }
      },
      mounted(){

      }
    }

</script>

<style lang="less" rel="stylesheet/less">
  .pay-service{
    position: absolute;
    top: 0;
  }
  .ali-pay-call-service {
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
      .ali-pay-money {
        text-align: center;
        width: 100%;
        font-size: 18px;
        line-height: 50px;
        color: #484848;
      }
      .ali-pay-line {
        width: 90%;
        margin: auto;
        height: 1px;
        background: #f7f7f7;
      }
      .content {
        display: flex;
        height: auto;
        padding: 20px 20px 25px 20px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .ali-pay-background{
      border: 1px solid #dddddd;
      margin-top: 7px;
      margin-bottom: -10px;
      width: 100%;
      height: 78px;
      background: #f1f3f6;
      .ali-pay-picture{
        margin-left: 33px;;
        margin-top: 21px;
        height: 40px;
        width: 40px;
        background: url("../../../../assets/pay/alipay.png")no-repeat center content-box;
        background-size: 100%;
      }
      .ali-pay-text{
        margin-top: -45px;
        margin-left:88px;
        font-size: 13px;
        color: #333333;
      }
      .ali-pay-user{
        margin-top: -8px;
        margin-left:88px;
        font-size: 10px;
        color: #9c9c9c;
      }
    }
    .other-pay{
      font-size: 5px;
      margin-bottom: 9px;
      margin-left: 20px;
      line-height: 17px;
      background: white;
      color: #9c9c9c;
      .other-pay-ali{
        position: absolute;
        right: 61px;
        margin-top: -17px;
        margin-right: 20px;
        height: 14px;
        width: 14px;
        background: url("../../../../assets/pay/alipay.png")no-repeat center content-box;
        background-size: 100%;
      }
      .other-pay-weChat{
        position: absolute;
        right: 53px;
        margin-top: -17px;
        height: 15px;
        width: 15px;
        background: url("../../../../assets/pay/wechat.png")no-repeat center content-box;
        background-size: 100%;
      }
      .other-pay-bank{
        position: absolute;
        right: 21px;
        margin-top: -19px;
        height: 18px;
        width: 18px;
        background: url("../../../../assets/pay/bank_card.png")no-repeat center content-box;
        background-size: 100%;
      }
    }

    .fast-pay{
      text-align: center;
      font-size: 17px;
      line-height: 50px;
      background: white;
      color: #00B3E5;
    }
    .cancel {
      text-align: center;
      font-size: 17px;
      line-height: 50px;
      background: white;
      color: #484848;
    }
  }

</style>
