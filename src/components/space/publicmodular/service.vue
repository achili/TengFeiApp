<template>
  <div class="service-container">
    <div class="service-title" @click.stop="goClose">关闭</div>
    <div class="service-explain">设施及服务</div>
    <div class="service-list" v-for="item in serviceData" :key="item.val">
      <div class="service-item-svg" :style=" 'background:url(\''+item.ico+'\') center no-repeat'" style="width: 30px;height: 30px"></div>
      <div class="service-item-text">{{item.name}}</div>
    </div>
    <div class="service-seize"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        ServicesMap : [
          {
            val: "LED",
            name:"两个带有VGA/HDMI连接口的84\" LED",
            ico: require("../../../assets/svg/space/severs1.svg")
          },
          {
            val: "LED65",
            name:"一个带有VGA/HDMI连接口的65\" LED",
            ico: require("../../../assets/svg/space/severs1.svg")
          },
          {
            val: "LED55",
            name:"一个带有VGA/HDMI连接口的55\" LED",
            ico: require("../../../assets/svg/space/severs1.svg")
          },
          {
            val: "DEMONSTRATION",
            name:"无线演示设备",
            ico: require("../../../assets/svg/space/severs3.svg")
          },
          {
            val: "VIDEO",
            name:"企业级视频会议",
            ico: require("../../../assets/svg/space/severs4.svg")
          },
          {
            val: "MICROPHONE",
            name:"企业级桌面话筒",
            ico: require("../../../assets/svg/space/severs5.svg")
          },
          {
            val: "HORN",
            name:"顶置式喇叭",
            ico: require("../../../assets/svg/space/severs6.svg")
          },
          {
            val: "WIFI",
            name:"高速WIFI",
            ico: require("../../../assets/svg/space/severs7.svg")
          },
          {
            val: "STATIONERY",
            name:"可移动白板，带马克笔和文具",
            ico: require("../../../assets/svg/space/severs8.svg")
          },
          {
            val: "TEA",
            name:"免费咖啡/茶水",
            ico: require("../../../assets/svg/space/severs9.svg")
          },
          {
            val: "TIME",
            name:"时间",
            ico: require("../../../assets/svg/space/severs10.svg")
          },
          {
            val: "LIGHTING",
            name:"灯光",
            ico: require("../../../assets/svg/space/severs11.svg")
          },
          {
            val: "PROJECTION",
            name:"投影仪及幕布",
            ico: require("../../../assets/svg/space/severs12.svg")
          }

        ],
        serviceData:[],
        temps:this.$store.state.temps

      }
    },
    props:{
      service:{

      }
    },
    methods:{
      goClose(){
        this.temps.Service = [];
        this.$router.closeActivity()
      }
    },
    mounted(){
      for(let i = 0; i < this.ServicesMap.length; i++){
        for(let j = 0; j < this.temps.Service.length; j++){
          if(this.temps.Service[j] ===  this.ServicesMap[i].val){
            this.serviceData.push( this.ServicesMap[i])
          }
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .service-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .service-title{
      font-size: 17px;
      text-align: right;
      margin:70px 20px 100px 5% ;
      color: #00b3e5;
    }
    .service-explain{
      font-size: 20px;
      margin:0 0 35px 5%;
    }
    .service-list{
      width: 90%;
      margin: auto;
      height:30px ;
      margin-top: 25px;
      .service-item-svg{
        display: inline-block;
        float: left;
      }
      .service-item-text{
        line-height: 30px;
        display: inline-block;
        font-size: 14px;
        margin-left: 25px;
      }
    }
    .service-seize {
      height: 100px;
    }

  }
</style>
