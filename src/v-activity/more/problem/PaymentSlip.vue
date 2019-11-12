<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">付款信息单支付</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">付款信息单支付问题</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">1.	什么时候会收到付款信息单</p>
        <p>杭州：每月的10号会收到下个月的付款信息单。</p>
        <p>苏州：每月的20号会收到下个月的付款信息单。</p>
        <p>举例：杭州的会员会在8月10日会收到9月的付款信息单。</p>
        <p>举例：苏州的会员会在8月20日会收到9月的付款信息单。</p>
        <p style="color: #484848;font-size: 14px;">2.	什么时候需要完成支付</p>
        <p>在收到付款信息单后，请尽快完成支付，以免产生滞纳金。</p>
        <p>举例：9月的付款单，请在8月31日23:59前完成支付，不然会产生滞纳金。移动办公桌会员的门禁将在9月1日失效。</p>
        <p style="color: #484848;font-size: 14px;">3.	使用付款信息单中的链接支付后如何申请退款</p>
        <p>使用付款信息单中的链接支付后申请退款需要线下找社区经理申请线下退款。</p>
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
