<template>
  <div class="activity-detail">

   <div class="activity-header">
     <div class="activity-first">
       <div class="activity-first-block-svg" @click="back" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'"></div>
       <div class="activity-first-block-name">详情</div>
       <div class="activity-first-share-svg" @click="openShare" :style="'background:url(\''+(require('../../assets/svg/register/share.svg'))+'\') center no-repeat'" ></div>
     </div>
   </div>

    <div class="activity-body">
        <div class="activity-body-cell">

          <div class="title">{{communityEvent.title}}</div>
          <div class="title-bottom">{{communityEvent.startTime | date("MM月dd日，")}}{{communityEvent.startTime | date2Weekday }}</div>
          <div class="image" :style="'background: url(\''+communityEvent.poster.getLocalUrlBySize(281,375)+'\') center'"></div>
          <div class="date" v-if="communityEvent.endTime.getTime() === communityEvent.startTime.getTime()">
            <div class="top-tag">时间</div>
            <div class="content">{{communityEvent.startTime | newsTime }}</div>
            <div class="content-date">{{communityEvent.startTime | date("hh")}}AM-{{communityEvent.endTime | date("hh") }}PM</div>
          </div>
          <div class="date" v-if="communityEvent.endTime.getTime() > communityEvent.startTime.getTime()">
            <div class="top-tag">时间</div>
            <div class="content">报名时间:{{communityEvent.startTime | activityTime }} 至 {{communityEvent.endTime | activityTime}}</div>
            <div class="content-black">活动时间:{{communityEvent.timeStart | activityTime }} 至 {{communityEvent.timeEnd | activityTime}}</div>
          </div>
          <div class="segmenting-line">
            <div class="segmenting"></div>
          </div>

          <div class="description" v-html="replaceBr(communityEvent.description)"></div>


          <div class="segmenting-line">
            <div class="segmenting"></div>
          </div>

          <div class="address">
            <div class="top-tag">地址</div>
            <div class="content">{{communityEvent.address.address}}</div>
          </div>


          <div class="map">
            <div class="img" :style="'background: url(\''+communityEvent.getStaticImage()+'\') center'"></div>
          </div>

        </div>
    </div>

    <div v-show="!communityEvent.loading">
      <div class="activity-btm" v-if="communityEvent.state === true">
        <div class="btn-all"> 已报名 </div>
      </div>

      <div class="activity-btm" v-else-if="communityEvent.state === false && overdueTime.getTime()>communityEvent.endTime.getTime()">
        <div class="btn-all"> 已过期 </div>
      </div>

      <div class="activity-bottom" @click.stop="confirmEnroll(communityEvent)" v-show="enroll" v-else>
        <div class="btn-all"> 报名 </div>
      </div>
    </div>




    <div class="popup-box" v-show="enrollShow">
      <Enroll :closeEnroll="closeAllPopup" :queren="queren"></Enroll>
    </div>

  </div>
</template>

<script>
  import CommunityEvents from "../../common/model/community/CommunityEvents";
  import Enroll from '../../v-activity/home/activity/Enroll'
  import {date2Weekday} from "../../common/filter/time";
  import {replaceBr} from "../../common/filter/str";

  export default {
    data() {
      return {
        communityEvent: new CommunityEvents(),
        enrollShow: false,
        enroll: true,
        overdueTime:new Date()
      }
    },
    props: { },
    components: {
      Enroll
    },
    methods: {
      replaceBr(str) {
        return replaceBr(str);
      },
      openShare() {
        this.communityEvent.shareSystem(this.communityEvent.title,this.communityEvent.uuid);
      },
      confirmEnroll(communityEvent) {
        let that = this;
        let time = new Date();
        let date = new Date(time).getTime();
        let endTime = new Date(this.communityEvent.endTime).getTime();
        if(date > endTime ){
          that.$store.state.plus.nativeUI.toast("该活动已经过期！",{duration:"short"});
        }else{
          this.enrollShow = true;
          this.enroll = false;
        }
      },
      queren() {
        let that = this;
        this.communityEvent.httpEnroll(function () {
          that.$store.state.plus.nativeUI.toast("报名成功！",{duration:"short"});
          that.communityEvent.httpDetail(function () {
            that.communityEvent.poster.keepLocal(281,375);
          });
        });
      },
      back() {
        this.$router.closeActivity()
      },
      closeAllPopup(){
        this.enrollShow = false;
        this.enroll = true;
      }
    },
    mounted(){
      let that = this;
      this.communityEvent.uuid = this.$store.state.route.query.uuid;
      if (this.communityEvent.uuid) {
        this.communityEvent.httpDetail(function () {
          that.communityEvent.poster.keepLocal(281,375);
        });
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .activity-detail{
    .activity-header {
      padding: 10px 20px 10px 20px;
      background-color: white;
      font-size: 18px;
      font-weight: bold;
      height: 25px;
      .activity-first-block-svg {
        float: left;
        height: 28px;
        width: 28px;
      }
      .activity-first-block-name {
        position: fixed;
        right: 46%;
      }
      .activity-first-share-svg {
        float: right;
        height: 21px;
        width: 21px;
      }
    }
    .activity-body{
      position: absolute;
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .activity-body-cell{
        padding-bottom: 133px;
        .title{
          padding-top: 20px;
          padding-left: 20px;
          padding-right: 20px;
          font-size: 22px;
          font-weight: bolder;
        }
        .title-bottom{
          padding: 2px 20px 24px 20px;
          font-size: 14px;
          color: #20bc97;
        }
        .image{
          height: 280px;
          width: 100%;
          background-size: cover!important;
        }
        .top-tag{
          padding: 25px 0 0 20px;
          font-size: 20px;
          color: #000000;
        }
        .content{
          padding-top: 15px;
          padding-left: 20px;
          padding-right: 20px;
          font-size: 16px;
          color: #666666;
        }
        .content-date{
          font-size: 16px;
          padding-left: 20px;
          color: #666666;
          padding-right: 20px;
        }
        .segmenting-line{
          .segmenting{
            border-bottom: #d7dcdd solid 1px;
            width: 100%;
          }
           padding:30px 20px 0 20px;
         }
        .description{
          padding-top: 25px;
          padding-left: 20px;
          padding-right: 20px;
          font-size: 16px;
          color: #666666;
        }
        .map{
          padding: 50px 20px 20px 20px;
          .img{
            border-radius: 2%;
            height: 300px;
            background-size: cover!important;
          }
        }
        .date {
          .content {
            color: #20bc97;
            font-size: 14px;
          }
          .content-black {
            color: #666666;
            font-size: 14px;
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      }
    }
    .activity-bottom{
      width: 100%;
      background-color: #00b3e5;
      color: white;
      height: 65px;
      bottom: 0;
      font-size: 16px;
      position: fixed;
      .btn-all{
        line-height: 65px;
        text-align: center;
      }
    }
    .activity-btm{
      width: 100%;
      background-color: #d7dcdd;
      color: white;
      height: 65px;
      bottom: 0;
      font-size: 16px;
      position: fixed;
      .btn-all{
        line-height: 65px;
        text-align: center;
      }
    }
    .popup-box {
      position: fixed;
      bottom: 0;
     }
  }
</style>
