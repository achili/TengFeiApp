<template>
  <div class="nb-map" :style="'height:calc(100% + 100px);width:'+width+'px'">
    <el-amap :scrollWheel="false" :keyboardEnable="false" ref="elAmap"
             :zooms="zooms"
             class="el-map-box"
             vid="el-map"
             :style="'height:100%;width:'+boxWidth+'px'"
             :events="events"
             :center="mapCenter">
      <el-amap-marker :bubble="false" v-for="marker in markers" :position="marker" :key="marker.index" :events="markerEvents"></el-amap-marker>
      <el-amap-marker :zIndex="101" :icon="require('../../assets/img/mark_bs.png')" v-if="marker" :position="marker"></el-amap-marker>
    </el-amap>

    <div class="toolbar" @click="getGeocode">

      <div class="xin"></div>
      <div class="toolbar-loaded" v-if="!loaded"><i class="fa fa-spinner fa-spin fa-fw"></i></div>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      let self = this;
      return{
        zooms: [4, 15],
        loaded: true,
        address: "",
        lng: 1,
        lat: 1,
        mapCenter: [121.491719, 31.197646],
        marker: null,
        events: {
          'click': (e) => {
            let { lng, lat } = e.lnglat;
            self.lng = lng;
            self.lat = lat;
            self.fixPlace();
          }
        },
        markerEvents: {
          'click': (e) => {
            self.lng = e.target.Uh.position.lng;
            self.lat = e.target.Uh.position.lat;
            self.fixPlace();
          }
        }
      }
    },
    props:{
      markers:{},
      height: {
        required: false,
        "default": 300
      },
      width: {
        required: false,
        "default": 900
      },
      //位置信息
      position: {
        required: false
      }
    },
    components:{

    },
    computed:{
      boxHeight() {
        return ((Number)(this.height)) + 100;
      },
      boxWidth() {
        return ((Number)(this.width)) + 100;
      }
    },
    methods: {
      fixPlace() {
        let self = this;
        // 这里通过高德 SDK 解析经纬度完成。
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress([self.lng ,self.lat], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              self.address = result.regeocode.formattedAddress;
              self.position.address = self.address;
            }
          }
        });
        self.marker = [self.lng, self.lat];
        this.position.lng = self.lng;
        this.position.lat = self.lat;
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.mapCenter = [center.lng, center.lat];
        }
      },
      getGeocode(){
        let that = this;
        this.loaded = false;
        this.$store.state.plus.geolocation.getCurrentPosition( function (position) {
          that.loaded = true;
          that.lng = position.coords.longitude;
          that.lat = position.coords.latitude;
          that.marker = [that.lng, that.lat];
          that.mapCenter = [that.lng, that.lat];
          that.fixPlace();
        }, function (e) {
          that.loaded = true;
          console.error(e.message);
          that.plus.nativeUI.toast("获取位置信息失败！",{duration:"short"});
        },{enableHighAccuracy:true, timeout: 10000});
      },
      refrash() {
        if(this.position) {
          if(this.position.lng && this.position.lat) {
            this.lng = this.position.lng;
            this.lat = this.position.lat;
            this.marker = [this.lng, this.lat];
            this.mapCenter = [this.lng, this.lat];
          }
        }
      },
      enlarge() {
        this.$refs.elAmap.$$getInstance().setZoom(13);
      }
    },
    mounted() {
      this.refrash();
      this.getGeocode();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    .nb-map {
      position: relative;
      overflow: hidden;
      max-width: 100%;
      .position-map {
        position: relative;
        padding: 10px 20px 0 20px;
        background: #F9F9F9;
        border-bottom: #EFEFEF 1px solid;
        .close {
          width: 13%;
          height: 40px;
          display: inline-block;
          margin-top: 5px;
          float: left;
          .close-ico {
            background: url("../../assets/svg/home/index/circle/circle-back.svg") no-repeat 50% 50% content-box;
            height: 100%;
            width: 25px;
          }
        }
          .search-box {
            display: inline-block;
            height: 30px;
            width: 70%;
            margin:10px 0;
            box-shadow: none;
            border: none;
            .search-box-wrapper {
              input {
                width: 60%;
              }
            }

            .search-tips {
              border: none;
              width: 99%;

              li {
                height: 25px;
                line-height: 25px;
              }
            }
          }
        .share {
          display: inline-block;
          color: #1B88FF;
          text-align: right;
          font-size: 16px;
          float: right;
          line-height: 50px;
        }
      }
      .el-map-box {
        position: absolute;
        top: -50px;
        left: -50px;
        max-width: calc(100% + 100px);
      }
      #el-map {
        height: 100%;
        width: 100%;
        cursor: pointer!important;
      }

      .toolbar {
        position: fixed;
        bottom: 30px;
        right: 20px;
        height: 30px;
        width: 30px;
        border-radius: 100%;
        background: white;
        .toolbar-loaded {
          height: 100%;
          width: 100%;
          line-height: 30px;
          text-align: center;
        }
        .xin {
          position: absolute;
          height: 20px;
          width: 20px;
          top: 5px;
          left: 5px;
          background: #6f7180;
          border-radius: 100%;
        }
      }
    }
</style>
