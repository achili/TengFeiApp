<template>
  <div class="meeting-pay">
    <div class="quick-pay-content">
      <div class="quick-pay-detail">
        <div class="quick-confirm-title">确认订单</div>
        <div class="quick-service-close" @click.stop="goClose">关闭</div>
        <div class="quick-style" v-if="spaceOrder.applyName">名称：{{spaceOrder.applyName}}</div>
        <div class="quick-style" v-else>名称：{{spaceOrder.getCharacteristicName()}}</div>
        <div class="quick-number" v-if="spaceOrder.financePayNo">订单编号：{{spaceOrder.financePayNo}}</div>
        <div class="book-date">开始日期：{{spaceOrder.startTime| allDay}}</div>
        <div class="book-date">结束日期：{{spaceOrder.endTime| allDay}}</div>
        <div class="time-length">天数：{{spaceOrder.getDateLength()}}天</div>
        <div class="one-price">单价：{{onePrice}}元/天</div>
        <div class="address" v-if="spaceOrder.spaceRegional.name">地点：{{spaceOrder.spaceRegional.name}}</div>
        <div class="address" v-else>地点：{{spaceOrder.name}}</div>
        <div class="pay-money">应付金额：
          <span class="money-style">{{spaceOrder.price}}</span>
        </div>
      </div>
    </div>

    <div class="check">
      <div class="agree">
        <NbCheckbox v-model="checked"></NbCheckbox>
        <span>我已阅读并同意遵守</span>
        <span @click="openAgreement" style="color: dodgerblue;margin-left: -10px">《奕桥会员协议》</span>
      </div>
    </div>

    <div class="submitBtn">
      <div class="confirm-pay" @click.stop="aliPayServiceOpen" >
        确认支付
      </div>
    </div>
    <AliPay :querenzhifuCall="confirmPay" class="pay-service" v-if="showAliPayService"
            :price="(appSettings.onePrice * spaceOrder.getDateLength() * spaceOrder.number).toFixed(2)"
            :closeCall="aliPayServiceClose" :typeModule = "name">
    </AliPay>
    <PayLoading class="pay-service" :state="payLoadingState" :refreshStateCall="refreshStateCall"
                v-if="payLoadingState!==0" :price="(appSettings.onePrice * spaceOrder.getDateLength() * spaceOrder.number).toFixed(2)"
                :closeCall="payLoadingCloseCall"></PayLoading>
  </div>
</template>

