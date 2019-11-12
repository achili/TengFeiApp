<template>
    <div class="roomContainer">
      <div class="roomList">
          <div v-for="item in pager" :key="item.uuid" class="itemList">
            <div class="goRoomImg" @click.stop="goDetails(item)">
              <img :src="item.posters[0].getLocalUrlBySize(300,570, require('../../../assets/gif/loading5-3.png'))" alt="" class="roomImg">
            </div>
            <div class="roomText" @click.stop="goDetails(item)">
              <div class="roomName">房型:{{item.name}}</div>

              <div class="vipText" @click.stop="goDetails(item)">
                <div class="roomPrice">标准价:￥{{item.price}}/小时</div>
                <div class="vipPrice" @click.stop="goDetails(item)">会员价:￥{{item.vipPrice}}/小时</div>
              </div>

            </div>

            <div class="roomAddress">{{item.address}}</div>
            <div class="roomCapacity">
              <div class="capacity">
                <div :style =" 'background:url(\''+(require('../../../assets/svg/space/people.svg'))+'\') center no-repeat'" style="width: 16px;height: 28px;margin-right: 3px"></div>
                <div style="display: inline-block">{{item.getCapacityItem(item.capacity).name}}</div>
              </div>
              <div class="roomBtn">
                <div class="upData" @click.stop="goList(TypeIndex,item)">我要预订</div>
              </div>
            </div>
            <div class="roomTime">
              <Acailability :timeInfo="item.timeInfo" :timeList="item.occupyList"></Acailability>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
  import Acailability from "../publicmodular/availability"
  import ConferenceRoom from "../../../common/model/space/conferenceroom/ConferenceRoom";

    export default {
      data(){
        return{
          temps: this.$store.state.temps,
          timeInfo: {
            startTime: 0,
            endTime: 0
          }
        }
      },
      methods:{
        goList(e,activity){
          if(!activity.timeInfo.startTime) {
            this.$store.state.plus.nativeUI.toast("请选择预定时间",{duration:"short"});
            return;
          }
          this.$router.openActivity(e,"slide-left",{roomUuid:activity.uuid,startTime:activity.timeInfo.startTime,endTime:activity.timeInfo.endTime,address:activity.spaceRegional.name,spaceRegional:activity.spaceRegional.uuid})
        },
        goDetails(room){
          this.temps.rooms = room;
          this.$router.openActivity("details","slide-left");
        }
      },
      props:{
        pager:{

        },
        TypeIndex:{

        }
      },
      components:{
        Acailability
      },
      mounted(){

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .roomContainer{
      position: relative;
    .roomList{

      .itemList{
        width: 90%;
        margin: auto;
        border-bottom: 1px solid #d7dcdd;
        .goRoomImg{
          margin-top:20px;
          .roomImg{
            width: 100%;
            height: 180px;
            display: block;
            border-radius: 5px;
          }
        }
        .roomText{
          height: 25px;
          margin-top: 20px;
          line-height: 25px;
          .roomName{
            font-size: 18px;
            float: left;
          }
          .vipText{
            position: absolute;
            right: 5%;
            height: 43px;
            width: 122px;
            .roomPrice{
              font-size: 14px;
              float: right;
            }
            .vipPrice{
              font-size: 14px;
              float: right;
            }
          }
        }

        .roomAddress{
          font-size: 14px;
          color: #A2A2A2;
        }
        .roomCapacity{
          height: 30px;
          line-height: 30px;
          margin-top: 10px;
          .capacity{
            font-size: 14px;
            float: left;
            display: flex;
          }
          .roomBtn{
            float: right;
            .upData{
              width: 86px;
              display: inline-block;
              text-decoration: none;
              background-color: #000;
              color: #fff;
              font-size: 14px;
              text-align: center;
              border-radius: 3px;
            }
          }
        }
        .roomTime{
          width: 100%;
          height: 130px;
          overflow: hidden;
        }
      }
      .itemList:last-child {
        border-bottom: none;
      }
    }
  }
</style>
