<template>
  <div class="img-detail-content" @click="closeClick">
    <div class="img-detail-base" ref="swiper"  :style="'transform: translate('+deviation+'px);width:' + deviceWidth * imgDetails.length +'px;'" @touchstart="touchstart" @touchend="touchend">
      <div class="img-content" v-for="item in imgDetails" :key="item.id" :style="'width:'+ deviceWidth + 'px;'">
        <div class="img-item" v-if="imageSrcLoading !== false"
             :style="'background: url(\''+item.getLocalUrlBySize(null, deviceWidth, require('../../assets/gif/loading2.png'))+'\') no-repeat;height:' + imgHeight + ';'">
        </div>
        <div v-if="imageSrcLoading === false"  class="img-items" :style="'background: url('+background+');'">

        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Activity from "../../common/model/_base/Activity";

  export default {
    data() {
      return {
        temps: this.$store.state.temps,
        imgDetails: [],
        background:require('../../assets/gif/loading2.png'),
        deviceWidth: document.body.offsetWidth,
        deviceHeight: document.body.offsetHeight,
        imgHeight:0,
        //偏移量
        deviation:0,
        //触发距离
        triggerDistance: 90,
        triggerSpeed: 1.1,
        startTime: 0,
        startX: 0,
        imgStartX: 0,
        imgStartY: 0,
        imgStartZ: 0,//z是指放大缩小
        onClickTime: new Date(),
        closeing: false,
        imageSrcLoading:false
      }
    },
    props: {
      activity: {
        type: Activity,
        required: false
      }
    },
    components: {

    },
    methods: {
      closeClick() {
        this.$router.closeActivity();
      },
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp;
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(Math.abs(distance) > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            if(distance > 0 && this.deviation < 0) {
              this.deviation += this.deviceWidth;
              this.imgDetails.forEach(i => {
                i.resetChange();
              })
            } else if (distance < 0 && this.deviation > -this.deviceWidth * (this.imgDetails.length - 1)) {
              this.deviation -= this.deviceWidth;
              this.imgDetails.forEach(i => {
                i.resetChange();
              })
            }
          }
        }
      },
      touchmove(e) {
        if(this.closeing) {
          return;
        }
        let distance = e.changedTouches[0].clientX - this.startX;
        if(distance > this.deviceWidth / 2 && this.deviation === 0) {
          this.imgDetails.forEach(i => {
            i.resetChange();
          });
          this.closeing = true;
          this.$router.closeActivity();
        }
      }
    },
    mounted(){
      let that = this;
      this.imgDetails = this.$store.state.temps.imgDetails;
      this.imgDetails.forEach(i => {
        i.resetChange();
        i.keepLocal( null, that.deviceWidth, require("../../assets/gif/loadloading2.png"), function () {
          that.imageSrcLoading = false;
          let ifHeight , image;
          if(that.imageSrcLoading === false){
            image = new Image();
            image.src = i.url;
            image.onload = function () {
              ifHeight = Math.ceil(image.height * (that.deviceWidth / image.width));
              that.imageSrcLoading = true;
              if( that.imageSrcLoading === true && ifHeight && ifHeight !== 'NaN' && ifHeight > that.deviceHeight){
                that.imgHeight = image.height * (that.deviceWidth / image.width) + 'px';
              }else {
                that.imgHeight = '100%';
              }
            }
          }
        });
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .img-detail-content {
    height: 100vh;
    width: 100%;
    background: black;
    overflow: hidden;
    .img-detail-base{
      width: 100%;
      height: 100%;
      overflow-x: scroll;
      transition-duration: 200ms;
      .img-content{
        height: 100vh;
        overflow-y: scroll;
        float: left;
        .img-item{
          width: 100%;
          min-height: 100vh;
          background-position: center!important;
          background-size: contain!important;
        }
        .img-items{
          width: 100%;
          min-height: 100vh;
          background-size: cover !important;
          background-position: center !important;
        }
      }
    }
  }
</style>
