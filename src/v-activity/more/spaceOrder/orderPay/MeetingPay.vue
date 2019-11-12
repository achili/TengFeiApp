<template>
  <div class="meeting-pay">
    <div class="meeting-pay-content">
      <div class="meeting-pay-detail">
        <div class="meeting-confirm-title">确认订单</div>
        <div class="service-close" @click.stop="goClose">关闭</div>
        <div class="name-style">会议室名称：{{spaceReservation.conferenceRoom.name}}</div>
        <div class="order-number" v-if="spaceReservation.no">订单编号：{{spaceReservation.no}}</div>
        <div class="book-date">预定日期：{{spaceReservation.startTime| allDay}}</div>
        <div class="book-time">预定时间：{{spaceReservation.startTime | timeTime}}-{{spaceReservation.endTime | timeTime}}</div>
        <div class="time-length">时长数：{{spaceReservation.getTimeLength()}}小时</div>
        <div class="one-price">单价：{{spaceReservation.conferenceRoom.price}}元/小时</div>
        <div class="address">会议室地点：{{spaceReservation.location}}</div>
        <div class="pay-money">应付金额：
          <span class="money-style">{{spaceReservation.price}}</span>
        </div>
        <div class="one-price" v-if="spaceReservation.createTime">支付剩余时间：
          <span>{{spaceReservation.getRemainingTime() }} 分钟</span>
        </div>
      </div>
    </div>
    <div class="submitBtn">
      <div class="confirm-pay" @click.stop="aliPayServiceOpen" >
        确认支付
      </div>
    </div>

      <div v-if="waitPayServiceShow">
        <MeetingWaitPayPrompt class="prompt.text" :closeCall="closeAllPopup"  @click.stop="closeWaitPayService" :text="prompt" :cancel="cancel"></MeetingWaitPayPrompt>
      </div>

    <AliPay :querenzhifuCall="confirmPay" class="pay-service" v-if="showAliPayService && userType === 'VIP'"
            :price="getPrice()"
            :closeCall="aliPayServiceClose" :type-module="name">
    </AliPay>

    <AliPay :querenzhifuCall="confirmPay" class="pay-service" v-else-if="showAliPayService && userType === 'ORDINARY'"
            :price="getPrice()"
            :closeCall="aliPayServiceClose" :type-module="name">
    </AliPay>

    <PayLoading class="pay-service" :refreshStateCall="refreshStateCall"
                :state="payLoadingState" v-if="payLoadingState!==0 && userType === 'VIP'" :price="getPrice()"
                :closeCall="payLoadingCloseCall"></PayLoading>

    <PayLoading class="pay-service" :refreshStateCall="refreshStateCall"
                :state="payLoadingState" v-if="payLoadingState!==0 && userType === 'ORDINARY'" :price="getPrice()"
                :closeCall="payLoadingCloseCall"></PayLoading>

    <div class="popup-box" v-if="callServiceShow">
      <UploadPrompt  :closeCall="closeAllPopup" :title="title"></UploadPrompt>
    </div>

  </div>
</template>

