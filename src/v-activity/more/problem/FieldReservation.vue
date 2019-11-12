<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">“快速入驻” 预订&支付&取消</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">“快速入驻” 预订&支付&取消问题</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">1.	什么是“快速入驻”</p>
        <p>快速入驻是指购买奕桥空间内的移动办公桌，购买的时间少于28天。线上签约、线上付款，快速入驻奕桥空间。</p>
        <p style="color: #484848;font-size: 14px;">2.	最少可以预订多少天？最多可以预定多少天？</p>
        <p>最少可以预订1天，最多可以预订27天。</p>
        <p style="color: #484848;font-size: 14px;">3.	预订后可以取消订单吗？</p>
        <p>如果您还没有使用该产品可以在订单开始前1天的23:59取消该订单。</p>
        <p>举例：如果您购买了8月10日一天这一天的产品，您可以8月9号23:59取消该订单，如果超过规定的时间取消失败租金不退回。</p>
        <p style="color: #484848;font-size: 14px;">4.	可以中途退款吗？</p>
        <p>本产品不支持中途退款。</p>
        <p>举例：如果您购买了该产品7天，您使用了2天后想要把后面的剩余的3天退掉，本产品暂不支持无法退款。</p>
        <p style="color: #484848;font-size: 14px;">5.	是否可以当天预订，当天使用？</p>
        <p>可以支持当天预订当天使用。举例：8月20日预订了8月20日。</p>
        <p>但是不支持当天预订当天取消订单并退款。举例：8月20日9:00预订了8月20日一天的产品，等到10点有事情不能使用，不支持取消退款。</p>
        <p style="color: #484848;font-size: 14px;">6.	购买了“快速入驻”是否还需要线下签订会员协议</p>
        <p>“快速入驻”一但打勾我已阅读并同意遵守《奕桥会员协议》即表示同意并遵守会员协议。</p>
      </div>
    </div>


  </div>
</template>

<script>

  export default{
    data () {
      return {

      }
    },
    props:{
    },
    components: {
    },
    methods : {
      goClose(){
        this.$router.closeActivity()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .posts-problem{
    .posts-problem-header{
      .posts-problem-title{
        margin: auto;
        height: 44px;
        position: relative;
        border-bottom: #ECEEEF solid 1px;
        display: flex;
        .posts-problem-first-block-svg{
          flex:1;
          margin-top: 15px;
          width: 24px;
          height: 20px
        }
        .posts-problem-first-block-name{
          font-size: 18px;
          flex: 3;
          margin: 0 auto;
          height: 44px;
          line-height: 44px;
          text-align: center;
        }
        .close-ico-1 {
          flex:1;
        }
      }
    }
    .body{
      padding-left: 20px;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .posts-problem-top{
        padding-right: 20px;
        padding-top: 20px;
        .top{
          color: #484848;
          padding-bottom: 10px;
        }
      }
      .posts-problem-content {
        padding-right: 20px;
        font-size: 14px;
      }
    }


  }
</style>
