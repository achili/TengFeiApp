<template>
    <div class="book-container">
      <div class="book-title" @click.stop="goClose">关闭</div>
      <div class="book-date">
        <SpaceFrom :httpForm="httpCreate" callback="callback"
                   createClass="book-confirm" createText="我要预订"
                   saveClass="book-confirm" saveText="我要预订"
                   createIcon="" saveIcon=""
                  :successCallback="successCallback" :errorCallback="errorCallback"
        ></SpaceFrom>
      </div>
      <div class="popup-box" v-if="callServiceShow">
        <UploadPrompt  :closeCall="closeAllPopup" :title="title"></UploadPrompt>
      </div>
    </div>
</template>

<script>
  import SpaceFrom from "../../../components/widget/SpaceFrom";
  import SiteReservation from "../../../common/model/space/activesite/SiteReservation"
  import Activity from "../../../common/model/_base/Activity";
  import ActiveSite from "../../../common/model/space/activesite/ActiveSite";
  import UploadPrompt from "../../../view/uploadPrompt/Prompt"
    export default {
      data(){
        let httpCreate = new SiteReservation().getHttpCreate();
        httpCreate.getFormItem("address").value = this.$store.state.currentSpaceRegionalAddress;
        httpCreate.getFormItem("spaceRegional").value = this.$store.state.currentSpaceRegionalUuid;
          return {
            siteReservation:new SiteReservation(),
            callServiceShow: false,
            httpCreate: httpCreate,
            title:"预定提交成功。我们的工作人员会尽快与您联络，确认后续事宜。"
          }
      },
      components:{
        SpaceFrom,
        UploadPrompt
      },
      props:{
        activity:{
          type:Activity,
          required: false
        }
      },
      methods: {
        goClose(){
          this.$router.closeActivity()
        },
        successCallback(){
          this.callServiceShow = true;
          this.$store.state.plus.push.createMessage("请保持电话通畅，稍后管理员会与您联系，请耐心等待。",undefined,{title:"场地预定需求已提交"});
        },
        errorCallback(){

        },
        closeAllPopup(){
          this.callServiceShow = false;
        }
      },
      mounted(){
        let that = this;
        if(this.activity.query.uuid){
          this.siteReservation.uuid = this.activity.query.uuid;
          this.httpCreate.editMode = true;
          this.siteReservation.httpDetail(function () {
            that.httpCreate.backFill({siteReservation: that.siteReservation});
          });
        }else {
          return false
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
    .book-date{
      width: 90%;
      margin:28px 0 0 5%;

    }
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
</style>
