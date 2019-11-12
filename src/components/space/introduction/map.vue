<template>
  <div class="mapContainer">
    <div class="mapTitle">
      <div class="title">地址</div>
      <div class="titleName" v-if="$store.state.currentSpaceRegionalAddress === '杭州空间'">杭州经济技术开发区白杨街道科技园路20号9幢</div>
      <div class="titleName" v-if="$store.state.currentSpaceRegionalAddress === '苏州空间'">苏州工业园区新平街388号腾飞科技园24幢1层</div>
      <div class="titleName" v-if="$store.state.currentSpaceRegionalAddress === '大连空间'">辽宁省大连市甘井子区机场街道昌虹社区南方向</div>
    </div>
    <div class="nb-map">
      <div class="map-box">
        <div class="map" :style="'background: url(' + getStaticImage() + ') center'"></div>
      </div>
    </div>
    <div class="goMapBtn">
      <div class="mapBtn"  @click.stop="click">360°在线看房</div>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      let self = this;
      return{
        address: "",
        lng: 1,
        lat: 1,
        markers: [],
        mapCenter: [121.491719, 31.197646],
        marker: null,
        searchOption: {
          city: '上海',
          citylimit: true
        },
        addressLng: {
          lng: 120.369518,
          lat: 30.305315
        }
        // ,
        // events: {
        //   'click': (e) => {
        //     let { lng, lat } = e.lnglat;
        //     self.lng = lng;
        //     self.lat = lat;
        //     self.fixPlace();
        //   }
        // },
        // markerEvents: {
        //   'click': (e) => {
        //     self.lng = e.target.Uh.position.lng;
        //     self.lat = e.target.Uh.position.lat;
        //     self.fixPlace();
        //   }
        // }
      }
    },
    props:{
      height: {
        required: false,
        "default": 300
      },
      width: {
        required: false,
        "default": 600
      },
      //位置信息
      position: {
        type: Object,
        required: false
      }
    },
    components:{

    },
    computed:{
      boxHeight() {
        return ((Number)(this.height)) + 150;
      },
      boxWidth() {
        return ((Number)(this.width)) + 150;
      }
    },
    methods: {
      getStaticImage(){  //&size=750*300 宽 * 高
        let that = this;
        if(this.$store.state.currentSpaceRegionalAddress && this.$store.state.currentSpaceRegionalUuid){
          this.$store.state.spaceRegionalList.forEach(item => {
            if(item.uuid === this.$store.state.currentSpaceRegionalUuid){
              that.addressLng.lng = item.longitude;
              that.addressLng.lat = item.latitude;
            }
          })
        }
        return 'http://restapi.amap.com/v3/staticmap?location=' + this.addressLng.lng + ',' + this.addressLng.lat + '&size=750*750&zoom=16&markers=mid,,A:' + this.addressLng.lng + ',' + this.addressLng.lat + '&key=0bc4ea1d32f89194bc7840b91afc7cc0';
      },
      navigateWithMap(){
        // if('Android' === plus.os.name && navigator.userAgent.indexOf('StreamApp') > 0){
        //   plus.nativeUI.toast('当前环境暂不支持地图插件');
        //   return;
        // }
        // // 设置目标位置坐标点和其实位置坐标点
        // var dst = new plus.maps.Point(116.39131928,39.90793074); // 天安门
        // var src = new plus.maps.Point(116.335,39.966); // 大钟寺
        // // 调用系统地图显示
        // plus.maps.openSysMap( dst, "天安门", src );
      },
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
            }
          }
        });
        self.marker = [self.lng, self.lat];
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
      click() {
        this.$store.state.plus.nativeUI.toast("该功能暂未开放，敬请期待",{duration:"short"});
      }
    },
    mounted() {
      if(this.position) {
        if(this.position.lng && this.position.lat) {
          this.lng = this.position.lng;
          this.lat = this.position.lat;
          this.marker = [this.lng, this.lat];
          this.mapCenter = [this.position.lng, this.position.lat];
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .mapContainer{
    width: 100%;
    height: 520px;
    padding-bottom: 20px;
    .mapTitle{
      .title{
        font-size: 20px;
        padding-top: 20px;
        margin-left:5% ;
      }
      .titleName{
        margin-top: 10px;
        font-size: 16px;
        margin-left:5%  ;
      }
    }
    .nb-map {
      width: 90%;
      height: 300px;
      position: relative;
      overflow: hidden;
      max-width: 100%;
      margin:30px 0 0  5%;
      .map-box {
        padding-bottom: 30px;
        .map {
          height: 300px;
          width: 100%;
          background-size: cover!important;
        }
      }
      .el-map-box {
        position: absolute;
        top: -150px;
        left: -150px;
        max-width: calc(100% + 300px);
      }
      #el-map {
        height: 100%;
        width: 100%;
        cursor: pointer!important;
      }
      .search-box {
        position: absolute;
        top: 25px;
        left: 20px;
      }
    }
    .goMapBtn{
      margin-top: 20px;
      .mapBtn{
        width: 90%;
        height: 48px;
        display: block;
        margin: auto;
        border: 1px solid #43C7E8;
        border-radius: 5px;
        text-decoration: none;
        color: #43C7E8;
        text-align: center;
        line-height: 48px;
        font-size: 16px;

      }
    }
  }

</style>

