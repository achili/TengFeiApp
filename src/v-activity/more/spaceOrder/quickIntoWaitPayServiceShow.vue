<template>
  <div class="select-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title">取消{{title}}订单?</div>
      <div class="content">
        <div class="select" >
          <div class="text" @click.stop="selectYes(entity)">是</div>
        </div>
        <div class="select" >
          <div class="text" @click.stop="selectNo">否</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MeetingPrompt from "../../../view/uploadPrompt/MeetingPrompt"
  import Base from "../../../common/model/_base/Base";

  export default {
    data() {
      return {
        callServiceShow: true
      }
    },
    props: {
      closeCall: {
        type: Function
      },
      title:{

      },
      entity:{

      },
      refresh:{
        type: Function
      }
    },
    components:{
      MeetingPrompt
    },
    methods: {
      closeOwn() {
        this.closeCall();
      },
      closeService(){
        this.callServiceShow = false
      },
      successCallback(){
        this.$store.state.plus.push.createMessage("您已申请对移动办工桌申请的取消。",undefined,{prompt:"移动办工桌取消申请已提交"});
      },
      errorCallback(){},
      closeAllPopup(){
      },
      selectYes(e) {
        let that = this;
        let base = new Base();
        base.httpPost("/quick/order/delete/quick/into", { uuid:e.uuid }, function (){
          that.refresh(function () {
          });
        })
        this.closeCall()
      },
      selectNo() {
        this.closeCall()
      }
    },
    mounted(){

    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .select-service {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .popup {
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: auto;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background: #F3F4F6;
      color: #484848;
      .title {
        text-align: center;
        width: 100%;
        font-size: 16px;
        line-height: 56px;
      }
      .content {
        text-align: center;
        display: flex;
        height: auto;
        padding: 20px 20px 25px 20px;
        line-height: 30px;
        font-size: 12px;
        .select {
          width: 50%;
          .text{
            width: 150px;
            height: 50px;
            border: 2px solid #ce0058;
            border-radius: 5px;
            line-height: 50px;
            text-align: center;
            color: #ce0058;
            font-size: 16px;
          }
        }

      }
    }
  }
</style>
