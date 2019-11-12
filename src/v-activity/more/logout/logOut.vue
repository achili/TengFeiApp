<template>
  <div class="log-out" @click.stop="closeOwn">
    <div class="popup animated bounceInUp">
      <div class="log-out-description">
        退出后不会删除任何历史数据，下次登录依然可以使用本账号
      </div>
      <div class="item" @click.stop="confirmDel">退出登录</div>
      <div class="close" @click.stop="closeOwn">取消</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      closeCall: {
        type: Function
      },
      logout: {
        type: Function
      }
    },
    methods: {
      closeOwn() {
        this.closeCall()
      },
      confirmDel() {
        this.logout();
        this.closeCall();
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .log-out {
    background: rgba(0,0,0,.45);
    height: 100vh;
    width: 100vw;
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
      color: #484848;
      background: #8C8C8C;
      text-align: center;
      font-size: 16px;
      .log-out-description {
        background-color: #FFFFFF;
        text-align: center;
        padding: 18px;
        border-bottom: 1px solid #ccc;
        color: #848484;
        font-size: 14px;
      }
      .item {
        line-height: 50px;
        background: white;
        margin-bottom: 6px;
        color: #ce0058;
      }
      .close {
        line-height: 53px;
        background: white;
      }
    }
  }
</style>
