<template>
  <div class="about-bridge">
    <div class="about-bridge-header">
      <div class="about-bridge-title">
        <div class="about-bridge-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../../assets/svg/register/arrow.svg'))+'\') center no-repeat'"></div>
        <div class="about-bridge-first-block-name">关于奕桥</div>
      </div>
    </div>
    <div class="about-bridge-content">
      <div class="about-bridge-box">
        <h3>Bridge+ Intro</h3>
        奕桥|Bridge+是凯德集团旗下的精品联合办公空间和线上线下贯通的互动创新平台。新生代的办公需求对空间的演进提出了新的挑战，如何既专注又充满活力，如何通过共享优化资源，如何更方便地促成协作，如何助力企业和个人交流和发展？奕桥|Bridge+的诞生是对社会和时代发展的一种回声。
        <h4>空间</h4>
        <h4>为专注办公而生</h4>
        奕桥|Bridge+并没有为了灵活性而妥协空间品质。于它而言，办公空间的核心依旧是为专注力和专业度服务。无论是设计、建造和运营，每一个环节，都细致考虑了日常使用场景和用户需求。分而治之公共区域和私密空间，动静结合； 悉心选择环保材料和办公家具，确保舒适；配备先进的门禁及访客系统，安全无忧。即使空间大小各异，甚至位于不同的城市或国度，我们的空间都标配：
        <p>-移动办公桌</p>
        即来即用，为自由职业者和移动办公人士提供灵活的办公选择。一张桌子，随时开始工作。
        <p>-独立办公室</p>
        独立的办公室，享有更安全和私密的空间。办公桌椅、文件柜，一应俱全，可容纳不同规模的团队。
        <p>-共享会议室</p>
        按小时预定的会议室，可容纳不同规模的会议，配备齐全的音频、投影及视频会议设备。更配备针对高层会议的行政会议室和独立预备空间。
        <p>-活动场地</p>
        不同的活动场地满足不同的活动需求，无论是专业的论坛讲座，还是半开放的分享展示，奕桥|Bridge+都可以满足。亦可按需提供场地布置和餐食服务。
        <p>在这里，好奇者，探险家和创造者一起急速前行，探索和寻找打开明日世界大门的新方法和新策略。而奕桥|Bridge+是最坚实的后盾。我们提供的不仅包括空间解决方案，还有一站式的服务和合作，担负起“桥”的意义。</p>
        <h4>服务</h4>
        <h4>放大你的世界</h4>
        在这里，好奇者，探险家和创造者一起急速前行，探索和寻找打开明日世界大门的新方法和新策略。而奕桥|Bridge+是最坚实的后盾。我们提供的不仅包括空间解决方案，还有一站式的服务和合作，担负起“桥”的意义。
        <p class="left">-	解放你的手脚 Free your hands</p>
        <p>一切繁杂重复劳动交给我们的社区团队，你可集中精力关注业务和发展本身。传统前台和线上服务互相备份，即可走心亦可走脑，解决各种后顾之忧</p>
        <p class="left">-	扩大资源网络 Plug into Network</p>
        <p>一个越来越紧密的世界，意味着跨界协作将起到越来越重要的作用。依托多年积淀，我们的平台已联结起250000知识型员工，2400家世界顶尖企业，一键接入，打开更广阔的商务世界。</p>
        <p class="left">-	换个角度看世界 Sharp the Mind</p>
        作为一个成长型社区，我们以线上线下活动为桥梁，促成新资讯的分享，新思维的碰撞，新技能的演练，解锁更多潜能，真正为企业和个人发展带来价值。
        <p>作为凯德集团在共享经济及创新互动领域的全新探索，奕桥|Bridge+连结起人与空间，工作与生活，办公与商业，并持续以开放的心态来拥抱碰撞和可能，拥抱意料之外的灵感与火花。2017年10月，奕桥|Bridge+第一个中心在新加坡成功开启并获得行业和用户的一致认可，它的征程由此迅速展开，中国上海，杭州，苏州，印度班加罗尔，全速进行中。</p>
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
  .about-bridge{
    .about-bridge-header{
      padding: 10px 20px 10px 20px;
      .about-bridge-title{
        position: relative;
        font-size: 18px;
        .about-bridge-first-block-svg{
          height: 30px;
          width: 30px;
          display: inline-block;
        }
        .about-bridge-first-block-name{
          display: inline-block;
          position: absolute;
          right: 38%;
        }
      }
    }
    .about-bridge-content {
      height: 100vh;
      overflow-y: scroll;
      .about-bridge-box{
        padding:0 15px 60px 20px;
        font-size: 14px;
        .left{
          padding-left: 30px;
        }
      }
    }

  }
</style>