<script>
    import SpaceOrder from "../../../common/model/space/introduction/SpaceOrder";
    import AliPay from "../../../v-activity/more/spaceOrder/orderPay/AliPay";
    import PayLoading from "../../../v-activity/more/spaceOrder/orderPay/PayLoading";
    import {simpleDateTime, str2NoTime} from "../../../common/filter/time";
    import Base from "../../../common/model/_base/Base";
    import {getPayParamsText} from "../../../common/util/PayUtil";
    import NbCheckbox from "../../widget/NbCheckbox.vue";
    import store from "../../../_store";

    export default {
      data: function () {
        return {
          spaceOrder: new SpaceOrder(),
          appSettings: this.$store.state.appSettingList,
          callServiceShow: false,
          entity: null,
          name: "QuickIntoPay",
          showAliPayService: false,
          //0是待支付 1是支付中 2支付成功 3支付失败 4是未知 5是pos机支付
          payLoadingState: 0,
          SuZhouPayConfig: this.$store.state.SuZhouPayConfig,
          HangZhouPayConfig: this.$store.state.HangZhouPayConfig,
          onePrice: "",
          checked: true
        }
      },
      props: {
        activity: {

        },
        quickIntoPay:{

        }
      },
      components: {
        AliPay,
        PayLoading,
        NbCheckbox
      },
      watch: {
        "checked"(newValue, oldValue){
        }
      },
      methods: {
        getPrice() {
          return (this.appSettings.onePrice * this.spaceOrder.getDateLength()).toFixed(2);
        },
        confirmPay(type) {
          if(this.payLoadingState !== 0) {
            return;
          }
          this.payLoadingState = 1;
          this.aliPayServiceClose();
          let msgType = "trade.h5Pay";
          this.spaceOrder.payType = "APP_ALIPAY";
          let mid = null;
          let tid = null;
          let that = this;
          let base = new Base();
          if(type === "微信") {
            this.spaceOrder.payType = "APP_WECHAT";
          } else if(type === "银行卡") {
            this.spaceOrder.payType = "APP_BANK";
          }else if(type === "POS机"){
            this.spaceOrder.payType = "POS";
          }
          let form = {
            uuid: this.spaceOrder.uuid,
            startTime: simpleDateTime(this.spaceOrder.startTime),
            endTime: simpleDateTime(this.spaceOrder.endTime),
            number: this.spaceOrder.number,
            remarks: this.spaceOrder.remarks,
            price: this.spaceOrder.price,
            attribute: JSON.stringify(this.spaceOrder.attribute),
            spaceRegional: this.$store.state.currentSpaceRegionalUuid,//使用当前空间
            payType:this.spaceOrder.payType
          };
          base.httpPost("/quick/order/quick/into/create",form, function (res) {
            that.spaceOrder.render(res.data.data.spaceOrder);
            if(type === "POS机"){
              that.$store.state.plus.nativeUI.toast("申请已提交，到前台支付费用即可。",{duration:"short"});
              that.payLoadingState = 5;
              return;
            }
           if((that.spaceOrder.spaceRegional.name === "苏州空间" || that.spaceOrder.spaceRegional === "10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c") && type !== "微信"){
             msgType = "trade.h5Pay";
             mid = that.SuZhouPayConfig.midAli;
             tid = that.SuZhouPayConfig.tidAli;
             if(type === "银行卡") {
               mid = that.SuZhouPayConfig.midCard;
               tid = that.SuZhouPayConfig.tidCard;
               msgType = "uac.order";
             }
             let params = {
               msgSrc: that.SuZhouPayConfig.msgSrc,
               msgType: msgType,
               requestTimestamp: simpleDateTime(new Date()),
               merOrderId: res.data.data.financeBillReceipt.paymentNo,
               mid: mid,
               tid: tid,
               instMid: that.SuZhouPayConfig.instMid,
               // goods: [{goodsName: "测试商品", quantity: "1", price: "10", body: "这是测试商品哦"}],
               totalAmount:that.getPrice() * that.spaceOrder.number * 100,
               notifyUrl: that.$store.state.domain + "/api/quick/order/pay/results/call/xxxx",
               signType: "MD5"
             };
             params.notifyUrl = that.$store.state.domain + "/api/quick/order/pay/results/call/" + res.data.data.financeBillReceipt.uuid;
             //支付结束的回调
             that.$store.state.temps.endPayCall = function(url) {
               //查询支付成功状态
               that.$store.state.temps.endPayCall = undefined;
               that.payLoadingState = 4;
             };
             that.$router.openActivity("agreement", "slide-top", {enclosureUrl: "https://qr.chinaums.com/netpay-portal/webpay/pay.do?" +
                 getPayParamsText(params, that.SuZhouPayConfig.MD5key)})
             that.payLoadingState = 1;
           }else if((that.spaceOrder.spaceRegional.name === "杭州空间" || that.spaceOrder.spaceRegional === "fff031b9-c3f4-4c53-ae9f-64d0d9ee83af") && type !== "微信"){
             msgType = "trade.h5Pay";
             mid = that.HangZhouPayConfig.midAli;
             tid = that.HangZhouPayConfig.tidAli;
            if(type === "银行卡") {
               mid = that.HangZhouPayConfig.midCard;
               tid = that.HangZhouPayConfig.tidCard;
               msgType = "uac.order";
             }
             let params = {
               msgSrc: that.HangZhouPayConfig.msgSrc,
               msgType: msgType,
               requestTimestamp: simpleDateTime(new Date()),
               merOrderId: res.data.data.financeBillReceipt.paymentNo,
               mid: mid,
               tid: tid,
               instMid: that.HangZhouPayConfig.instMid,
               // goods: [{goodsName: "测试商品", quantity: "1", price: "10", body: "这是测试商品哦"}],
               totalAmount:that.getPrice() * that.spaceOrder.number * 100,
               notifyUrl: that.$store.state.domain + "/api/quick/order/pay/results/call/xxxx",
               signType: "MD5"
             };
             params.notifyUrl = that.$store.state.domain + "/api/quick/order/pay/results/call/" + res.data.data.financeBillReceipt.uuid;
             //支付结束的回调
             that.$store.state.temps.endPayCall = function(url) {
               //查询支付成功状态
               that.$store.state.temps.endPayCall = undefined;
               that.payLoadingState = 4;
             };
             that.$router.openActivity("pay_test", "slide-top", {enclosureUrl: "https://qr.chinaums.com/netpay-portal/webpay/pay.do?" +
                 getPayParamsText(params, that.HangZhouPayConfig.MD5key)})
             that.payLoadingState = 1;
           }
            if((that.spaceOrder.spaceRegional.name === "苏州空间" || that.spaceOrder.spaceRegional === "10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c") && type === "微信"){
              mid = that.SuZhouPayConfig.midWeChat;
              tid = that.SuZhouPayConfig.tidWeChat;
              let params = {
                sonMid:"898310165130871",
                merOrderId: res.data.data.financeBillReceipt.paymentNo,
                totalAmount:that.getPrice() * that.spaceOrder.number * 100,
                notifyUrl: that.$store.state.domain + "/api/quick/order/pay/results/call/xxxx",
                tradeType:"APP",
                divisionFlag:true,
                platformAmount: 0,
                msgSrc: that.SuZhouPayConfig.msgSrc,
                msgType: "wx.unifiedOrder",
                requestTimestamp: simpleDateTime(new Date()),
                mid: mid,
                tid: tid,
                instMid: "APPDEFAULT",
                signType: "MD5"
              };
              params.notifyUrl = that.$store.state.domain + "/api/quick/order/pay/results/call/" + res.data.data.financeBillReceipt.uuid;
              //支付结束的回调
              that.$store.state.temps.endPayCall = function(url) {
                //查询支付成功状态
                that.$store.state.temps.endPayCall = undefined;
                that.payLoadingState = 4;
              };
              that.spaceOrder.httWeChatPay(params, function (res) {
                console.log(res);
              });
              that.payLoadingState = 1;
            }else if((that.spaceOrder.spaceRegional.name === "杭州空间" || that.spaceOrder.spaceRegional === "fff031b9-c3f4-4c53-ae9f-64d0d9ee83af") && type === "微信"){
              mid = that.HangZhouPayConfig.midWeChat;
              tid = that.HangZhouPayConfig.tidWeChat;
              let params = {
                sonMid:"898310165130939",
                merOrderId: res.data.data.financeBillReceipt.paymentNo,
                totalAmount:that.getPrice() * that.spaceOrder.number * 100,
                notifyUrl: that.$store.state.domain + "/api/quick/order/pay/results/call/xxxx",
                tradeType:"APP",
                divisionFlag:true,
                platformAmount: 0,
                msgSrc: that.HangZhouPayConfig.msgSrc,
                msgType: "wx.unifiedOrder",
                requestTimestamp: simpleDateTime(new Date()),
                mid: mid,
                tid: tid,
                instMid: "APPDEFAULT",
                signType: "MD5"
              };
              params.notifyUrl = that.$store.state.domain + "/api/quick/order/pay/results/call/" + res.data.data.financeBillReceipt.uuid;
              //支付结束的回调
              that.$store.state.temps.endPayCall = function(url) {
                //查询支付成功状态
                that.$store.state.temps.endPayCall = undefined;
                that.payLoadingState = 4;
              };
              that.spaceOrder.httWeChatPay(params, function (res) {
                console.log(res);
              });
              that.payLoadingState = 1;
            }

          }, function () {
            that.payLoadingState = 3;
            that.$store.state.plus.nativeUI.toast("付款失败：创建付款信息单失败！",{duration:"short"});
          });

        },
        goClose(){
          this.$router.closeActivity("slide-top")
        },
        aliPayServiceClose(){
          this.showAliPayService = false;
        },
        aliPayServiceOpen(){
          let that = this;
          if(this.checked){
            that.showAliPayService = true;
          }else {
            store.state.plus.nativeUI.toast("请勾选同意上方的《奕桥会员协议》，才可确认支付来创建快速入驻的申请。")
          }
        },
        openAgreement(){
          let that = this;
          if(this.$store.state.currentSpaceRegionalUuid === "10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c"){
            //苏州
            that.$router.openActivity("agreement", "slide-top", {enclosureUrl:that.$store.state.domain + "/immotile/agreement/SuAgreement"});
          }else {
            that.$router.openActivity("agreement", "slide-top", {enclosureUrl:that.$store.state.domain + "/immotile/agreement/HangAgreement"});
          }

        },
        refreshStateCall() {
          if(this.queryLock || this.payLoadingState === 2) {
            return;
          }
          this.queryLock = true;
          let that = this;
          this.spaceOrder.httpQueryPayState(function (status) {
            if(status === "HAVE_PAY") {
              //支付成功了
              that.payLoadingState = 2;
              that.$router.closeActivity("slide-top");
            }
            that.queryLock = false;
          }, function () {
            that.queryLock = false;
          });
        },
        payLoadingCloseCall(state) {
          console.log("state");
          this.payLoadingState = 0;
          this.$router.closeActivity("slide-top", "home");
        }
      },
      mounted(){
        let that = this;
        this.spaceOrder.uuid = this.activity.query.uuid;
        if (this.spaceOrder.uuid) {
          this.spaceOrder.httpDetail(function () {
            that.$store.state.appSettingList.httpGetPrice(that.spaceOrder.spaceRegional.uuid, function () {
              that.onePrice = that.$store.state.appSettingList.onePrice;
            });
          });
        } else {
          this.$store.state.appSettingList.httpGetPrice(this.$store.state.currentSpaceRegionalUuid, function () {
            that.onePrice = that.$store.state.appSettingList.onePrice;
          });
          that.spaceOrder.render(this.$store.state.temps.tempQuickIntoBook);
          console.log(this.$store.state.temps.tempQuickIntoBook)
          this.$store.state.temps.tempQuickIntoBook = undefined;
        }

      }
    }