<script>
    import SpaceReservation from "../../../../common/model/space/conferenceroom/SpaceReservation";
    import ConferenceRoom from "../../../../common/model/space/conferenceroom/ConferenceRoom";
    import AliPay from "./AliPay";
    import PayLoading from "../../../../v-activity/more/spaceOrder/orderPay/PayLoading";
    import {simpleDateTime, str2NoTime} from "../../../../common/filter/time";
    import {getPayParamsText} from "../../../../common/util/PayUtil";
    import MeetingWaitPayPrompt from "./MeetingWaitPayPrompt";
    import UploadPrompt from "../../../../view/uploadPrompt/Prompt"
    import * as urlencode from "urlencode";
    import store from "../../../../_store";
    import {toFixed} from "../../../../common/filter/number";
    export default {
      data () {
        return {
          spaceReservation:new SpaceReservation(),
          conferenceRoom: new ConferenceRoom(),
          callServiceShow: false,
          title:"您好，您的会议室预订已经提交成功",
          entity: null,
          name: "MeetingPay",
          showAliPayService: false,
          //0是待支付 1是支付中 2支付成功 3支付失败 4是未知 5是pos机支付
          payLoadingState: 0,
          SuZhouPayConfig: this.$store.state.SuZhouPayConfig,
          HangZhouPayConfig: this.$store.state.HangZhouPayConfig,
          prompt:"您好，请您在15分钟内完成支付，否则订单将会自动取消！",
          cancel:"免费取消会议室在会议开始前2个小时。",
          waitPayServiceShow: false,
          queryLock: false,
          appSettings: this.$store.state.currentSpaceRegionalUuid,
          userType: null
        }
      },
      props: {
        activity: {

        },
        meetingPay:{

        }
      },
      components: {
        AliPay,
        PayLoading,
        MeetingWaitPayPrompt,
        UploadPrompt
      },
      methods: {

        getPrice() {
          let that = this;
          if(that.userType === "VIP"){
            let price = this.spaceReservation.conferenceRoom.vipPrice * this.spaceReservation.getTimeLength();
            return toFixed(price,2);
          }else if(that.userType === "ORDINARY"){
            let price = this.spaceReservation.conferenceRoom.price * this.spaceReservation.getTimeLength();
            return toFixed(price,2);
          }else {
            return 0;
          }

        },
        closeWaitPayService(){
          this.waitPayServiceShow = false
        },
        closeAllPopup() {
          this.waitPayServiceShow = false;
        },
        confirmPay(type) {
          let that = this;
          console.log(this.appSettings);
          if(this.payLoadingState !== 0) {
            return;
          }
          this.payLoadingState = 1;
          this.aliPayServiceClose();
          let msgType = null;
          this.spaceReservation.payType = "APP_ALIPAY";
          let mid = null;
          let tid = null;
          this.spaceReservation.userType = that.userType;

          if(type === "微信") {
            this.spaceReservation.payType = "APP_WECHAT";
          } else if(type === "银行卡") {
            this.spaceReservation.payType = "APP_BANK";
          }else if(type === "POS机"){
            this.spaceReservation.payType = "POS";
          }

          this.spaceReservation.httpPay(function (financeBillReceipt) {
            if(type === "POS机"){
              that.$store.state.plus.nativeUI.toast("会议室申请已提交，在15分钟内到前台支付费用即可。",{duration:"short"});
              that.payLoadingState = 5;
              return;
            }
            if(that.spaceReservation.spaceRegional.uuid === "10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c" && type !== "微信"){
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
                merOrderId: financeBillReceipt.paymentNo,
                mid: mid,
                tid: tid,
                instMid: that.SuZhouPayConfig.instMid,
                totalAmount:that.getPrice() * 100,
                notifyUrl: that.$store.state.domain + "/api/space/reservation/pay/results/call/" + financeBillReceipt.uuid,
                returnUrl: "https://fwp.allready.cc/pay/app/PaySuccess/",
                signType: "MD5"
              };
              console.log(params);
              //支付结束的回调
              that.$store.state.temps.endPayCall = function(url) {
                //查询支付成功状态
                that.$store.state.temps.endPayCall = undefined;
                that.payLoadingState = 4;
              };
              that.$router.openActivity("pay_test", "slide-top",
                {enclosureUrl: "https://qr.chinaums.com/netpay-portal/webpay/pay.do?" + getPayParamsText(params, that.SuZhouPayConfig.MD5key)});
              that.payLoadingState = 1;
            }else if(that.spaceReservation.spaceRegional.uuid === "fff031b9-c3f4-4c53-ae9f-64d0d9ee83af" && type !== "微信"){
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
                merOrderId: financeBillReceipt.paymentNo,
                mid: mid,
                tid: tid,
                instMid: that.HangZhouPayConfig.instMid,
                totalAmount:that.getPrice() * 100,
                notifyUrl: that.$store.state.domain + "/api/space/reservation/pay/results/call/" + financeBillReceipt.uuid,
                returnUrl: "https://fwp.allready.cc/pay/app/PaySuccess/",
                signType: "MD5"
              };
              console.log(params);
              //支付结束的回调
              that.$store.state.temps.endPayCall = function(url) {
                //查询支付成功状态
                that.$store.state.temps.endPayCall = undefined;
                that.payLoadingState = 4;
              };
              that.$router.openActivity("pay_test", "slide-top",
                {enclosureUrl: "https://qr.chinaums.com/netpay-portal/webpay/pay.do?" + getPayParamsText(params, that.HangZhouPayConfig.MD5key)});
              that.payLoadingState = 1;
            }
            if(that.spaceReservation.spaceRegional.uuid === "10fa0dd4-a4ab-4a4e-b265-c755a2b68a6c" && type === "微信"){
              mid = that.SuZhouPayConfig.midWeChat;
              tid = that.SuZhouPayConfig.tidWeChat;
              let params = {
                sonMid:"898310165130871",
                tradeType:"APP",
                divisionFlag:true,
                platformAmount: 0,
                msgSrc: that.SuZhouPayConfig.msgSrc,
                msgType:  "wx.unifiedOrder",
                requestTimestamp: simpleDateTime(new Date()),
                merOrderId: financeBillReceipt.paymentNo,
                mid: mid,
                tid: tid,
                instMid:"APPDEFAULT",
                totalAmount:that.getPrice() * 100,
                notifyUrl: that.$store.state.domain + "/api/space/reservation/pay/results/call/" + financeBillReceipt.uuid,
                signType: "MD5"
              };
              console.log(params);
              //支付结束的回调
              that.$store.state.temps.endPayCall = function(url) {
                //查询支付成功状态
                that.$store.state.temps.endPayCall = undefined;
                that.payLoadingState = 4;
              };
              that.spaceReservation.httWeChatPay(params, function (res) {
                console.log(res);
              });
              that.payLoadingState = 1;
            }else if(that.spaceReservation.spaceRegional.uuid === "fff031b9-c3f4-4c53-ae9f-64d0d9ee83af" && type === "微信"){
              mid = that.HangZhouPayConfig.midWeChat;
              tid = that.HangZhouPayConfig.tidWeChat;
              let params = {
                sonMid:"898310165130939",
                tradeType:"APP",
                divisionFlag:true,
                platformAmount: 0,
                msgSrc: that.HangZhouPayConfig.msgSrc,
                msgType: "wx.unifiedOrder",
                requestTimestamp: simpleDateTime(new Date()),
                merOrderId: financeBillReceipt.paymentNo,
                mid: mid,
                tid: tid,
                instMid: "APPDEFAULT",
                totalAmount:that.getPrice() * 100,
                notifyUrl: that.$store.state.domain + "/api/space/reservation/pay/results/call/" + financeBillReceipt.uuid,
                signType: "MD5"
              };
              console.log(params);
              //支付结束的回调
              that.$store.state.temps.endPayCall = function(url) {
                //查询支付成功状态
                that.$store.state.temps.endPayCall = undefined;
                that.payLoadingState = 4;
              };
              that.spaceReservation.httWeChatPay(params, function (res) {
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
          if(this.userType === "MANAGER") {
            let that = this;
            this.spaceReservation.userType = this.userType;
            this.spaceReservation.httpManageMeeting(function(response){
              if(response.data.msg === "success"){
                that.callServiceShow = true;
                that.$store.state.plus.push.createMessage("您的会议室预订已经提交成功",undefined,{title:"会议室预订已提交"});
              }else{
                store.state.plus.nativeUI.toast("对不起，您的会议室预订失败！");
              }
            });
          } else {
            this.showAliPayService = true;
          }
        },
        refreshStateCall() {
          if(this.queryLock || this.payLoadingState === 2) {
            return;
          }
          this.queryLock = true;
          let that = this;
          this.spaceReservation.httpQueryPayState(function (status) {
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
          this.payLoadingState = 0;
          this.$store.state.temps.refrashSpaceReservations && this.$store.state.temps.refrashSpaceReservations();
          this.$router.closeActivity("slide-top", 'home');
        }
      },
      mounted(){
        let that = this;
        this.spaceReservation.uuid = this.activity.query.uuid;
        if (this.spaceReservation.uuid) {
          this.spaceReservation.httpDetail(function () {
            that.userType = that.spaceReservation.type;
            if(that.userType !== "MANAGER"){
              that.waitPayServiceShow = true;
            }
          });
        } else {
          let form = {
            spaceRegionalUuid: this.$store.state.currentSpaceRegionalUuid
          };
          this.spaceReservation.httpPost("/space/reservation/get/user/type", form, function(response){
            that.userType = response.data.data.userType;
            if(that.userType !== "MANAGER"){
              that.waitPayServiceShow = true;
            }
          });
          that.spaceReservation.render(this.$store.state.temps.tempRoomBook);
          console.log(this.$store.state.temps.tempRoomBook)
          this.$store.state.temps.tempRoomBook = undefined;
        }
      }
    }

</script>

<style lang="less" rel="stylesheet/less">

  .meeting-pay{
    width: 100vw;
    height: 100vh;
    position: relative;
    .meeting-pay-content {
      height: calc(100vh - 88px);
      width: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .meeting-pay-detail {
        margin-top: 62px;
        .service-close{
          font-size: 17px;
          text-align: right;
          margin:0 24px 26px 5% ;
          color: #00b3e5;
        }
        .meeting-confirm-title{
          text-align: center;
          margin-bottom: 22px;
          font-size: 19px;
        }
        .name-style{
          bottom: 48px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .order-number{
          margin-top: 39px;
          bottom: 8px;
          font-size: 14px;
          margin-left: 29px;
          color: #666666;
        }
        .book-date{
          margin-top: 31px;
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
    .pay-service {
      position: absolute;
      top: 0;
    }
  }

</style>
