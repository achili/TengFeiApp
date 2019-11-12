<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">“会议室”预订&支付&取消</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">“会议室”预订&支付&取消</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">1.	谁可以预订会议室</p>
        <p>只要下载奕桥Park APP 注册后就能预订。</p>
        <p style="color: #484848;font-size: 14px;">2.	会议室的价体分为几种，有什么区别</p>
        <p>会议室的价格分为标准价格和会员价。会员则享受会员价，非会员的价格则为标准价。</p>
        <p style="color: #484848;font-size: 14px;">3.	如何成为会员</p>
        <p>已购买奕桥空间的移动办公桌、独立办公室产品的长期用户。</p>
        <p style="color: #484848;font-size: 14px;">4.	如何进行支付</p>
        <p>您可以选择线上支付（支付宝、银行卡）或者线下支付（POS机）</p>
        <p style="color: #484848;font-size: 14px;">5.	取消会议室订单</p>
        <p>如果您需要取消您预定的会议室订单，您可在我的会议室订单中取消。</p>
        <p style="color: #484848;font-size: 14px;">6.	取消会议室的原则</p>
        <p>会议室的取消原则是在预定的2个小时前可以免费取消，租金将全额退款。如果在预定的时间少于2个小时取消则租金不退回。</p>
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
