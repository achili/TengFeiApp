<template>
  <div class="select-service" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="title">删除{{title}}订单?</div>
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
  import Pager from "../../../common/model/_base/Pager";
  import ConferenceRoom from "../../../common/model/space/conferenceroom/ConferenceRoom";
  import ActiveSite from "../../../common/model/space/activesite/ActiveSite";
  import IntroducTionBook from "../../../common/model/space/introduction/SpaceOrder";

  export default {
    data() {
      return {

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
    methods: {
      closeOwn() {
        this.closeCall()
      },
      selectYes(e) {
        let that = this;
        e.httpDel(function () {
          that.refresh(function () {

          });
        }, function () {

        });
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
