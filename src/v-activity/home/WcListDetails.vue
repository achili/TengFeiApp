<template>
    <div class="wc-list-details-content">
      <div class="activity-header">
        <div class="activity-first">
          <div class="activity-first-block-svg" @click="back" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'"></div>
          <div class="activity-first-block-name">详情</div>
          <div class="activity-first-share-svg"></div>
        </div>
      </div>

      <div class="list-details-content">
          <iframe :src="activity.query.enclosureUrl"
                  width="100%" height="100%"
                  allowTransparency="true" style="border: none;">
            您的浏览器不支持嵌入式框架，推荐使用Chrome浏览器获得最佳体验。
          </iframe>
      </div>
    </div>
</template>

<script>
    import Activity from "../../common/model/_base/Activity";
    export default {
        name: "WcListDetails",
      data(){
          return {
            dataList:{
              url:''
            }
          }
      },
      props:{
        activity:{
          type: Activity,
          required: false
        }
      },
      methods:{
        back() {
          this.$router.closeActivity()
        }
      },
      mounted(){
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .wc-list-details-content{
    .activity-header {
      padding: 10px 20px 10px 20px;
      background-color: white;
      font-size: 18px;
      font-weight: bold;
      height: 25px;
      .activity-first-block-svg {
        float: left;
        height: 28px;
        width: 28px;
      }
      .activity-first-block-name {
        position: fixed;
        right: 46%;
      }
      .activity-first-share-svg {
        float: right;
        height: 21px;
        width: 21px;
      }
    }
    .list-details-content{
      position: absolute;
      height: 100vh;
      width: 100vw;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
    }
  }
</style>
