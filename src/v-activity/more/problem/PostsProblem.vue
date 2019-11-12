<template>
  <div class="posts-problem">
    <div class="posts-problem-header">
      <div class="posts-problem-title">
        <div class="posts-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="posts-problem-first-block-name">朋友圈发表异常问题</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="body">
      <div class="posts-problem-top">
        <div class="top">朋友圈发表问题</div>
      </div>

      <div class="posts-problem-content">
        <p style="color: #484848;font-size: 14px;">发不了朋友圈:</p>
        <p>1)当前连接的网络不稳定，或者发布、或发送聊天消息频繁导致。建议您可以更换其他网络，或者停止发送消息，等待24小时后再操作;</p>
        <p>2)若违规使用朋友圈被限制的话，也是无法发送的，对于这类限制无法立刻解除，如果您收到了小桥团队的提示恢复时间，请等待该时间后自动恢复。</p>
        <p style="color: #00B3E4;">温馨提示:</p>
        朋友违规是由于该帐号利用朋友圈功能恶意传播营销或色情类信息，严重影响到广大凯德集团用户正常使用及凯德集团正常运营，违反了凯德集团使用规范，  因此朋友圈功能会被限制使用。为了维护广大网友的利益，我们坚决打击此类行为。
        <p style="color: #484848;font-size: 14px;">链接地址无法被别人分享:</p>
        可能由于此链接同一时段分享给其它用户数较多导致，可更换其它时段再分享。为了更多精彩内容能被他人正常分享及转发，建议您在发布内容中不要存在诱导分享的行为。
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
