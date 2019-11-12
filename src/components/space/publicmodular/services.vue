<template>
    <div class="servicesContainer" @click.stop="goService">
      <div class="servicesTitle">
        设施及服务
      </div>
      <div class="services-list">
        <div v-for="service in serviceList" :key="service.type" class="services-item" >
          <div class="servicesImg" :style=" 'background:url(\''+service.ico+'\') center no-repeat'"></div>
        </div>
        <div v-if="ranks">
          <div v-if="services.length" class="services-number">
            +{{this.services.length}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
          return{
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
            serviceList:[],
            Service:[],
            temps:this.$store.state.temps
          }
        },
      props:{
          services:{

          },
          ranks:{

          }
        },
      methods:{
        goService(){
          this.temps.Service = this.Service;
          this.$router.openActivity("service","slide-left")
        }
      },
      mounted(){
        if(this.services.length <= 6){
          for(let i = 0; i < this.ServicesMap.length; i++){
            for(let j = 0; j <= 6; j++){
              if(this.services[j] ===  this.ServicesMap[i].val){
                this.Service.push(this.ServicesMap[i].val);
                this.serviceList.push( this.ServicesMap[i])
              }
            }
          }
          this.temps.Service = this.Service;
        }else if(this.ranks === "1" ){
          if(this.services.length > 6){
            for(let i = 0; i < this.ServicesMap.length; i++){
              for(let j = 0; j < 5; j++){
                if(this.services[j] ===  this.ServicesMap[i].val){
                  this.Service.push(this.ServicesMap[i].val);
                  this.serviceList.push( this.ServicesMap[i])
                }
              }
            }
            this.temps.Service = this.Service;
          }
        }else if(this.ranks === "2"){
          if(this.services.length <= 10){
            for(let i = 0; i < this.ServicesMap.length; i++){
              for(let j = 0; j <= 10; j++){
                if(this.services[j] ===  this.ServicesMap[i].val){
                  this.Service.push(this.ServicesMap[i].val);
                  this.serviceList.push( this.ServicesMap[i])
                }
              }
            }
            this.temps.Service = this.Service;
          }else if(this.services.length > 11){
            for(let i = 0; i < this.ServicesMap.length; i++){
              for(let j = 0; j <= 10; j++){
                if(this.services[j] ===  this.ServicesMap[i].val){
                  this.Service.push(this.ServicesMap[i].val);
                  this.serviceList.push( this.ServicesMap[i])
                }
              }
            }
            this.temps.Service = this.Service;
          }
        }
      }

    }
</script>

<style lang="less" rel="stylesheet/less">
  .servicesContainer{
    width: 90%;
    margin:30px 0 0 5%;;
    overflow: hidden;
    padding-bottom: 30px;
    .servicesTitle{
      font-size: 20px;
    }
    .services-list{
      .services-item{
        width: 16.5%;
        float: left;
        .servicesImg{
          width: 35px;
          height: 35px;
          margin: 10px auto;
        }
      }
      .services-number{
        width: 55px;
        display: inline-block;
        height: 55px;
        text-align: center;
        line-height: 55px;
        font-size: 20px;
        color: #00B3E5;
      }
    }
  }

</style>
