<template>
  <div class="welfar-activity">
    <div class="welfar-title-bar">
      福利
    </div>
    <div class="welfar-title-tab">
      <div class="welfar-tab-item" :class="tabNavigation.homeWelfare[0].active? 'active':''"
           @click.stop="clickTab(0)">企业服务</div>
      <div class="welfar-tab-item" :class="tabNavigation.homeWelfare[1].active? 'active':''"
           @click.stop="clickTab(1)">会员优惠</div>
    </div>
    <div ref="swiper" class="home-welfar-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend">
      <div class="content-item">
        <CompanyWelfar  v-show="tabNavigation.homeWelfare[0].active"></CompanyWelfar>
      </div>
      <div class="content-item">
        <MemberWelfar v-show="tabNavigation.homeWelfare[1].active"></MemberWelfar>
      </div>
    </div>
  </div>
</template>

<script>
  import MemberWelfar from '../../components/home/welfar/MemberWelfar'
  import CompanyWelfar from '../../components/home/welfar/CompanyWelfar'

  export default {
    data() {
      let deviation = 0;
      let tabNavigation = this.$store.state.tabNavigation;
      if(tabNavigation.homeWelfare[1].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth);
      }
      return {
        //偏移量
        tabNavigation: tabNavigation,
        deviation: deviation,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0
      }
    },
    components: {
      MemberWelfar,
      CompanyWelfar
    },
    methods: {
      clickTab(tabIndex) {
        this.tabNavigation.homeWelfare.forEach(tabI => {
          tabI.active = false
        });
        this.deviation = -(tabIndex * this.$refs.swiper.offsetWidth);
        this.tabNavigation.homeWelfare[tabIndex].active = true;
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(Math.abs(distance) > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            if(distance > 0 && this.deviation < 0) {
              this.deviation += this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeWelfare.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeWelfare[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeWelfare.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeWelfare[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            }
          }
        }
      }
    },
    mounted(){


    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .welfar-activity {
    .welfar-title-bar {
      padding-top: 4px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      color: #484848;
    }
    .welfar-title-tab {
      display: flex;
      .welfar-tab-item {
        color: #484848;
        flex: 1;
        text-align: center;
        line-height: 46px;
        border-bottom: 1px solid #F5F5F5;
        &.active {
          color: #00B3E4;
          border-bottom: 2px solid #00B3E4;
        }
      }
    }

    .home-welfar-content {
      position: absolute;
      top: 92px;
      width: 100%;
      bottom: 0;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: calc(100% - 50px);
        flex-shrink: 0;
      }
    }
  }
</style>
