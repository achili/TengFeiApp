<template>
  <div class="order-enroll-container">
    <div class="order-top">
      <div class="close-ico">
        <div :style =" 'background:url(\''+(require('../../../../assets/svg/space/left.svg'))+'\') center no-repeat'"
             style="margin-top: 15px ;display:inline-block;width: 24px;height: 14px;margin-left: 5%"
             @click.stop="goClose"></div>
      </div>

      <div class="page-title">我的报名活动</div>
      <div class="close-ico-1"></div>
    </div>
    <div class="order-list-item">
      <scroller ref="newsScroller"
                :on-refresh="refresh"
                :on-infinite="infinite"
                class="scroller-margin"
      >
        <div class="order-list-item-container">
          <div class="list-item " v-for="(enroll,index) in pager.data" data-type="0" :key="index">
            <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
              <div class="order-item-top">
                <div class="order-item-top-title">
                  名称：{{enroll.name}}
                </div>
              </div>
              <div class="remarks">
                <span class="room-item-container">
                  {{enroll.remarks}}
                </span>
              </div>
              <div class="room-item-footer">
                <div class="room-order-footer-time">
                  报名时间: {{enroll.createTime | simpleDateMinute }}
                </div>
                <div class="room-order-footer-day">
                  {{enroll.createTime | allDay }}
                </div>
              </div>
            </div>
            <div class="delete" @click="openCallService(enroll)" :data-index="enroll.index">取消</div>
          </div>
        </div>
      </scroller>

      <div class="popup-box" v-if="callServiceShow">
        <CancelActive :title="title" :closeCall="closeAllPopup" :entity="enroll" :refresh="refresh"></CancelActive>
      </div>
    </div>
  </div>
</template>

<script>
  import CancelActive from "../../../../v-activity/more/spaceOrder/CancelActive";
  import Pager from "../../../../common/model/_base/Pager";
  import Enroll from "../../../../common/model/community/enroll/Enroll";
  export default{
    data () {
      return {
        startX : 0 ,
        endX : 0,
        callServiceShow: false,
        enroll: new Enroll(),
        pager:new Pager(Enroll),
        user: this.$store.state.user,
        title:"报名活动",
        name:"activeOrder"
      }
    },
    props:{
    },
    components: {
      CancelActive
    },
    methods : {
      closeAllPopup() {
        this.callServiceShow = false;
      },
      openCallService(enroll) {
        this.enroll = enroll;
        this.callServiceShow = true;
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue('user', this.user.uuid);
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastPage(function(){
          that.pager.page++;
          done();
        },function () {
          done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue('user', this.user.uuid);
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.httpFastNextPage(function(){
          that.$refs.newsScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function () {

        });
      },
      //返回
      goClose(){
        this.$router.closeActivity()
      },
      //跳转
      skip(){
        if( this.checkSlide() ){
          this.restSlide();
        }else{

        }
      },
      //滑动开始
      touchStart(e){
        // 记录初始位置
        this.startX = e.touches[0].clientX;
      },
      //滑动结束
      touchEnd(e){
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement;
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX;
        // 左滑
        if( parentElement.dataset.type === "0" && this.startX - this.endX > 30 ){
          this.restSlide();
          parentElement.dataset.type = 1;
        }
        // 右滑
        if( parentElement.dataset.type === "1" && this.startX - this.endX < -30 ){
          this.restSlide();
          parentElement.dataset.type = 0;
        }
        this.startX = 0;
        this.endX = 0;
      },
      //判断当前是否有滑块处于滑动状态
      checkSlide(){
        let listItems = document.querySelectorAll('.list-item');
        for( let i = 0; i < listItems.length; i++){
          if( listItems[i].dataset.type === 1 ) {
            return true;
          }
        }
        return false;
      },
      //复位滑动状态
      restSlide(){
        let listItems = document.querySelectorAll('.list-item');
        // 复位
        for( let i = 0; i < listItems.length; i++){
          listItems[i].dataset.type = 0;
        }
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .order-enroll-container{
    width: 100%;
    height: 100%;
    .order-top{
      margin: auto;
      height: 44px;
      position: relative;
      padding: 0 20px;
      border-bottom: 1px solid #d7dcdd;
      display: flex;
      .close-ico-1 {
        flex:1;
      }
      .close-ico {
        flex:1;
      }
      .page-title{
        font-size: 18px;
        flex: 3;
        margin: 0 auto;
        height: 44px;
        line-height: 44px;
        text-align: center;

      }
    }
    .order-list-item{
      width: 100%;
      height: 100%;
      .scroller-margin{
        margin-top: 45px;
        .order-list-item-container{
          width: 95%;
          height: 100%;
          padding-left: 5%;
          .list-item{
            position: relative;
            height: 105px;
            transition: all 0.2s;
            border-bottom: 1px solid #d7dcdd;
            .list-box{
              background: #fff;
              align-items: center;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              font-size: 14px;
              overflow: hidden;
              .order-item-top{
                width: 100%;
                height: 20px;
                margin-top: 5px;
                .order-item-top-title{
                  display: inline-block;
                  float: left;
                }
              }
              .remarks{
                padding-right: 20px;
                .room-item-container{
                  width: 100%;
                  margin-top: 5px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  position: relative;
                  line-height: 18px;
                  max-height: 36px;
                  -webkit-line-clamp: 2;
                  text-overflow: ellipsis;
                }
              }

              .room-item-footer{
                padding-top: 10px;
                height: 20px;
                .room-order-footer-time{
                  float: left;
                  display: inline-block;
                }
                .room-order-footer-day{
                  float: right;
                  display: inline-block;
                  padding-right: 5%;
                }
              }

            }
            .delete{
              width: 75px;
              height: 105px;
              background: #ce0058;
              font-size: 17px;
              color: #fff;
              text-align: center;
              line-height: 105px;
              position: absolute;
              top:0;
              right: -75px;
            }
          }
          .list-item[data-type="0"]{
            transform: translate3d(0,0,0);
          }
          .list-item[data-type="1"]{
            transform: translate3d(-75px,0,0);
          }
          .list-item:after{
            position: absolute;
            left: 75px;
            bottom: 0;
            right: 0;
            color: #ccc;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            z-index: 2;
          }
        }

      }

    }





  }
</style>
