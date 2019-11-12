<template>
  <div>
    <div style="line-height: 40px;text-align: center;">
      空间
    </div>
    <div class="space-home">
      <div class="space-tab">
        <div class="tab-item" :class="tab.active? 'active':''" v-for="tab in tabNavigation.homeSpace" :key="tab.index" @click="clickTab(tab)">
         {{tabsStyle[tab.key]}}
        </div>
      </div>
      <div ref="swiper" class="space-container" :style="'transform: translate('+deviation+'px)'"
           @touchstart="touchstart" @touchend="touchend">
        <div class="content-item">
          <Introduction v-if="tabNavigation.homeSpace[0].active"></Introduction>
        </div>
       <div class="content-item">
         <DataFilter v-if="tabNavigation.homeSpace[1].active" :pager="pager" :callback="search"></DataFilter>
         <ConferenceRoom v-if="tabNavigation.homeSpace[1].active"></ConferenceRoom>
       </div>
       <div class="content-item">
         <ActiveSite v-if="tabNavigation.homeSpace[2].active"></ActiveSite>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DataFilter from "../../components/space/publicmodular/datafilter";
  import Introduction from "../../components/space/Introduction";
  import ConferenceRoom from "../../components/space/ConferenceRoom";
  import ActiveSite from "../../components/space/ActiveSite";
  import Tank from "../../common/model/tank/Tank";
  export default {
    data() {
      let deviation = 0;
      let tabNavigation = this.$store.state.tabNavigation;
      if(tabNavigation.homeSpace[1].active) {
        deviation = -(document.documentElement.clientWidth || document.body.clientWidth);
      } else if(tabNavigation.homeSpace[2].active) {
        deviation = -(2 * document.documentElement.clientWidth || document.body.clientWidth);
      }
      return {
        pager: this.$store.state.conferencePage,
        tabNavigation: this.$store.state.tabNavigation,
        tabsStyle: {
          introduction:  "简介",
          conferenceRoom: "会议室",
          activeSite: "活动场地"
        },
        //偏移量
        deviation: deviation,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0,
        show: false,
        temps:this.$store.state.temps
      }
    },
    components: {
      Introduction,
      ConferenceRoom,
      ActiveSite,
      DataFilter
    },
    watch:{
      // 'deviation'(){
      //   this.temps.homeMaskHide();
      // }
    },
    methods: {
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh() {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.data.forEach(data => {
            if(data.posters) {
              Tank.keepLocalList(data.posters, 300, 570)
            }
          });
        },function () {
        });
      },
      callBack() {
        this.show = !this.show;
      },
      clickTab(tab) {
        this.tabNavigation.homeSpace.forEach(tabI => {
          tabI.active = false
        });
        this.deviation = -(this.tabNavigation.homeSpace.indexOf(tab) * this.$refs.swiper.offsetWidth);
        tab.active = true;
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
              this.tabNavigation.homeSpace.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeSpace[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * 2) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.tabNavigation.homeSpace.forEach(tabI => {
                tabI.active = false
              });
              this.tabNavigation.homeSpace[Math.abs(this.deviation) / this.$refs.swiper.offsetWidth].active = true;
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

  .space-home{
    height: 100%;
    width: 100%;
    .space-container{
      height: calc(100vh - 93px - 50px);

      transition-duration: 200ms;
      width: 100%;
      bottom: 0;
      display: flex;
      .content-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
      }
    }
    .space-tab{
      background: white;
      border-top: 1px solid #EDEFEF;
      border-bottom: 1px solid #EDEFEF;
      .tab-item {
        width: 33%;
        display: inline-block;
        text-align: center;
        line-height: 55px;
        font-size: 16px;
        &.active {
          color: #00B3E5;
          border-bottom: 2px solid #00B3E5;
        }
      }
    }

  }
</style>
