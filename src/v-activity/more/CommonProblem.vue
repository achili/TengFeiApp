<template>
  <div class="common-problem">
    <div class="common-problem-header">
      <div class="common-problem-title">
        <div class="common-problem-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../assets/svg/space/left.svg'))+'\') center no-repeat'"></div>
        <div class="common-problem-first-block-name">常见问题</div>
        <div class="close-ico-1"></div>
      </div>
    </div>

    <div class="common-problem-content">
      <div class="common-problem-box" @click="postProblem(item.router)" v-for="item in problemData" :key="item.index">
        <div class="title pull-left">{{item.text}}</div>
        <div class="pull-right tag" :style="'background:url(\''+(require('../../assets/svg/more/select.svg'))+'\') center'"></div>
      </div>
    </div>

  </div>
</template>

<script>

  export default{
    data () {
      return {
        problemData:[
          {"text":"朋友圈发表异常","router":"posts_problem"},
          {"text":"奕桥空间开放时间","router":"opening_hours"},
          {"text":"支付方式","router":"payment_method"},
          {"text":"退款方式与周期","router":"refund_cycle"},
          {"text":"“会议室”预订&支付&取消","router":"room_reservation"},
          {"text":"“快速入驻” 预订&支付&取消","router":"field_reservation"},
          {"text":"付款信息单支付","router":"payment_slip"},
          {"text":"申请发票","router":"invoice"},
          {"text":"其他支付","router":"other_invoice"}
        ]
      }
    },
    props:{
    },
    components: {
    },
    methods : {
      postProblem(roter){
        this.$router.openActivity(roter);
      },
      goClose(){
        this.$router.closeActivity()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .common-problem{
    .common-problem-header{
      .common-problem-title{
        margin: auto;
        height: 44px;
        position: relative;
        border-bottom: #ECEEEF solid 1px;
        display: flex;
        .common-problem-first-block-svg{
          flex:1;
          margin-top: 15px;
          width: 24px;
          height: 20px
        }
        .common-problem-first-block-name{
          font-size: 18px;
          flex: 3;
          margin: 0 auto;
          height: 44px;
          line-height: 44px;
          text-align: center;
        }
        .close-ico-1 {
          flex:1;
        }
      }
    }
    .common-problem-top{
      padding-left: 20px;
      border-bottom: #d9d9d9 solid 1px;
    }
    .common-problem-content {
      padding: 10px 16px 0 16px;
      .common-problem-box{
        margin-top: 10px;
        border-bottom: #ECEEEF solid 1px;
        height: 30px;
        .title{
          padding-bottom: 10px;
        }
        .tag{
          position: relative;
          height: 25px;
          width: 25px;
        }

      }
    }

  }
</style>
