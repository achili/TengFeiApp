<template>
  <div class="activity-detail-enroll" @click.stop="closeOwn">
    <div class="popup animated bounceInUp" v-show="popup">
      <div class="title">是否确认报名？</div>
      <div class="content">
        <div class="bottom-left" @click.stop="enroll" >是</div>
        <div class="bottom-right" @click.stop="closeOwn" >否</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        popup: true
      }
    },
    components: {

    },
    props:{
      closeEnroll:{
        type:Function
      },
      queren: {
        type:Function
      }
    },
    methods: {
      enroll() {
        this.queren();
        this.closeEnroll();
      },
      closeOwn(){
        this.closeEnroll();
        this.popup = true;
      }
    },
    mounted(){

    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .activity-detail-enroll {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
    .popup{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 165px;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      background: white;
      text-align: center;
      &.animated {
        -webkit-animation-duration: 0.5s;
        animation-duration: 0.5s;
      }
      .title{
        font-size: 20px;
        color: gray;
        line-height: 75px;
      }
      .content{
        padding-left: 28px;
        padding-right: 28px;
        color: #ce0058;
        .bottom-left{
          border-radius: 8px;
          width: 126px;
          height: 40px;
          line-height: 40px;
          float: left;
          border: 2px solid #ce0058;
        }
        .bottom-right{
          border: 2px solid #ce0058;
          line-height: 40px;
          border-radius: 8px;
          width: 126px;
          height: 40px;
          float: right;
        }
      }
    }
  }
</style>
