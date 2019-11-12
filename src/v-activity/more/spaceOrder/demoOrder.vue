<template>
  <div class="order-container">
    <div class="order-top">
      <div class="close-ico">
        <div :style =" 'background:url(\''+(require('../../../assets/svg/space/left.svg'))+'\') center no-repeat'"
             style="margin-top: 15px;width: 24px;height: 14px"
             @click.stop="goClose"></div>
      </div>

      <div class="page-title">我的{{title}}</div>
      <div class="close-ico-1"></div>
    </div>
    <div class="order-list-item">
      <scroller ref="newsScroller"
                :on-refresh="refresh"
                :on-infinite="infinite"
                class="scroller-margin"
      >
        <div class="order-list-item-container">
          <div class="list-item " v-for="item in pager.data" data-type="0" :key="item.sort" >
            <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd($event,item)" @click="skip" :class="item.status === 'BE_OVERDUE'? 'list-box-bgc':''">
              <div class="order-item-top">
                <div class="order-item-top-title" v-if="name !== 'activeSiteBook' && name !== 'introducTionBook'">
                  名称:{{item.name}}
                </div>
                <div class="order-item-top-title" v-if="name === 'activeSiteBook'">
                  地址:{{item.address}}
                </div>
                <div class="order-item-top-title" v-if="name === 'introducTionBook'">
                  名称:{{item.spaceRegional.name}}
                </div>
                <div class="order-item-top-status" >
                    <div v-for="list in statusList" :key="list.name">
                      <div v-if="item.status === list.value" :style="'color:'+ list.style +';'">{{list.name}}</div>
                    </div>
                </div>
              </div>
              <div class="room-item-container">
                {{item.remarks}}
              </div>
              <div class="room-item-footer">
                <div class="room-order-footer-time" v-if="name!=='roomBook' && name!=='introducTionVisit'">
                  {{item.startTime | simpleDateMinute}}
                </div>
                <div class="room-order-footer-time" v-else-if="name==='roomBook'">
                  {{item.startTime | timeTime}}-{{item.endTime | timeTime}}
                </div>
                <div class="room-order-footer-time" v-else-if="name==='introducTionVisit'">
                  {{item.startTime | simpleDateMinute}}
                </div>
                <div class="room-order-footer-time" v-else-if="name === 'activeSiteBook'">
                  {{item.startTime | timeTime}}
                </div>
                <div class="room-order-footer-day" v-if="name ==='roomBook'">
                  {{item.startTime | allDay}}
                </div>
                <div class="room-order-footer-day" v-if="name !=='roomBook'">
                  {{item.createTime | allDay}}
                </div>
              </div>
            </div>

            <div class="payment" v-if="name === 'roomBook' && item.status === 'WAIT_PAY'" @click="openMeetingPay(item)" :data-index="item.index">支付</div>
            <div class="delete" v-if="name === 'roomBook' && item.status==='HAVE_PAY'" @click="openMeetingCallService(item)"  :data-index="item.index" :style="{right: item.status==='WAIT_PAY'? '-150px':'-75px'}">取消</div>
            <div class="delete" v-if="name === 'roomBook' && item.status==='REFUND'" @click="openCallService(item)"  :data-index="item.index" :style="{right: item.status==='REFUND'? '-75px':''}">取消</div>
            <div class="delete" v-if="name === 'roomBook' && item.status==='WAIT_PAY'" @click="openMeetingWaitCallService(item)"  :data-index="item.index" :style="{right: item.status==='WAIT_PAY'? '-150px':'-75px'}">取消</div>

            <div class="deletes" v-if="name !== 'roomBook' && name !== 'introducTionBook'" @click="openCallService(item)" :data-index="item.index">删除</div>

            <div class="payment" v-if="name === 'introducTionBook' && item.type === 'DAY_PASS'&& item.status === 'WAIT_PAY'" @click="openQuickIntoPay(item)" :data-index="item.index">支付</div>
            <div class="deletes" v-if="name === 'introducTionBook' && item.type === 'DAY_PASS' && item.status === 'HAVE_PAY'" @click="openQuickIntoDeleteCallService(item)" :data-index="item.index">取消</div>
            <div class="delete" v-if="name === 'introducTionBook' && item.type === 'DAY_PASS' && item.status === 'WAIT_PAY'" @click="openQuickIntoCallService(item)" :data-index="item.index" >取消</div>
            <div class="deletes" v-if="name === 'introducTionBook' && item.type !== 'DAY_PASS' && (item.status === 'ACCEPT' || item.status === 'HAVE_PAY')" @click="openCallService(item)" :data-index="item.index">取消</div>

          </div>
        </div>
      </scroller>


      <div class="popup-box" v-if="callServiceShow">
        <SelectServiceShow :title="title" :closeCall="closeAllPopup" :entity="entity" :refresh="refresh"></SelectServiceShow>
        <!--<UploadPrompt  :closeCall="closeAllPopup"></UploadPrompt>-->
      </div>
      <div class="popup-box" v-if="meetingDeleteServiceShow">
        <MeetingDeleteServiceShow :title="title" :closeCall="closeAllPopup" :entity="entity" :refresh="refresh"></MeetingDeleteServiceShow>
      </div>
      <div class="popup-box" v-if="meetingWaitPayServiceShow">
        <meetingWaitPayServiceShow :title="title" :closeCall="closeAllPopup" :entity="entity" :refresh="refresh"></meetingWaitPayServiceShow>
      </div>
      <div class="popup-box" v-if="quickIntoWaitPayServiceShow">
        <quickIntoWaitPayServiceShow :title="title" :closeCall="closeAllPopup" :entity="entity" :refresh="refresh"></quickIntoWaitPayServiceShow>
      </div>
      <div class="popup-box" v-if="quickIntoDeleteServiceShow">
        <quickIntoDeleteServiceShow :title="title" :closeCall="closeAllPopup" :entity="entity" :refresh="refresh"></quickIntoDeleteServiceShow>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectServiceShow from "../../../v-activity/more/spaceOrder/selectServiceShow";
  import MeetingDeleteServiceShow from "../../../v-activity/more/spaceOrder/meetingDeleteServiceShow";
  import meetingWaitPayServiceShow from "../../../v-activity/more/spaceOrder/meetingWaitPayServiceShow";
  import quickIntoWaitPayServiceShow from "../../../v-activity/more/spaceOrder/quickIntoWaitPayServiceShow";
  import quickIntoDeleteServiceShow from "../../../v-activity/more/spaceOrder/quickIntoDeleteServiceShow";
  import UploadPrompt from "../../../view/uploadPrompt/Prompt"
  import {getPayParamsText} from "../../../common/util/PayUtil";
  import {getDayStart} from "../../../common/filter/time";
  export default{
    data () {
      return {
        startX : 0 ,
        endX : 0,
        callServiceShow: false,
        meetingDeleteServiceShow: false,
        meetingWaitPayServiceShow:false,
        quickIntoWaitPayServiceShow:false,
        quickIntoDeleteServiceShow: false,
        entity: null,
        user: this.$store.state.user,
        statusList:{
          NOT_RECEIVE:{
            value: "NOT_RECEIVE",
            name:"未处理",
            style: "red"
          },
          RECEIVE:{
            value: "RECEIVE",
            name:"已处理",
            style: "green"
          },
          AUDITING:{
            value: "AUDITING",
            name:"审核中",
            style: "yellow"
          },
          ACCEPT:{
            value: "ACCEPT",
            name:"已通过",
            style: "green"
          },
          REFUSE:{
            value: "REFUSE",
            name:"未通过",
            style: "red"
          },
          WAIT_PAY:{
            value: "WAIT_PAY",
            name:"待支付",
            style: "#ffdc6f"
          },
          HAVE_PAY:{
            value: "HAVE_PAY",
            name:"已支付",
            style: "green"
          },
          REFUND:{
            value: "REFUND",
            name:"已退款",
            style: "#ffdc6f"
          },
          BE_OVERDUE:{
            value: "BE_OVERDUE",
            name:"已过期",
            style: "danger"
          }
        }
      }
    },
    props:{
      pager:{

      },
      name:{

      },
      title:{

      }
    },
    components: {
      SelectServiceShow,
      UploadPrompt,
      MeetingDeleteServiceShow,
      meetingWaitPayServiceShow,
      quickIntoWaitPayServiceShow,
      quickIntoDeleteServiceShow
    },
    methods : {
      closeAllPopup() {
        this.callServiceShow = false;
        this.meetingDeleteServiceShow = false;
        this.meetingWaitPayServiceShow = false;
        this.quickIntoWaitPayServiceShow = false;
        this.quickIntoDeleteServiceShow = false;
      },
      openCallService(item) {
        this.entity = item;
        this.callServiceShow = true;
      },
      openMeetingCallService(item) {
        this.entity = item;
        this.meetingDeleteServiceShow = true;
        this.restSlide();
      },
      openMeetingWaitCallService(item) {
        this.entity = item;
        this.meetingWaitPayServiceShow = true;
      },
      openMeetingPay(item){
        let that = this;
        this.entity = item;
        // this.$store.state.temps.quickIntoPay,
        this.$router.openActivity("meetingPay", "slide-top", {uuid: item.uuid});
        this.$store.state.temps.refrashSpaceReservations = function () {
          that.refresh();
        }
      },
      openQuickIntoPay(item){
        this.entity = item;
        // this.$store.state.temps.quickIntoPay,
        if(item.type !== "DAY_PASS") {
          this.$store.state.plus.nativeUI.toast("暂时不支持非快速入驻app支付",{duration:"short"});
          return;
        }
        this.$router.openActivity("quickIntoPay", "slide-top", {uuid: item.uuid})
      },
      openQuickIntoCallService(item){
        this.entity = item;
        this.quickIntoWaitPayServiceShow = true;
      },
      openQuickIntoDeleteCallService(item) {
        this.entity = item;
        this.quickIntoDeleteServiceShow = true;
        this.restSlide();
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue('user', this.user.uuid);
        this.pager.setFilterValue('deleted', false);
        if(this.name === 'roomBook'){
          this.pager.setFilterValue("statuses","NOT_RECEIVE,RECEIVE,BE_OVERDUE,WAIT_PAY,HAVE_PAY,BE_OVERDUE,REFUND");
          this.pager.setFilterValue("orderStartTime", "DESC");
          this.pager.setFilterValue("isTwo", true);
        }else {
          this.pager.setFilterValue("orderCreateTime", "DESC");
        }
        this.pager.httpFastPage(function(){
          that.pager.page++;
          done();
        },function () {
          done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue('deleted', false);
        this.pager.setFilterValue('user', this.user.uuid);
        if(this.name === 'roomBook'){
          this.pager.setFilterValue("statuses","NOT_RECEIVE,RECEIVE,BE_OVERDUE,WAIT_PAY,HAVE_PAY,BE_OVERDUE,REFUND");
          this.pager.setFilterValue("orderStartTime", "DESC");
          this.pager.setFilterValue("isTwo", true);
        }else {
          this.pager.setFilterValue("orderCreateTime", "DESC");
        }
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
      //编辑
      orderEdit(n,item){
        this.$router.openActivity(n,"slide-left",{uuid:item.uuid});
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
      touchEnd(e,item){
        let that = this;
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement;
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX;
        let today = new Date();
        if(this.name === 'roomBook' || this.name === 'introducTionBook'){
          // 左滑
          if( parentElement.dataset.type === "0" && this.startX - this.endX > 30 ){
            this.restSlide();
            if(this.name === 'roomBook' && item.status === 'WAIT_PAY'){
              parentElement.dataset.type = 2;
            }else if(this.name === 'introducTionBook' && item.type === 'DAY_PASS' && item.status === 'WAIT_PAY'){
              parentElement.dataset.type = 2;
            }else if(this.name === 'introducTionBook' && item.type === 'DAY_PASS' && item.status === 'HAVE_PAY' && (getDayStart(item.startTime).getTime() - getDayStart(today).getTime()) <= 0){
              parentElement.dataset.type = 0;
            }else if(this.name === 'introducTionBook' && item.type === 'DAY_PASS' && item.status === 'HAVE_PAY' && (getDayStart(item.startTime).getTime() - getDayStart(today).getTime()) > 0){
              parentElement.dataset.type = 1;
            }else if(this.name === 'introducTionBook' && item.type === 'DAY_PASS' && item.status === 'REFUND'){
              parentElement.dataset.type = 0;
            }else if(this.name === 'introducTionBook' && item.type !== 'DAY_PASS' && (item.status === 'ACCEPT' || item.status === 'HAVE_PAY')){
              parentElement.dataset.type = 0;
            }else{
              parentElement.dataset.type = 1;
            }
          }
          // 右滑
          if( parentElement.dataset.type === "1" && this.startX - this.endX < -30 ){
            this.restSlide();
            parentElement.dataset.type = 0;
          }
          // 右滑
          if( parentElement.dataset.type === "2" && this.startX - this.endX < -30 ){
            this.restSlide();
            parentElement.dataset.type = 0;
          }
        }else {
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
    },
    mounted() {
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .order-container{
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
          width: 100%;
          height: 100%;
          .list-item{
            position: relative;
            height: 105px;
            transition: all 0.2s;
            border-bottom: 1px solid  #eaeeef;

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
                width: 90%;
                height: 20px;
                margin-top: 5px;
                padding-left: 5%;
                .order-item-top-title{
                  display: inline-block;
                  float: left;
                  font-size: 17px;
                }
                .order-item-top-status{
                  display: inline-block;
                  float: right;
                  font-size: 15px;
                }
                .order-item-top-edit{
                  display: inline-block;
                  float: right;
                  padding-right: 5%;
                  color: #00b3e5;
                }
              }
              .room-item-container{
                line-height: 14px;
                margin: 14px 0;
                width: 90%;
                height: 28px;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
                padding-left: 5%;
              }
              .room-item-footer{
                height: 20px;
                padding-left: 5%;
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
            .list-box-bgc{
              background-color: #f5f5f5;
            }
            .have_pay_delete{
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
              right: -150px;
            }
            .deletes{
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
            .payment{
              width: 75px;
              height: 105px;
              background: #0196CE;
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
          .list-item[data-type="2"]{
            transform: translate3d(-150px,0,0);
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
