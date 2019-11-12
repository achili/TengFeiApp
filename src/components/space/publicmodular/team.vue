<template>
  <div class="teamContainer">
    <div class="teamTitle">
      {{title}}
    </div>
    <div class="teamList">
      <div class="list-box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="sortl">
          <div class="seizeBlank"> </div>
          <div :key="$store.state.appSettingList.xiaoQiaoUser.name" class="swiperList">
            <div class="imgContainer">
              <img :src="$store.state.appSettingList.xiaoQiaoUser.avatarUrl" alt="" class="listImg">
            </div>
            <div class="textContainer">
              <div class="listName">{{$store.state.appSettingList.xiaoQiaoUser.name}}</div>
              <div class="listType">社区经理</div>
              <div class="listPhone">
                <div :style="'background:url(\''+(require('../../../assets/svg/space/phone.svg'))+'\') center no-repeat'" class="phoneImg" @click="phone"></div>
                <div :style="'background:url(\''+(require('../../../assets/svg/space/mail.svg'))+'\') center no-repeat'" class="phoneImg" @click="msgMail"></div>
              </div>
            </div>
          </div>
          <div class="seizeBlank"> </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
    import Appsettings from "../../../common/model/appsettings/Appsettings";

    export default {
      data(){
        return{
          startX: 0,
          startY: 0,
          //0代表未检测  1代表有效  2代表无效
          isInvalid: 0,
          appSettings: new Appsettings()
        }
      },
      methods: {
        phone() {
          window.location.href = "tel:" + this.$store.state.appSettingList.xiaoQiaoUser.phone;
        },
        msgMail() {
          this.$router.openActivity('self_information', "slide-left", {uuid:this.$store.state.appSettingList.xiaoQiaoUser.uuid})
        },
        touchstart(e) {
          this.startX = e.changedTouches[0].clientX;
          this.startY = e.changedTouches[0].clientY;
        },
        touchmove(e) {
          if(!this.isScrollerInside) {
            e.stopPropagation();
          } else {
            if(this.isInvalid === 0) {
              //未检测
              let x = e.changedTouches[0].clientX;
              let y = e.changedTouches[0].clientY;
              if(Math.abs(x - this.startX) > Math.abs(y - this.startY)) {
                this.isInvalid = 1;
                e.stopPropagation();
              } else {
                this.isInvalid = 2
              }
            } else if(this.isInvalid === 1) {
              //有效，需要左右滑动 所以阻止事件
              e.stopPropagation();
            } else {
              //无效 需要上下滑动 不阻止事件
            }
          }
        },
        touchend(e) {
          if(this.isInvalid !== 2) {
            e.stopPropagation();
          }
          this.isInvalid = 0;
        }
      },
      props:{
        bannerItem:{

        },
        title:{

        },
        isScrollerInside: {
          type: Boolean,
          default: false,
          request: false
        }
      },
      mounted(){
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .teamContainer{
    width: 100%;
    background-color: #F6F6F6;
    padding:30px 0 20px 0;
    .teamTitle{
      margin-left: 5%;
      font-size: 20px;
    }
    .teamList{
      border-radius: 5px;
      margin: 20px 0 0 0;
      .list-box {
        position: relative;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
        .sortl {
          display: flex;
          width: auto;
          flex-wrap: nowrap;
          .seizeBlank {
            min-width: 10px;
            height: 20px;
          }
          .swiperList{
            margin: 0 5px;
            background: white;
            border-radius: 5px;
            min-width: 310px;
            height: 120px;
            .imgContainer{
              .listImg{
                width: 88px;
                height: 88px;
                border-radius: 50%;
                float: left;
                margin-top: 20px;
                margin-left: 20px;
              }
            }
            .textContainer{
              height: 100px;
              float: left;
              margin-top: 20px;
              margin-left: 14px;
              .listName{
                font-size: 18px;
              }
              .listType{
                font-size: 16px;
                margin-top: 5px;
                color: #A2A2A2;
              }
              .listPhone{
                margin-top: 10px;
                margin-left: -10px;
                .phoneImg{
                  width: 24px;
                  height: 24px;
                  float: left;
                  margin-left: 10px;
                }
              }
            }

          }
        }
      }
    }
  }
</style>
