<template>
    <div class="book-container">
      <div class="book-title" @click.stop="goClose">关闭</div>
      <div class="book-form">
        <SpaceFrom :httpForm="httpCreate" callback="callback" createClass="book-confirm"
                 createText="我要预订" createIcon="" saveIcon="" :successCallback="openMeetingPay"
        ></SpaceFrom>
      </div>
      <div class="popup-box" v-if="callServiceShow">
        <UploadPrompt  :closeCall="closeAllPopup" :title="title"></UploadPrompt>
      </div>
    </div>
</template>

<script>
    import SpaceFrom from "../../../components/widget/SpaceFrom";
    import ConferenceRoom from "../../../common/model/space/conferenceroom/ConferenceRoom"
    import Activity from "../../../common/model/_base/Activity";
    import UploadPrompt from "../../../view/uploadPrompt/Prompt"
    import SpaceReservation from "../../../common/model/space/conferenceroom/SpaceReservation";
    import {getDayStart} from "../../../common/filter/time";
    import {toFixed} from "../../../common/filter/number";
    export default {
      data(){
        let http = new SpaceReservation().getHttpCreate();
        return {
          callServiceShow: false,
          roomBook:new SpaceReservation(),
          title:"预定提交成功。于前台缴费完成后，您将于会议开始前15分钟自动获得开门权限。",
          httpCreate: http,
          startTimeFormItem: http.getFormItem("startTime"),
          endTimeFormItem: http.getFormItem("endTime"),
          priceFormItem: http.getFormItem("price"),
          conferenceRoom: new ConferenceRoom(),
          userType: null,
          timeInfo:{
            startTime: 0,
            endTime: 0
          }
        }
      },
      props:{
        activity:{
          type: Activity,
          required: false
        }
      },
      components:{
        SpaceFrom,
        UploadPrompt
      },
      methods:{
        goClose(){
          this.$router.closeActivity()
        },
        openMeetingPay(item){
          console.log(item);
          item.conferenceRoom = this.conferenceRoom;
          item.spaceRegional = this.conferenceRoom.spaceRegional;
          this.$store.state.temps.tempRoomBook = item;
          this.$router.openActivity("meetingPay", "slide-top")
        },
        closeAllPopup(){
          this.callServiceShow = false;
        },
        updateOccupyList(date) {
          let that = this;
          let uuid = "";
          if(this.activity.query.uuid) {
            uuid = this.activity.query.uuid;
          }
          this.conferenceRoom.httpDetailByDate(date, uuid, function () {
            that.roomBook.timeInfo.occupyList = that.conferenceRoom.occupyList;
            that.roomBook.startTime = date;
            that.httpCreate.backFill({spaceReservation: that.roomBook});
            that.updatePriceFormItem();
          });
        },
        updatePriceFormItem() {
          let that = this;
          if(that.userType === "VIP"){
            let price = (this.endTimeFormItem.value.endTime - this.endTimeFormItem.value.startTime) / (60 * 60 * 1000) * (Number)(this.conferenceRoom.vipPrice)
            this.priceFormItem.value = "￥" + toFixed(price,2);
          }else if(that.userType === "MANAGER"){
            this.priceFormItem.value = "￥" + 0;
          }else if(that.userType === "ORDINARY"){
            let price = (this.endTimeFormItem.value.endTime - this.endTimeFormItem.value.startTime) / (60 * 60 * 1000) * (Number)(this.conferenceRoom.price)
            this.priceFormItem.value = "￥" + toFixed(price,2);
          }
        }
      },
      watch: {
        "startTimeFormItem.value"(newValue) {
          if(newValue) {
            this.updateOccupyList(newValue);
            this.$store.state.roomTime = newValue;
          }
        },
        "endTimeFormItem.value.startTime"(newValue) {
          let that = this;
          if(that.userType === "VIP"){
            let price = (this.endTimeFormItem.value.endTime - this.endTimeFormItem.value.startTime) / (60 * 60 * 1000) * (Number)(this.conferenceRoom.vipPrice)
            this.priceFormItem.value = "￥" + toFixed(price,2);
          }else if(that.userType === "MANAGER"){
            this.priceFormItem.value = "￥" + 0;
          }else if(that.userType === "ORDINARY"){
            let price = (this.endTimeFormItem.value.endTime - this.endTimeFormItem.value.startTime) / (60 * 60 * 1000) * (Number)(this.conferenceRoom.price)
            this.priceFormItem.value = "￥" + toFixed(price,2);
          }
        },
        "endTimeFormItem.value.endTime"(newValue) {
          let that = this;
          if(that.userType === "VIP"){
            let price = (this.endTimeFormItem.value.endTime - this.endTimeFormItem.value.startTime) / (60 * 60 * 1000) * (Number)(this.conferenceRoom.vipPrice)
            this.priceFormItem.value = "￥" + toFixed(price,2);
          }else if(that.userType === "MANAGER"){
            this.priceFormItem.value = "￥" + 0;
          }else if(that.userType === "ORDINARY"){
            let price = (this.endTimeFormItem.value.endTime - this.endTimeFormItem.value.startTime) / (60 * 60 * 1000) * (Number)(this.conferenceRoom.price)
            this.priceFormItem.value = "￥" + toFixed(price,2);
          }
        }
      },
      mounted(){
        let that = this;
        this.$store.state.typeModule = "MeetingPay";
        this.roomBook.location = this.activity.query.address;
        this.roomBook.spaceRegional = this.activity.query.spaceRegional;
        if(this.activity.query.uuid){
          this.roomBook.uuid = this.activity.query.uuid;
          this.httpCreate.editMode = true;
          this.roomBook.httpDetail(function () {
            that.conferenceRoom.uuid = that.roomBook.conferenceRoom.uuid;
            that.roomBook.timeInfo.startTime = that.roomBook.startTime.getTime() - getDayStart(that.roomBook.startTime).getTime();
            that.roomBook.timeInfo.endTime = that.roomBook.endTime.getTime() - getDayStart(that.roomBook.endTime).getTime();
            that.httpCreate.backFill({spaceReservation: that.roomBook});
            let form = {
              spaceRegionalUuid: this.$store.state.currentSpaceRegionalUuid
            };
            this.roomBook.httpPost("/space/reservation/get/user/type", form, function(response){
              that.userType = response.data.data.userType;
              that.roomBook.userType = response.data.data.userType;
              that.updatePriceFormItem();
            });

          });
        }
        if(this.activity.query.roomUuid) {
          this.conferenceRoom.uuid = this.activity.query.roomUuid;
          this.roomBook.startTime = this.$store.state.roomTime;
          this.roomBook.timeInfo.startTime = this.activity.query.startTime;
          this.roomBook.timeInfo.endTime = this.activity.query.endTime;
          this.httpCreate.editMode = false;
          that.roomBook.conferenceRoom.uuid = that.activity.query.roomUuid;
          that.httpCreate.backFill({spaceReservation: that.roomBook});
          let form = {
            spaceRegionalUuid: this.$store.state.currentSpaceRegionalUuid
          };
          this.roomBook.httpPost("/space/reservation/get/user/type", form, function(response){
            that.userType = response.data.data.userType;
            that.roomBook.userType = response.data.data.userType;
            that.updatePriceFormItem();
          });
        }


      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .book-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .book-title{
      color: #00b3e5;
      font-size: 17px;
      text-align: right;
      margin:35px 30px 0 10px ;
    }
    .book-form{
      width: 90%;
      margin: auto;
      .book-confirm{
        width: 111.5%;
        height: 66px;
        font-size: 16px;
        margin-left: -6%;
        line-height: 65px;
        text-align: center;
        background-color: #00B3E5;
        text-decoration: none;
        display: inline-block;
        color: #fff;
        border: none;
      }
    }

  }
</style>