</script>

<style lang="less" rel="stylesheet/less">

  .meeting-pay{
    width: 100vw;
    height: 100vh;
    position: relative;
    .quick-pay-content {
      height: calc(100vh - 88px);
      width: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .quick-pay-detail {
        margin-top: 62px;
        .quick-service-close{
          font-size: 17px;
          text-align: right;
          margin:0 24px 26px 5% ;
          color: #00b3e5;
        }
        .quick-confirm-title{
          text-align: center;
          margin-bottom: 22px;
          font-size: 19px;
        }
        .quick-style{
          position: relative;
          bottom: 5px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .quick-number{
          margin-top: 35px;
          bottom: 8px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .book-date{
          margin-top: 35px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .book-time{
          margin-top: 39px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .time-length{
          margin-top:38px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .one-price{
          margin-top:39px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .address{
          margin-top:39px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .pay-money{
          margin-top:36px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .money-style{
          font-size: 19px;
          color: #00B3E5;
        }
      }
    }
    .submitBtn{
      width: 100%;
      position:absolute;
      bottom: 0;
      .confirm-pay{
        background: #00B3E5;
        line-height: 64px;
        text-decoration: none;
        color: #fff;
        text-align: center;
      }
    }

    .check{
      width: 100%;
      .agree{
        position: relative;
        bottom: 10px;
        text-align:center
      }
    }

    .pay-service {
      position: absolute;
      top: 0;
    }

  }

</style>
