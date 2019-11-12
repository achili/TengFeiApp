<template>
  <div class="send-position">
    <div class="position-map">
      <div class="close" @click="back">
        <div class="close-ico"></div>
      </div>
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <div class="share" @click.stop="publish">
        <span>确认</span>
      </div>
    </div>
    <div class="map-box" ref="mbMap">
      <NbMap :position="position"
             :width="nbMapwidth"
             :height="nbMapheight"
             :mapCenter="mapCenter"
             :markers="markers"
             ref="myMap">
      </NbMap>
    </div>
    <div class="prompt-pop">
      <div class="prompt-text">
      {{position.address}}
      </div>
    </div>
  </div>
</template>

<script>
  import NbMap from "../../components/widget/NbMap";

  export default {
    data() {
      return {
        position: {
          lng: 121.672994,
          lat: 31.225835,
          address: "",
          keyboardHeight: this.$store.state.keyboardHeight
        },
        markers: [],
        nbMapheight: 400,
        nbMapwidth: 400,
        searchOption: {
          city: '上海',
          citylimit: false
        },
        mapCenter:[121.491719, 31.197646]
      }
    },
    components: {
      NbMap
    },
    watch: {
      "keyboardHeight"() {
        this.nbMapheight = this.$refs.mbMap.offsetHeight;
      }
    },
    methods: {
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          this.position.address = pois[0].name;
          this.position.lng = pois[0].location.lng;
          this.position.lat = pois[0].location.lat;
          this.mapCenter = [this.position.lng, this.position.lat];
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
          this.$refs.myMap.refrash();
          this.$refs.myMap.enlarge();
        }
      },
      publish() {
        this.$store.state.temps.mapCallback && this.$store.state.temps.mapCallback(this.position.address + " ");
        this.$router.closeActivity();
      },
      back() {
        this.$router.closeActivity()
      }
    },
    mounted(){
      this.nbMapheight = this.$refs.mbMap.offsetHeight;
      this.nbMapwidth = this.$refs.mbMap.offsetWidth;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .send-position {
    height: 100vh;
    width: 100%;
    .position-map {
      position: relative;
      padding: 7px 6px;
      display: flex;
      background: #F9F9F9;
      border-bottom: #EFEFEF 1px solid;
      .close {
        width: 14%;
        height: 38px;
        float: left;
        .close-ico {
          background: url("../../assets/svg/home/index/circle/circle-back.svg") no-repeat 50% 50% content-box;
          height: 100%;
          width: 25px;
        }
      }
      .search-box {
        height: 38px;
        width: 70%;
        box-shadow: none;
        border: none !important;
        position: relative;
        .search-box-wrapper {
          input {
            width: 60%;
          }
          .search-btn {

          }
        }
        .search-tips {
          position: absolute;
          top: 38px;
          width: 99%;
          /*border-bottom: none !important;*/
          border: 0;
          background: rgba(0,0,0,0);
          ul {
            margin-top: 7px;
            background: white;
            li {
              font-size: 14px;
              height: 48px;
              line-height: 48px;
              box-shadow: none;
              border-bottom: 1px solid #E5E9E9;
            }
          }
        }
      }
      .share {
        width: 14%;
        display: inline-block;
        color: #1B88FF;
        text-align: right;
        font-size: 16px;
        line-height: 38px;
      }
    }
    .map-box {
      height: calc(100% - 53px);
      width: 100%;
    }
    .prompt-pop {
      position: fixed;
      bottom: 70px;
      width: calc(100% - 80px);
      margin: auto;
      background: rgba(2,132,195,0.5) content-box;
      padding: 5px 40px;
      .prompt-text {
        padding: 5px;
      }
    }
  }

</style>

