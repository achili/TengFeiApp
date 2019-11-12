<template>
  <div class="pay-call-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="pay-method">支付方式</div>
      <div class="pay-line"></div>
      <div class="content">
        <div class="aliPayBackground"  @click.stop="aliPay">
          <div class="aliPayPicture"></div>
          <div class="aliPayText">支付宝支付</div>
          <div class="aliPayUser">推荐支付宝用户使用</div>
        </div>
      </div>
      <!--<div class="content">-->
        <!--<div class="weChatPayBackground"  @click.stop="weChatPay">-->
          <!--<div class="weChatPayPicture"></div>-->
          <!--<div class="weChatPayText">微信支付</div>-->
          <!--<div class="weChatPayUser">推荐微信用户使用</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="content">
        <div class="bankCardPayBackground"  @click.stop="bankCardPay">
          <div class="bankCardPayPicture"></div>
          <div class="bankCardPayText">银行卡支付</div>
          <div class="bankCardPayUser">推荐银行卡用户使用</div>
        </div>
      </div>
      <div class="content">
        <div class="postPayBackground"  @click.stop="postPay">
          <div class="postPayPicture"></div>
          <div class="postPayText">POS机支付</div>
          <div class="postPayUser">需要到前台支付</div>
        </div>
      </div>
      <div class="pay-line"></div>
      <div class="back" @click.stop="closeOwn">返回</div>
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
      querenzhifuCall: {
        type: Function
      },
      price:{

      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      aliPay() {
        this.querenzhifuCall("支付宝");
      },
      // weChatPay() {
      //   this.querenzhifuCall("微信");
      // },
      bankCardPay() {
        this.querenzhifuCall("银行卡");
      },
      postPay() {
        this.querenzhifuCall("POS机");
      }
    },
    mounted(){

    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .pay-call-service {
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
      .pay-method {
        text-align: center;
        width: 100%;
        font-size: 16px;
        line-height: 50px;
        color: #484848;
      }
      .pay-line {
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
    .aliPayBackground{
      border: 1px solid #dddddd;
      margin-top: -8px;
      margin-bottom: -10px;
      width: 100%;
      height: 84px;
      background: #f1f3f6;
      .aliPayPicture{
        margin-left: 33px;;
        margin-top: 21px;
        height: 40px;
        width: 40px;
        background: url("../../../../assets/pay/alipay.png")no-repeat center content-box;
        background-size: 100%;
      }
      .aliPayText{
        margin-top: -45px;
        margin-left:88px;
        font-size: 13px;
        color: #333333;
      }
      .aliPayUser{
        margin-top: -8px;
        margin-left:88px;
        font-size: 10px;
        color: #9c9c9c;
      }
    }
    /*.weChatPayBackground{*/
      /*border: 1px solid #dddddd;*/
      /*margin-top: -22px;*/
      /*width: 100%;*/
      /*height: 84px;*/
      /*background: #f1f3f6;*/
      /*.weChatPayPicture{*/
        /*margin-left: 33px;*/
        /*margin-top: 21px;*/
        /*height: 40px;*/
        /*width: 40px;*/
        /*background: url("../../../../assets/pay/wechat.png")no-repeat center content-box;*/
        /*background-size: 100%;*/
      /*}*/
      /*.weChatPayText{*/
        /*margin-top: -45px;*/
        /*margin-left:88px;*/
        /*font-size: 13px;*/
        /*color: #333333;*/
      /*}*/
      /*.weChatPayUser{*/
        /*margin-top: -8px;*/
        /*margin-left:88px;*/
        /*font-size: 10px;*/
        /*color: #9c9c9c;*/
      /*}*/
    /*}*/
    .bankCardPayBackground{
      border: 1px solid #dddddd;
      margin-top: -24px;
      margin-bottom: -17px;
      /*margin-top: -32px;*/
      /*margin-bottom: -15px;*/
      width: 100%;
      height: 84px;
      background: #f1f3f6;
      .bankCardPayPicture{
        margin-left: 33px;
        margin-top: 21px;
        height: 40px;
        width: 40px;
        background: url("../../../../assets/pay/bank_card.png")no-repeat center content-box;
        background-size: 100%;
      }
      .bankCardPayText{
        margin-top: -45px;
        margin-left:88px;
        font-size: 13px;
        color: #333333;
      }
      .bankCardPayUser{
        margin-top: -8px;
        margin-left:88px;
        font-size: 10px;
        color: #9c9c9c;
      }
    }
    .postPayBackground{
      border: 1px solid #dddddd;
      margin-top: -17px;
      margin-bottom: -15px;
      width: 100%;
      height: 84px;
      background: #f1f3f6;
      .postPayPicture{
        margin-left: 33px;
        margin-top: 21px;
        height: 40px;
        width: 40px;
        background: url("../../../../assets/pay/post_pay.png")no-repeat center content-box;
        background-size: 100%;
      }
      .postPayText{
        margin-top: -45px;
        margin-left:88px;
        font-size: 13px;
        color: #333333;
      }
      .postPayUser{
        margin-top: -8px;
        margin-left:88px;
        font-size: 10px;
        color: #9c9c9c;
      }
    }
    .back {
      text-align: center;
      font-size: 17px;
      line-height: 50px;
      background: white;
      color: #484848;
    }
  }
</style>
