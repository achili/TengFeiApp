<template>
  <div>
    这是Text支付哦
    <div>
      <button @click="payJump1">点击支付生成订单:支付宝</button>
      <button @click="payJump2">点击支付生成订单:微信</button>
      <button @click="payJump3">点击支付生成订单:银联</button>

      <button @click="back">返回</button>
      <button @click="payTestMeeting">进入会议室支付详情</button>
    </div>
  </div>
</template>

<script>
  import {simpleDateTime, str2NoTime} from "../common/filter/time";
  import {getPayParamsText} from "../common/util/PayUtil";

  export default {
    data() {
      return {
        //来源编号
        msgSrcId: 3194,
        //消息来源
        msgSrc: "WWW.TEST.COM",
        //商户号
        midFlash: "898310148160568",
        midUnited: "898310060514001",
        //终端号
        tid: "88880001",
        //业务类型
        instMid: "H5DEFAULT",
        ////////////////////////////////////////////
        MD5key: "fcAmtnx7MwismjWNhNKdHC44mNXtnEQeJkRrhKJwyrW2ysRR"
      }
    },
    components: {

    },
    methods: {
      payJump1() {
        let params = {
          msgSrc: this.msgSrc,
          msgType: "trade.h5Pay",
          requestTimestamp: simpleDateTime(new Date()),
          merOrderId: this.msgSrcId + "BaseTest" + str2NoTime(new Date()),
          mid: this.midFlash,
          tid: this.tid,
          instMid: this.instMid,
          // goods: [{goodsName: "测试商品", quantity: "1", price: "10", body: "这是测试商品哦"}],
          totalAmount: 10,
          signType: "MD5"
        };
        this.$router.openActivity("pay_test", "slide-top", {enclosureUrl: "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do?" + getPayParamsText(params, this.MD5key)})
      },
      payJump2() {
        let params = {
          msgSrc: this.msgSrc,
          msgType: "WXPay.h5Pay",
          requestTimestamp: simpleDateTime(new Date()),
          merOrderId: this.msgSrcId + "BaseTest" + str2NoTime(new Date()),
          mid: this.midFlash,
          tid: this.tid,
          instMid: this.instMid,
          // goods: [{goodsName: "测试商品", quantity: "1", price: "10", body: "这是测试商品哦"}],
          totalAmount: 10,
          signType: "MD5"
        };
        this.$router.openActivity("pay_test", "slide-top", {enclosureUrl: "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do?" + getPayParamsText(params, this.MD5key)})
      },
      payJump3() {
        let params = {
          msgSrc: this.msgSrc,
          msgType: "qmf.h5Pay",
          requestTimestamp: simpleDateTime(new Date()),
          merOrderId: this.msgSrcId + "BaseTest" + str2NoTime(new Date()),
          mid: this.midFlash,
          tid: this.tid,
          instMid: this.instMid,
          // goods: [{goodsName: "测试商品", quantity: "1", price: "10", body: "这是测试商品哦"}],
          totalAmount: 10,
          signType: "MD5"
        };
        this.$router.openActivity("pay_test", "slide-top", {enclosureUrl: "https://qr-test2.chinaums.com/netpay-portal/webpay/pay.do?" + getPayParamsText(params, this.MD5key)})
      },
      back() {
        this.$router.closeActivity("slide-top")
      },
      payTestMeeting() {
        this.$router.openActivity("meetingPay", "slide-top", {uuid: "43b83a59-631c-4198-a33b-747f36efc10f"})
      }
    },
    mounted(){

    }
  }
</script>

