<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">申请发票</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">申请发票问题</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">1.	如何开发票</p>
        <p>·	会员：会员的发票根据您签订的合同中提供的信息以及开票的性质而开发票。</p>
        <p>·	非会员：如果您购买了会议室产品需要开具发票，请您将以下信息提供给社区经理。</p>
        <p style="padding-left: 20px;">1）.	姓名</p>
        <p style="padding-left: 20px;">2）.	手机号</p>
        <p style="padding-left: 20px;">3）.	公司抬头</p>
        <p style="padding-left: 20px;">4）.纳税人识别号</p>
        <p style="color: #484848;font-size: 14px;">2.	开发票的有效期</p>
        <p>开发票的有效时间30天内有效。</p>
        <p style="color: #484848;font-size: 14px;">3.	领取发票的时间</p>
        <p>杭州：请在每个月的25日9：00—17：00找社区经理领取，如入驻时间发生在当月15日之后的会员请在次月25日找社区经理领取（普票以电子发票形式发送到邮箱）。</p>
        <p>苏州：请在次月15日9：00—17：00前台找社区经理领取（普票以电子发票形式发送到邮箱）。</p>
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
