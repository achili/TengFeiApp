<template>
    <div class="details-container">
      <div class="details-top">
        <div :style =" 'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"
             style="margin-top: 15px;display:inline-block;width: 24px;height: 14px;padding-left: 9%"
             @click.stop="goClose"></div>
        <div class="details-title">详情</div>
      </div>
      <div class="details-item">
        <div class="item-name">房型：{{tempsRoom.name}}</div>
        <div class="item-capacity">
          <div :style =" 'background:url(\''+(require('../../../assets/svg/space/people.svg'))+'\') center no-repeat'" style="display:inline-block;width: 16px;height: 16px"></div>
          {{tempsRoom.getCapacityItem(tempsRoom.capacity).name}}
        </div>
        <Swiper :bannerlist="tempsRoom.posters" :name="tempsRoom.name" :introduce="tempsRoom.introduce"></Swiper>
        <div style="width: 90%;margin: auto;border-bottom: 1px solid #d7dcdd;margin-bottom: 30px"></div>
        <Services :services = "tempsRoom.services" :ranks="ranks"></Services>
        <div style="width: 90%;margin: auto;border-bottom: 1px solid #d7dcdd;margin-bottom: 30px"></div>
        <div class="roomTime">
          <div class="acailability-title">Availability</div>
          <Acailability :timeList="tempsRoom.occupyList" :timeInfo="timeInfo"></Acailability>
        </div>
        <div class="details-team">
          <Team :bannerItem="bannerItem" :title="title"></Team>
        </div>
      </div>
      <div class="details-footer">
        <div class="footer-capacity">
          <div :style =" 'background:url(\''+(require('../../../assets/svg/space/people.svg'))+'\') center no-repeat'" style="display:inline-block;width: 16px;height: 16px"></div>
          {{tempsRoom.getCapacityItem(tempsRoom.capacity).name}}
        </div>
        <div class="details-foot-btn">
          <a href="#" class="details-btn" @click.stop="goList(tempsRoom)">预订</a>
        </div>
      </div>
    </div>
</template>

<script>
  import Swiper from "./Swiper";
  import Services from "./services";
  import Team from "./team";
  import Acailability from '../publicmodular/availability'
  import Activity from "../../../common/model/_base/Activity";
  import ConferenceRoom from "../../../common/model/space/conferenceroom/ConferenceRoom";
    export default {
      data(){
        return {
          timeInfo:{
            startTime: 0,
            endTime: 0
          },
          ranks:"2",
          title:"有疑问？联系我们",
          bannerItem:this.$store.state.appSettings,
          services:["LED","DEMONSTRATION","VIDEO","MICROPHONE","HORN","WIFI","STATIONERY","TEA", "TIME","LIGHTING"],
          temps:this.$store.state.temps,
          tempsRoom: this.$store.state.temps.rooms,
          tempServices:[]
        }
      },
      props:{

      },
      components:{
        Swiper,
        Services,
        Team,
        Acailability
      },
      methods:{
        goClose(){
          this.$router.closeActivity()
        },
        goList(activity){
          this.$router.openActivity("roomBook","slide-left",{roomUuid:activity.uuid,startTime:this.timeInfo.startTime,endTime:this.timeInfo.endTime,address:activity.spaceRegional.name})
        }
      },
      mounted(){
        //this.tempsRoom.render(this.$store.state.temps.rooms);
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .details-container{
    width: 100%;
    height: 100vh;
    .details-top{
      background-color: #fff;
      height: 44px;
      width: 100%;
      margin: auto;
      .details-title{
        display: inline-block;
        font-size: 18px;
        position: relative;
        left: 40%;
        margin-left: -40px;
        height: 44px;
        line-height: 44px;
      }
    }
    .details-item{
      height: calc(100% - 110px);
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .item-name{
        margin: 20px 0 10px 5%;
      }
      .item-capacity{
        margin:0 0 30px 5%;
      }
      .roomTime{
        width: 90%;
        height: 130px;
        overflow: hidden;
        margin: auto;
        padding-bottom: 30px;
        .acailability-title{
          font-size: 20px;
        }
      }
      .details-team{
        padding-bottom: 20px;
      }
    }

    .details-footer{
      width: 100%;
      height:83px;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      .footer-capacity{
        margin:30px 0 30px 5%;
        display: inline-block;
      }
      .details-foot-btn{
        float: right;
        margin: 21px 5% 0 0;
        .details-btn{
          width: 128px;
          height: 40px;
          text-decoration: none;
          line-height: 40px;
          display: inline-block;
          text-align: center;
          background: #00B3E5;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
  }
</style>
