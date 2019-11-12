<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">退款方式与周期</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">退款方式与周期</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">1.	线上退款</p>
        <p>仅支持会议室在线支付、快速入驻在线支付符合退款原则的订单，申请退款则当天原路返回。</p>
        <p>如果线上退款失败则找社区经理处理。</p>
        <p style="color: #484848;font-size: 14px;">2.	线下退款</p>
        <p>使用付款链接支付的租金、pos机支付的租金涉及退款则需要走线下退款，线下退款则需要找社区经理申请。</p>
        <p style="color: #484848;font-size: 14px;">3.	退款周期</p>
        <p>线上退款周期：申请当天退款原路返回。</p>
        <p>线下退款周期：30个工作日。</p>
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
