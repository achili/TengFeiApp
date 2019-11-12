<template>
  <div class="book-container">
    <div class="book-title" @click.stop="goClose">关闭</div>
    <div class="book-date">
      <SpaceFrom :httpForm="httpCreate"  createClass="book-confirm"
              createText="我要预订" createIcon="" saveIcon=""
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
  import SpaceOrder from "../../../common/model/space/introduction/SpaceOrder"
  import Activity from "../../../common/model/_base/Activity";
  import UploadPrompt from "../../../view/uploadPrompt/Prompt"
  export default {
    data(){
      let httpCreate = new SpaceOrder().getHttpCreate();
      httpCreate.getFormItem("name").value = this.$store.state.currentSpaceRegionalAddress;
      httpCreate.getFormItem("spaceRegional").value = this.$store.state.currentSpaceRegionalUuid;
      return {
        callServiceShow: false,
        spaceOrder:new SpaceOrder(),
        httpCreate:httpCreate,
        title:"您的空间预订已经提交成功，请等待管理员审核。",
        numberFormItem:httpCreate.getFormItem("number"),
        priceFormItem: httpCreate.getFormItem("price"),
        characteristicFormItem:httpCreate.getFormItem("characteristic"),
        attributeFormItem:httpCreate.getFormItem('attribute'),
        appSettings: this.$store.state.appSettingList
      }
    },
    props:{
      activity:{
        type:Activity,
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
      successCallback(){
        this.callServiceShow = true;
        this.$store.state.plus.push.createMessage("您的空间预订已经提交成功，请等待管理员审核。",undefined,{title:"空间预订已提交"});
      },
      errorCallback(){

      },
      closeAllPopup(){
        this.callServiceShow = false;
      },
      updatePrice() {
        let that = this;
        let danjia = this.appSettings.stationPrice;
        if(this.attributeFormItem.type === "CHECKBOX") {
          danjia = this.appSettings.stationPrice;
        } else {
          danjia = this.appSettings.spacePrice;
        }
        this.priceFormItem.value = "￥" + danjia * (Number)(this.numberFormItem.value) + " 起";
      },
      updateAttribute(e){
        let that = this;
        if(e === "MOBILE_STATION"){
          that.attributeFormItem.type = "CHECKBOX";
        }else {
          that.attributeFormItem.type = "HIDDEN";
        }
      }
    },
    watch:{
      "characteristicFormItem.value"(val){
        if(val !== ""){
          this.updateAttribute(val);
          this.updatePrice();
        }
      },
      "numberFormItem.value"(){
        this.updatePrice()
      }
    },
    mounted(){
      let that = this;
      if(this.activity.query.uuid){
        this.spaceOrder.uuid = this.activity.query.uuid;
        this.httpCreate.editMode = true;
        this.spaceOrder.httpDetail(function () {
          that.httpCreate.backFill({spaceOrder: that.spaceOrder});
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
    .book-date{
      width: 90%;
      margin: 28px 5% 0 5%;
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
