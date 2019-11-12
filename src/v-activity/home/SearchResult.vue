<template>
  <div class="search-result">
    <div class="title-bar" @click.stop="close">
      <div class="title-back pull-left"></div>
      <div class="text">搜索结果</div>
    </div>
    <div class="input-bar">
      <div class="input-box">
        <div class="search-ico"></div>
        <input v-model="searchText" @keyup.enter="refresh" />
      </div>
    </div>
    <div class="btn-bar">
      <div class="btn-tab mr25" :class="labelPosition===0? 'active':''" @click.stop="clickTab(0)">全部</div>
      <div class="btn-tab mr25" :class="labelPosition===1? 'active':''" @click.stop="clickTab(1)">发现</div>
      <div class="btn-tab mr25" :class="labelPosition===2? 'active':''" @click.stop="clickTab(2)">一起玩</div>
      <div class="btn-tab" :class="labelPosition===3? 'active':''" @click.stop="clickTab(3)">新鲜事</div>
    </div>
    <div ref="swiper" class="result-content" :style="'transform: translate('+deviation+'px)'"
         @touchstart="touchstart" @touchend="touchend">
      <div class="content-item">
        <All ref="all" v-if="labelPosition===0" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
      <div class="content-item">
        <All ref="all" v-if="labelPosition===1" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
      <div class="content-item">
        <All ref="all" v-if="labelPosition===2" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
      <div class="content-item">
        <All ref="all" v-if="labelPosition===3" :labelPosition="labelPosition" :searchText="searchText"></All>
      </div>
    </div>
  </div>
</template>

<script>
  import Activity from "../../common/model/_base/Activity";
  import All from "./search/All";

  export default {
    data() {
      return {
        searchText: "",
        labelPosition : 0,
        //偏移量
        deviation: 0,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startX: 0,
        startTime: 0
      }
    },
    props: {
      activity: {
        type: Activity,
        required: false
      }
    },
    components: {
      All
    },
    methods: {
      refresh() {
        this.$refs.all.refresh();
      },
      clickTab(labelPosition) {
        this.labelPosition = labelPosition;
        this.deviation = -(labelPosition * this.$refs.swiper.offsetWidth);
      },
      close() {
        this.$router.closeActivity("slide-top")
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
            if(distance > 0  && this.deviation < 0) {
              this.deviation += this.$refs.swiper.offsetWidth;
              this.labelPosition--;
            } else if (distance < 0 && this.deviation > -this.$refs.swiper.offsetWidth * 3) {
              this.deviation -= this.$refs.swiper.offsetWidth;
              this.labelPosition++;
            }
          }
        }
      }
    },
    mounted(){
      this.searchText = this.activity.query.searchContent;
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .search-result {
    height: 100%;
    position: relative;
    .title-bar {
      border-bottom: 1px #EFEFEF solid;
      padding: 0 20px;
      .title-back {
        width: 27px;
        height: 57px;
        background:url('../../assets/svg/register/arrow.svg') center no-repeat;
      }
      .text {
        text-align: center;
        line-height: 57px;
        font-size: 17px;
      }
    }
    .input-bar {
      padding: 20px 20px 8px 20px;
      .input-box {
        background: #F1F1F2;
        border-radius: 5px;
        padding: 8px 24px;
        display: flex;
        position: relative;
        .search-ico {
          position: absolute;
          top: calc(50% - 7px);
          left: 10px;
          width: 15px;
          height: 15px;
          background:url('../../assets/svg/home/index/search/search-ico.svg') center no-repeat;
        }
        input {
          width: 100%;
          margin-left: 10px;
          background:none;
          outline:none;
          border:0;
          font-size: 16px;
          color: #8e8e93;
        }
      }
    }
    .btn-bar {
      display: flex;
      padding: 0 20px;
      background: white;
      height: 39px;
      border-bottom: #E1E5E5 1px solid;
      .mr25 {
        margin-right: 27px;
      }
      .btn-tab {
        height: 36px;
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #8e8e93;
        line-height: 36px;
        &.active {
          border-bottom: #00B3E5 2px solid;
          color: #484848;
        }
      }
    }
    .result-content {
      height: calc(100% - 160px);
      width: 100%;
      display: flex;
      transition-duration: 200ms;
      .content-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
      }
    }

  }
</style>

