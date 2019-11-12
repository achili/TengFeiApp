<template>
  <div class="book-container">
    <div class="book-title" @click.stop="goClose">关闭</div>
    <div class="book-date">
      <QuickIntoFrom :httpForm="httpCreate"  createClass="book-confirm"
              createText="确认提交" createIcon="" saveIcon=""
              :successCallback="openQuickIntoPay" :errorCallback="errorCallback"
      ></QuickIntoFrom>
    </div>
    <div class="popup-box" v-if="callServiceShow">
      <UploadPrompt  :closeCall="closeAllPopup" :title="title"></UploadPrompt>
    </div>
  </div>
</template>


<script>
  import QuickIntoFrom from "../../../components/widget/QuickIntoFrom";
  import SpaceOrder from "../../../common/model/space/introduction/SpaceOrder"
  import Activity from "../../../common/model/_base/Activity";
  import UploadPrompt from "../../../view/uploadPrompt/Prompt"
  import SpaceRegional from "../../../common/model/space/regional/SpaceRegional";
  export default {
    data(){
      let httpCreate = new SpaceOrder().getHttpQuickIntoCreate();
      httpCreate.getFormItem("name").value = this.$store.state.currentSpaceRegionalAddress;
      httpCreate.getFormItem("spaceRegional").value = this.$store.state.currentSpaceRegionalUuid;
      httpCreate.getFormItem("characteristic").value = SpaceOrder.prototype.Characteristic.MOBILE_STATION;
      return {
        currentSpaceRegionalAddress: this.$store.state.currentSpaceRegionalAddress,
        currentSpaceRegionalUuid: this.$store.state.currentSpaceRegionalUuid,
        callServiceShow: false,
        spaceOrder:new SpaceOrder(),
        spaceRegional:new SpaceRegional(),
        httpCreate:httpCreate,
        title:"您的快速入驻已提交成功，请及时支付。",
        numberFormItem:httpCreate.getFormItem("number"),
        priceFormItem: httpCreate.getFormItem("price"),
        startTime:httpCreate.getFormItem("startTime"),
        endTime:httpCreate.getFormItem("endTime"),
        characteristicFormItem:httpCreate.getFormItem("characteristic"),
        attributeFormItem:httpCreate.getFormItem('attribute'),
        appSettings: this.$store.state.appSettingList
      }
    },
    props:{
      activity:{
        type:Activity,
        required: false
      },
      uuid:{

      }
    },
    watch:{
      "numberFormItem.value"(){
        this.updatePrice()
      },
      "startTime.value"(){
        this.updatePrice()
      },
      "endTime.value"(){
        this.updatePrice()
      }
    },
    components:{
      QuickIntoFrom,
      UploadPrompt
    },
    methods:{
      goClose(){
        this.$router.closeActivity()
      },
      openQuickIntoPay(item){
        this.$store.state.temps.tempQuickIntoBook = item;
        this.$router.openActivity("quickIntoPay", "slide-top")
      },
      closeAllPopup(){
        this.callServiceShow = false;
      },
      errorCallback(){},
      updatePrice() {
        let danjia = this.appSettings.onePrice;
        let startTime = new Date((this.startTime.value.getFullYear() + '-' + (this.startTime.value.getMonth() + 1) + '-' + this.startTime.value.getDate()).replace(/-/g,'/')).getTime();
        let endTime = new Date((this.endTime.value.getFullYear() + '-' + (this.endTime.value.getMonth() + 1) + '-' + this.endTime.value.getDate()).replace(/-/g,'/')).getTime();
        let dateLength = (endTime - startTime) / (1000 * 60 * 60 * 24) + 1;
        if((Number)(this.numberFormItem.value) < 1){
          this.$store.state.plus.nativeUI.toast("工位数量不能少于1！",{duration:"short"});
        }else if(dateLength >= 30){
          this.$store.state.plus.nativeUI.toast("选择时间相差不能超过30天！",{duration:"short"});
        }else {
          this.priceFormItem.value = "￥" + ((danjia * ((Number)(this.numberFormItem.value)) * dateLength).toFixed(2));
        }
      }
    },
    mounted(){
      this.$store.state.appSettingList.httpGetPrice(this.$store.state.currentSpaceRegionalUuid);
      let that = this;
      that.httpCreate.editMode = false;
      this.$store.state.typeModule = "QuickIntoPay";
      let tempSpaceRegional = {
        uuid: this.currentSpaceRegionalUuid,
        name: this.currentSpaceRegionalAddress,
        type: SpaceOrder.prototype.Characteristic.MOBILE_STATION
      }
      let onePrice = {
        onePrice:this.appSettings.onePrice + "元/天"
      }
      let number = {
        number:that.spaceOrder.number + 1
      }
      that.httpCreate.backFill({spaceOrder: that.spaceOrder, appSetting:that.appSettings, spaceRegionalInfo: tempSpaceRegional, onePrice: onePrice, number:number});
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
