<template>
  <div class="report-circle-activity">
    <div class="report-title" @click.stop="goClose">关闭</div>
    <div class="report-date">
      <SpaceFrom :httpForm="httpReport"
                 createClass="report-confirm" createText="提交"
                 saveClass="report-confirm" saveText="提交"
                 createIcon="" saveIcon=""
                 :successCallback="successCallback"
      ></SpaceFrom>
    </div>
  </div>
</template>

<script>
  import SpaceFrom from "../../components/widget/SpaceFrom";
  import CommunityPosts from "../../common/model/community/CommunityPosts"
  import Activity from "../../common/model/_base/Activity";
  export default {
    data(){
      return {
        httpReport:new CommunityPosts().getHttpReport()
      }
    },
    components:{
      SpaceFrom
    },
    props: {
      activity: {
        type: Activity
      }
    },
    methods: {
      goClose(){
        this.$router.closeActivity()
      },
      successCallback(){
        this.$store.state.plus.nativeUI.toast("举报成功，我们将会尽快处理...",{duration:"short"});
        this.goClose();
      }
    },
    mounted(){
      this.httpReport.getFormItem('reportId').value = this.activity.query.uuid;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .report-circle-activity{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling:touch;
    .report-title{
      color: #00b3e5;
      font-size: 17px;
      text-align: right;
      margin:35px 30px 0 10px ;
    }
    .report-date{
      width: 90%;
      margin:28px 0 0 5%;

    }
    .report-confirm{
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
