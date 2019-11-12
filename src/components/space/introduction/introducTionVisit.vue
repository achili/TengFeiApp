<template>
    <div class="visit-container">
      <div class="visit-title" @click.stop="goClose">关闭</div>
      <div class="visit-date">
        <SpaceFrom :httpForm="httpCreate" callback="callback" createClass="visit-confirm"
                createText="我要预约" createIcon="" saveIcon=""
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
    import BookTour from "../../../common/model/space/introduction/BookTour"
    import Activity from "../../../common/model/_base/Activity";
    import UploadPrompt from "../../../view/uploadPrompt/Prompt"
    export default {
      data(){
        let http = new BookTour().getHttpCreate();
        http.getFormItem("address").value = this.$store.state.currentSpaceRegionalAddress;
        http.getFormItem("spaceRegional").value = this.$store.state.currentSpaceRegionalUuid;
          return {
            user: this.$store.state.user,
            callServiceShow: false,
            bookTour:new BookTour(),
            httpCreate: http,
            nameFormItem: http.getFormItem('name'),
            phoneFormItem: http.getFormItem('phone'),
            title:"感谢您提交预约。我们的工作人员会尽快与您联络，确认参观事宜。"
          }
      },
      props:{
        activity:{
          type:Activity,
          request:false
        }
      },
      watch:{

      },
      components:{
        SpaceFrom,
        UploadPrompt
      },
      methods:{
        goClose(){
          this.$router.closeActivity("slide-top")
        },
        successCallback(){
          this.callServiceShow = true;
          this.$store.state.plus.push.createMessage("您的个人二维码将会于预约时间前15分钟生效，如有任何疑问可以联系管理人员。",undefined,{title:"预约参观已提交"});
        },
        errorCallback(){

        },
        closeAllPopup(){
          this.callServiceShow = false;
        }
      },
      mounted(){
        let that = this;
        this.bookTour.name = this.user.name;
        this.bookTour.phone = this.user.phone;
        this.nameFormItem.value = this.bookTour.name;
        this.phoneFormItem.value = this.bookTour.phone;

        if(this.activity.query.uuid){
          this.bookTour.uuid = this.activity.query.uuid;
          this.httpCreate.editMode = true;
          this.bookTour.httpDetail(function () {
            that.httpCreate.backFill({bookTour: that.bookTour});
          });
        }else {
          return false
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .visit-container{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .visit-title{
      color: #00b3e5;
      font-size: 17px;
      text-align: right;
      margin:35px 30px 0 10px ;
    }
    .visit-date{
      width: 90%;
      margin: 28px 5% 0  5%;
      .visit-confirm{
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
